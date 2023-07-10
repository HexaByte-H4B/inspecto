import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuditorApplied,
  AuditorAssigned,
  DepositRefunded,
  DepositTransferred,
  EscrowCancelled,
  EscrowCompleted,
  EscrowCreated,
  EscrowFeeDeducted
} from "../generated/Escrow/Escrow"

export function createAuditorAppliedEvent(
  escrowId: BigInt,
  applicationId: BigInt,
  auditor: Address
): AuditorApplied {
  let auditorAppliedEvent = changetype<AuditorApplied>(newMockEvent())

  auditorAppliedEvent.parameters = new Array()

  auditorAppliedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  auditorAppliedEvent.parameters.push(
    new ethereum.EventParam(
      "applicationId",
      ethereum.Value.fromUnsignedBigInt(applicationId)
    )
  )
  auditorAppliedEvent.parameters.push(
    new ethereum.EventParam("auditor", ethereum.Value.fromAddress(auditor))
  )

  return auditorAppliedEvent
}

export function createAuditorAssignedEvent(
  escrowId: BigInt,
  auditor: Address
): AuditorAssigned {
  let auditorAssignedEvent = changetype<AuditorAssigned>(newMockEvent())

  auditorAssignedEvent.parameters = new Array()

  auditorAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  auditorAssignedEvent.parameters.push(
    new ethereum.EventParam("auditor", ethereum.Value.fromAddress(auditor))
  )

  return auditorAssignedEvent
}

export function createDepositRefundedEvent(
  escrowId: BigInt,
  company: Address,
  depositRefund: BigInt
): DepositRefunded {
  let depositRefundedEvent = changetype<DepositRefunded>(newMockEvent())

  depositRefundedEvent.parameters = new Array()

  depositRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  depositRefundedEvent.parameters.push(
    new ethereum.EventParam("company", ethereum.Value.fromAddress(company))
  )
  depositRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "depositRefund",
      ethereum.Value.fromUnsignedBigInt(depositRefund)
    )
  )

  return depositRefundedEvent
}

export function createDepositTransferredEvent(
  escrowId: BigInt,
  auditor: Address,
  depositRefund: BigInt
): DepositTransferred {
  let depositTransferredEvent = changetype<DepositTransferred>(newMockEvent())

  depositTransferredEvent.parameters = new Array()

  depositTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  depositTransferredEvent.parameters.push(
    new ethereum.EventParam("auditor", ethereum.Value.fromAddress(auditor))
  )
  depositTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "depositRefund",
      ethereum.Value.fromUnsignedBigInt(depositRefund)
    )
  )

  return depositTransferredEvent
}

export function createEscrowCancelledEvent(
  escrowId: BigInt,
  canceller: Address
): EscrowCancelled {
  let escrowCancelledEvent = changetype<EscrowCancelled>(newMockEvent())

  escrowCancelledEvent.parameters = new Array()

  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCancelledEvent.parameters.push(
    new ethereum.EventParam("canceller", ethereum.Value.fromAddress(canceller))
  )

  return escrowCancelledEvent
}

export function createEscrowCompletedEvent(escrowId: BigInt): EscrowCompleted {
  let escrowCompletedEvent = changetype<EscrowCompleted>(newMockEvent())

  escrowCompletedEvent.parameters = new Array()

  escrowCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )

  return escrowCompletedEvent
}

export function createEscrowCreatedEvent(
  escrowId: BigInt,
  company: Address,
  deposit: BigInt,
  title: string,
  description: string,
  url: string
): EscrowCreated {
  let escrowCreatedEvent = changetype<EscrowCreated>(newMockEvent())

  escrowCreatedEvent.parameters = new Array()

  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("company", ethereum.Value.fromAddress(company))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("url", ethereum.Value.fromString(url))
  )

  return escrowCreatedEvent
}

export function createEscrowFeeDeductedEvent(
  escrowId: BigInt,
  platform: Address,
  feeAmount: BigInt
): EscrowFeeDeducted {
  let escrowFeeDeductedEvent = changetype<EscrowFeeDeducted>(newMockEvent())

  escrowFeeDeductedEvent.parameters = new Array()

  escrowFeeDeductedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowFeeDeductedEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  escrowFeeDeductedEvent.parameters.push(
    new ethereum.EventParam(
      "feeAmount",
      ethereum.Value.fromUnsignedBigInt(feeAmount)
    )
  )

  return escrowFeeDeductedEvent
}
