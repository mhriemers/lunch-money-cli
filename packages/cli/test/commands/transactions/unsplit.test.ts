import { expect } from "chai";

import TransactionsUnsplit from "../../../src/commands/transactions/unsplit.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions unsplit", () => {
  it("unsplits transaction by ID", async () => {
    const { client, result } = await runCommand(TransactionsUnsplit, ["100", "--json"]);
    expect(result).to.deep.equal({ success: true, unsplit_id: 100 });
    expect(client.transactions.unsplit.firstCall.args[0]).to.equal(100);
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsUnsplit, ["100"]);
    expect(stdout).to.equal("Unsplit transaction 100.\n");
  });
});
