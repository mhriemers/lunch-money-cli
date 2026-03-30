 
import { expect } from "chai";

import PlaidAccountsList from "../../../src/commands/plaid-accounts/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("plaid-accounts list", () => {
  it("returns plaid accounts as JSON", async () => {
    const data = [{ id: 1, name: "Chase Checking", type: "depository" }];
    const { client, result } = await runCommand(PlaidAccountsList, ["--json"], (c) => {
      c.plaidAccounts.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.plaidAccounts.getAll.calledOnce).to.be.true;
  });

  it("formats plaid accounts as a table", async () => {
    const { stdout } = await runCommand(PlaidAccountsList, [], (c) => {
      c.plaidAccounts.getAll.resolves([
        {
          balance: "1500.00",
          currency: "usd",
          id: 1,
          institution_name: "Chase",
          name: "Chase Checking",
          status: "active",
          type: "depository",
        },
      ]);
    });
    expectFixture(stdout, "plaid-accounts/list-table");
  });

  it("handles empty result", async () => {
    const { result } = await runCommand(PlaidAccountsList, ["--json"]);
    expect(result).to.deep.equal([]);
  });
});
