/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import PlaidAccountsList from "../../../src/commands/plaid-accounts/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("plaid-accounts list", () => {
  it("returns plaid accounts as JSON", async () => {
    const data = [{ id: 1, name: "Chase Checking", type: "depository" }];
    const { result } = await runCommand(PlaidAccountsList, ["--json"], (c) => {
      c.plaidAccounts.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
  });

  it("formats plaid accounts as a table", async () => {
    const { stdout } = await runCommand(PlaidAccountsList, [], (c) => {
      c.plaidAccounts.getAll.resolves([
        { id: 1, name: "Chase Checking", institution_name: "Chase", type: "depository", balance: "1500.00", currency: "usd", status: "active" },
      ]);
    });
    expectFixture(stdout, "plaid-accounts/list-table");
  });

  it("handles empty result", async () => {
    const { result } = await runCommand(PlaidAccountsList, ["--json"]);
    expect(result).to.deep.equal([]);
  });
});
