/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import PlaidAccountsGet from "../../../src/commands/plaid-accounts/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("plaid-accounts get", () => {
  it("returns plaid account as JSON", async () => {
    const data = { id: 10, name: "Savings", type: "depository" };
    const { result, client } = await runCommand(PlaidAccountsGet, ["10", "--json"], (c) => {
      c.plaidAccounts.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.plaidAccounts.get.calledOnceWith(10)).to.be.true;
  });

  it("formats plaid account detail as text", async () => {
    const { stdout } = await runCommand(PlaidAccountsGet, ["10"], (c) => {
      c.plaidAccounts.get.resolves({
        id: 10,
        name: "Savings",
        display_name: "My Savings",
        institution_name: "Chase",
        type: "depository",
        subtype: "savings",
        balance: "5000.00",
        currency: "usd",
        status: "active",
        balance_last_update: "2025-01-15T10:00:00Z",
        date_linked: "2024-06-01",
      });
    });
    expectFixture(stdout, "plaid-accounts/get-detail");
  });
});
