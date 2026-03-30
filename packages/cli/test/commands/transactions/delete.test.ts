/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsDelete from "../../../src/commands/transactions/delete.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions delete", () => {
  it("deletes transaction by ID", async () => {
    const { result, client } = await runCommand(TransactionsDelete, ["100", "--json"]);
    expect(result).to.deep.equal({ deleted_id: 100, success: true });
    expect(client.transactions.delete.calledOnceWith(100)).to.be.true;
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsDelete, ["100"]);
    expect(stdout).to.equal("Deleted transaction 100.\n");
  });
});
