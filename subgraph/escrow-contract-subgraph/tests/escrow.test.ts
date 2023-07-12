import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AuditorApplied } from "../generated/schema"
import { AuditorApplied as AuditorAppliedEvent } from "../generated/Escrow/Escrow"
import { handleAuditorApplied } from "../src/escrow"
import { createAuditorAppliedEvent } from "./escrow-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let escrowId = BigInt.fromI32(234)
    let applicationId = BigInt.fromI32(234)
    let auditor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAuditorAppliedEvent = createAuditorAppliedEvent(
      escrowId,
      applicationId,
      auditor
    )
    handleAuditorApplied(newAuditorAppliedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuditorApplied created and stored", () => {
    assert.entityCount("AuditorApplied", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuditorApplied",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "escrowId",
      "234"
    )
    assert.fieldEquals(
      "AuditorApplied",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "applicationId",
      "234"
    )
    assert.fieldEquals(
      "AuditorApplied",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "auditor",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
