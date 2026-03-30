/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import AccountsGet from "../../../src/commands/accounts/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("accounts get", () => {
  it("returns account as JSON", async () => {
    const data = { id: 42, name: "Checking", balance: "1234.56", type: "cash" };
    const { result, client } = await runCommand(AccountsGet, ["42", "--json"], (c) => {
      c.manualAccounts.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.manualAccounts.get.calledOnceWith(42)).to.be.true;
  });

  it("formats account detail as text", async () => {
    const data = {
      id: 1,
      name: "Checking",
      type: "cash",
      balance: "1000.00",
      currency: "usd",
      status: "active",
      institution_name: "Chase",
    };
    const { stdout } = await runCommand(AccountsGet, ["1"], (c) => {
      c.manualAccounts.get.resolves(data);
    });
    expectFixture(stdout, "accounts/get-detail");
  });

  it("passes --api-key to createClient", async () => {
    const { createClientStub } = await runCommand(AccountsGet, ["1", "--api-key", "k", "--json"]);
    expect(createClientStub.calledOnceWith("k")).to.be.true;
  });
});
