/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import AccountsList from "../../../src/commands/accounts/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("accounts list", () => {
  it("returns accounts as JSON", async () => {
    const data = [
      { balance: "1000.00", currency: "usd", id: 1, name: "Checking", type: "cash" },
      { balance: "5000.00", currency: "usd", id: 2, name: "Savings", type: "cash" },
    ];
    const { client, result } = await runCommand(AccountsList, ["--json"], (c) => {
      c.manualAccounts.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.manualAccounts.getAll.calledOnce).to.be.true;
  });

  it("formats accounts as a table", async () => {
    const data = [
      { balance: "1000.00", currency: "usd", id: 1, name: "Checking", status: "active", type: "cash" },
      { balance: "-500.00", currency: "usd", id: 2, name: "Credit Card", status: "active", type: "credit" },
    ];
    const { stdout } = await runCommand(AccountsList, [], (c) => {
      c.manualAccounts.getAll.resolves(data);
    });
    expectFixture(stdout, "accounts/list-table");
  });

  it("shows empty message when no accounts", async () => {
    const { stdout } = await runCommand(AccountsList, []);
    expect(stdout).to.equal("No results.\n");
  });

  it("handles empty result", async () => {
    const { result } = await runCommand(AccountsList, ["--json"]);
    expect(result).to.deep.equal([]);
  });

  it("passes --api-key to createClient", async () => {
    const { createClientStub } = await runCommand(AccountsList, ["--api-key", "test-key", "--json"]);
    expect(createClientStub.firstCall.args[0]).to.equal("test-key");
  });
});
