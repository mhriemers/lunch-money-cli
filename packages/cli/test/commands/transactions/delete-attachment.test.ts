/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsDeleteAttachment from "../../../src/commands/transactions/delete-attachment.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions delete-attachment", () => {
  it("deletes attachment by file ID", async () => {
    const { result, client } = await runCommand(TransactionsDeleteAttachment, ["50", "--json"]);
    expect(result).to.deep.equal({ deleted_file_id: 50, success: true });
    expect(client.transactions.deleteAttachment.calledOnceWith(50)).to.be.true;
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsDeleteAttachment, ["50"]);
    expect(stdout).to.equal("Deleted attachment 50.\n");
  });
});
