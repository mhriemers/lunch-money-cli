/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import RecurringGet from "../../../src/commands/recurring/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("recurring get", () => {
  it("returns recurring item as JSON", async () => {
    const data = { id: 5, payee: "Netflix", amount: "15.99" };
    const { result, client } = await runCommand(RecurringGet, ["5", "--json"], (c) => {
      c.recurringItems.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.recurringItems.get.calledOnceWith(5)).to.be.true;
  });

  it("formats recurring item detail as text", async () => {
    const { stdout } = await runCommand(RecurringGet, ["5"], (c) => {
      c.recurringItems.get.resolves({
        id: 5,
        description: "Streaming",
        status: "active",
        transaction_criteria: { payee: "Netflix", amount: "15.99", currency: "usd", granularity: "monthly", anchor_date: "2025-01-15" },
        created_at: "2024-01-01T00:00:00Z",
      });
    });
    expectFixture(stdout, "recurring/get-detail");
  });
});
