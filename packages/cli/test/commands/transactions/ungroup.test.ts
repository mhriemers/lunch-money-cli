import { expect } from "chai";

import TransactionsUngroup from "../../../src/commands/transactions/ungroup.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions ungroup", () => {
  it("ungroups transaction by ID", async () => {
    const { client, result } = await runCommand(TransactionsUngroup, ["999", "--json"]);
    expect(result).to.deep.equal({ success: true, ungrouped_id: 999 });
    expect(client.transactions.ungroup.firstCall.args[0]).to.equal(999);
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsUngroup, ["999"]);
    expect(stdout).to.equal("Ungrouped transaction 999.\n");
  });
});
