// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {

    enum EscrowStatus { Active, Assigned, In_Process, Completed, Cancelled }

    struct EscrowDeal {
        string title;
        string description;
        string url;
        address payable company;
        address auditor;
        uint256 deposit;
        EscrowStatus status;
    }

    struct AuditorApplication {
        address auditor;
        bool applied;
    }

    mapping(uint256 => EscrowDeal) public escrows;
    mapping(uint256 => AuditorApplication[]) public auditorApplications;
    uint256 public nextEscrowId;
    uint256 public nextApplicationId;

    address public platformAddress;

    event EscrowCreated(uint256 escrowId, address indexed company, uint256 deposit, string title, string description, string url);
    event AuditorApplied(uint256 escrowId, uint256 applicationId, address indexed auditor);
    event AuditorAssigned(uint256 escrowId, address indexed auditor);
    event EscrowCancelled(uint256 indexed escrowId, address indexed canceller);
    event EscrowCompleted(uint256 escrowId);
    event DepositTransferred(uint256 escrowId, address indexed auditor, uint256 depositRefund);
    event DepositRefunded(uint256 escrowId, address indexed company, uint256 depositRefund);
    event EscrowFeeDeducted(uint256 escrowId, address indexed platform, uint256 feeAmount);
    event EscrowStatusUpdated(uint256 indexed escrowId, EscrowStatus status);

    constructor() {
        nextEscrowId = 0;
        nextApplicationId = 0;
        platformAddress = msg.sender;
    }

    modifier escrowExists(uint256 escrowId) {
        require(escrowId < nextEscrowId, "Invalid escrowId.");
        _;
    }

    modifier onlyCompany(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].company, "Only the company can call this function.");
        _;
    }

    modifier onlyAuditor(uint256 escrowId) {
        require(msg.sender == escrows[escrowId].auditor, "Only the assigned auditor can call this function.");
        _;
    }

    function createEscrow(string memory _title, string memory _description, string memory _url) external payable {
        uint256 escrowId = nextEscrowId;
        escrows[escrowId].title = _title;
        escrows[escrowId].description = _description;
        escrows[escrowId].url = _url;
        escrows[escrowId].company = payable(msg.sender);
        escrows[escrowId].deposit = msg.value;
        escrows[escrowId].status = EscrowStatus.Active;

        emit EscrowCreated(escrowId, msg.sender, msg.value, _title, _description, _url);
        emit EscrowStatusUpdated(escrowId, EscrowStatus.Active);

        nextEscrowId++;
    }

    function applyAsAuditor(uint256 escrowId) external escrowExists(escrowId) {
        require(escrows[escrowId].auditor == address(0), "An auditor has already been assigned.");
        require(escrows[escrowId].company != msg.sender, "Company cannot assign itself as an auditor.");
        require(escrows[escrowId].status == EscrowStatus.Active, "The escrow has been cancelled or completed.");

        AuditorApplication[] storage applications = auditorApplications[escrowId];
        require(!isAuditorApplied(applications, msg.sender), "Auditor has already applied.");

        applications.push(AuditorApplication(msg.sender, true));

        emit AuditorApplied(escrowId, nextApplicationId, msg.sender);

        nextApplicationId++;
    }

    function isAuditorApplied(AuditorApplication[] storage applications, address auditor) internal view returns (bool) {
        for (uint256 i = 0; i < applications.length; i++) {
            if (applications[i].auditor == auditor && applications[i].applied) {
                return true;
            }
        }
        return false;
    }

    function assignAuditor(uint256 escrowId, uint256 applicationId) external escrowExists(escrowId) onlyCompany(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "The escrow has been cancelled or completed.");

        AuditorApplication[] memory applications = auditorApplications[escrowId];
        require(applicationId < applications.length, "Invalid applicationId.");

        address auditor = applications[applicationId].auditor;

        delete auditorApplications[escrowId];  // Clear the entire array

        escrow.auditor = auditor;
        escrow.status = EscrowStatus.Assigned;

        emit AuditorAssigned(escrowId, auditor);
        emit EscrowStatusUpdated(escrowId, escrow.status);
    }

    function cancelEscrow(uint256 escrowId) external escrowExists(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.company == msg.sender || escrow.auditor == msg.sender, "Only the company or the auditor can cancel the escrow.");
        require(escrow.status == EscrowStatus.Active, "The escrow has been cancelled or completed.");

        escrow.status = EscrowStatus.Cancelled;
        refundDeposit(escrowId);

        emit EscrowCancelled(escrowId, msg.sender);
        emit EscrowStatusUpdated(escrowId, escrow.status);
    }

    function markCompleted(uint256 escrowId) external escrowExists(escrowId) onlyAuditor(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Assigned, "The escrow has been cancelled or completed.");

        escrow.status = EscrowStatus.In_Process;
        emit EscrowStatusUpdated(escrowId, escrow.status);
    }

    function verifyCompletion(uint256 escrowId, bool _verified) external escrowExists(escrowId) onlyCompany(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.In_Process, "The task has not been completed by the auditor yet.");
        require(escrow.status != EscrowStatus.Cancelled, "The escrow has been cancelled.");

        if (_verified) {
            escrow.status = EscrowStatus.Completed;
            transferDeposit(escrowId);
            emit EscrowCompleted(escrowId);
        } else {
            escrow.status = EscrowStatus.Cancelled;
            refundDeposit(escrowId);

            emit EscrowCancelled(escrowId, msg.sender);
        }
        emit EscrowStatusUpdated(escrowId, escrow.status);
    }

    function transferDeposit(uint256 escrowId) internal escrowExists(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Completed, "The task has not been completed yet.");

        address payable auditor = payable(escrow.auditor);
        uint256 deposit = escrow.deposit;
        uint256 feeAmount = platformFee(deposit);

        auditor.transfer(deposit - feeAmount);
        payable(platformAddress).transfer(feeAmount);
        escrow.deposit = 0;

        emit DepositTransferred(escrowId, auditor, deposit - feeAmount);
        emit EscrowFeeDeducted(escrowId, platformAddress, feeAmount);
    }

    function refundDeposit(uint256 escrowId) internal escrowExists(escrowId) {
        EscrowDeal storage escrow = escrows[escrowId];
        require(escrow.status != EscrowStatus.Completed, "The task has already been marked as completed.");

        address payable company = payable(escrow.company);
        uint256 deposit = escrow.deposit;

        company.transfer(deposit);
        escrow.deposit = 0;

        emit DepositRefunded(escrowId, company, deposit);
    }

    function platformFee(uint256 amount) internal pure returns (uint256) {
        // deducts 1% as an escrow fee
        return amount / 100;
    }
}