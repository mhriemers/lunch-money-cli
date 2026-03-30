/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsGet from "../../../src/commands/transactions/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("transactions get", () => {
  it("returns transaction as JSON", async () => {
    const data = { amount: "-4.50", date: "2025-01-15", id: 100, payee: "Coffee" };
    const { client, result } = await runCommand(TransactionsGet, ["100", "--json"], (c) => {
      c.transactions.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.transactions.get.calledOnceWith(100)).to.be.true;
  });

  it("formats transaction detail as text", async () => {
    const { stdout } = await runCommand(TransactionsGet, ["100"], (c) => {
      c.transactions.get.resolves({
        amount: "-4.50",
        category_id: 10,
        created_at: "2025-01-15T12:00:00.000Z",
        currency: "usd",
        date: "2025-01-15",
        external_id: null,
        id: 100,
        manual_account_id: 42,
        notes: "Morning coffee",
        original_name: "COFFEE SHOP #123",
        payee: "Coffee",
        plaid_account_id: null,
        recurring_id: null,
        status: "cleared",
        updated_at: "2025-01-15T12:00:00.000Z",
      });
    });
    expectFixture(stdout, "transactions/get-detail");
  });
});
