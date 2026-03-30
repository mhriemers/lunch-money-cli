/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import PlaidAccountsSync from "../../../src/commands/plaid-accounts/sync.js";
import { runCommand } from "../../helpers/index.js";

describe("plaid-accounts sync", () => {
  it("triggers sync with no params", async () => {
    const { client, result } = await runCommand(PlaidAccountsSync, ["--json"]);
    expect(result).to.deep.equal({ message: "Plaid sync triggered", success: true });
    expect(client.plaidAccounts.triggerFetch.calledOnce).to.be.true;
    expect(client.plaidAccounts.triggerFetch.firstCall.args[0]).to.deep.equal({});
  });

  it("maps date range and account ID flags", async () => {
    const { client } = await runCommand(PlaidAccountsSync, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--plaid-account-id",
      "42",
      "--json",
    ]);
    expect(client.plaidAccounts.triggerFetch.firstCall.args[0]).to.deep.equal({
      end_date: "2025-01-31",
      id: 42,
      start_date: "2025-01-01",
    });
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(PlaidAccountsSync, []);
    expect(stdout).to.equal("Plaid sync triggered.\n");
  });
});
