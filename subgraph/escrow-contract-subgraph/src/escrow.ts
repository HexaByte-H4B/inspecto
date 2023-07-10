import {
  AuditorApplied as AuditorAppliedEvent,
  AuditorAssigned as AuditorAssignedEvent,
  DepositRefunded as DepositRefundedEvent,
  DepositTransferred as DepositTransferredEvent,
  EscrowCancelled as EscrowCancelledEvent,
  EscrowCompleted as EscrowCompletedEvent,
  EscrowCreated as EscrowCreatedEvent,
  EscrowFeeDeducted as EscrowFeeDeductedEvent,
  EscrowStatusUpdated as EscrowStatusUpdatedEvent
} from "../generated/Escrow/Escrow"
import {
  AuditorApplied,
  AuditorAssigned,
  DepositRefunded,
  DepositTransferred,
  EscrowCancelled,
  EscrowCompleted,
  EscrowCreated,
  EscrowFeeDeducted,
  EscrowStatusUpdated
} from "../generated/schema"

export function handleAuditorApplied(event: AuditorAppliedEvent): void {
  let entity = new AuditorApplied(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.applicationId = event.params.applicationId
  entity.auditor = event.params.auditor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuditorAssigned(event: AuditorAssignedEvent): void {
  let entity = new AuditorAssigned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.auditor = event.params.auditor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDepositRefunded(event: DepositRefundedEvent): void {
  let entity = new DepositRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.company = event.params.company
  entity.depositRefund = event.params.depositRefund

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDepositTransferred(event: DepositTransferredEvent): void {
  let entity = new DepositTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.auditor = event.params.auditor
  entity.depositRefund = event.params.depositRefund

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEscrowCancelled(event: EscrowCancelledEvent): void {
  let entity = new EscrowCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.canceller = event.params.canceller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEscrowCompleted(event: EscrowCompletedEvent): void {
  let entity = new EscrowCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEscrowCreated(event: EscrowCreatedEvent): void {
  let entity = new EscrowCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.company = event.params.company
  entity.deposit = event.params.deposit
  entity.title = event.params.title
  entity.description = event.params.description
  entity.url = event.params.url

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEscrowFeeDeducted(event: EscrowFeeDeductedEvent): void {
  let entity = new EscrowFeeDeducted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.escrowId = event.params.escrowId
  entity.platform = event.params.platform
  entity.feeAmount = event.params.feeAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEscrowStatusUpdated(event: EscrowStatusUpdatedEvent): void {
  let entity = new EscrowStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.escrowId = event.params.escrowId
  entity.status = event.params.status
  
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}