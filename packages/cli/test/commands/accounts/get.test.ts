import { expect } from "chai";

import AccountsGet from "../../../src/commands/accounts/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("accounts get", () => {
  it("returns account as JSON", async () => {
    const data = { balance: "1234.56", id: 42, name: "Checking", type: "cash" };
    const { client, result } = await runCommand(AccountsGet, ["42", "--json"], (c) => {
      c.manualAccounts.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.manualAccounts.get.firstCall.args[0]).to.equal(42);
  });

  it("formats account detail as text", async () => {
    const data = {
      balance: "1000.00",
      currency: "usd",
      id: 1,
      institution_name: "Chase",
      name: "Checking",
      status: "active",
      type: "cash",
    };
    const { stdout } = await runCommand(AccountsGet, ["1"], (c) => {
      c.manualAccounts.get.resolves(data);
    });
    expectFixture(stdout, "accounts/get-detail");
  });

  it("passes --api-key to createClient", async () => {
    const { createClientStub } = await runCommand(AccountsGet, ["1", "--api-key", "k", "--json"]);
    expect(createClientStub.firstCall.args[0]).to.equal("k");
  });
});
