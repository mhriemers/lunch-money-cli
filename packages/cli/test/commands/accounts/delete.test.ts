import { expect } from "chai";

import AccountsDelete from "../../../src/commands/accounts/delete.js";
import { runCommand } from "../../helpers/index.js";

describe("accounts delete", () => {
  it("deletes account by ID", async () => {
    const { client, result } = await runCommand(AccountsDelete, ["42", "--json"]);
    expect(result).to.deep.equal({ deleted_id: 42, success: true });
    expect(client.manualAccounts.delete.firstCall.args[0]).to.equal(42);
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(AccountsDelete, ["42"]);
    expect(stdout).to.equal("Deleted account 42.\n");
  });
});
