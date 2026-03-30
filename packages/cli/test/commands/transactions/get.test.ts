/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsGet from "../../../src/commands/transactions/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("transactions get", () => {
  it("returns transaction as JSON", async () => {
    const data = { id: 100, payee: "Coffee", amount: "-4.50", date: "2025-01-15" };
    const { result, client } = await runCommand(TransactionsGet, ["100", "--json"], (c) => {
      c.transactions.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.transactions.get.calledOnceWith(100)).to.be.true;
  });

  it("formats transaction detail as text", async () => {
    const { stdout } = await runCommand(TransactionsGet, ["100"], (c) => {
      c.transactions.get.resolves({
        id: 100,
        date: "2025-01-15",
        payee: "Coffee",
        original_name: "COFFEE SHOP #123",
        amount: "-4.50",
        currency: "usd",
        status: "cleared",
        category_id: 10,
        notes: "Morning coffee",
        recurring_id: null,
        manual_account_id: 42,
        plaid_account_id: null,
        external_id: null,
        created_at: "2025-01-15T12:00:00.000Z",
        updated_at: "2025-01-15T12:00:00.000Z",
      });
    });
    expectFixture(stdout, "transactions/get-detail");
  });
});
