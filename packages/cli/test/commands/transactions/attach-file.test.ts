/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsAttachFile from "../../../src/commands/transactions/attach-file.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions attach-file", () => {
  it("attaches file to transaction", async () => {
    const response = { id: 50, filename: "receipt.pdf" };
    const { result, client } = await runCommand(
      TransactionsAttachFile,
      ["100", "--file", "/path/to/receipt.pdf", "--json"],
      (c) => {
        c.transactions.attachFile.resolves(response);
      },
    );
    expect(result).to.deep.equal(response);
    const [txId, body] = client.transactions.attachFile.firstCall.args;
    expect(txId).to.equal(100);
    expect(body.file).to.equal("/path/to/receipt.pdf");
  });

  it("passes optional --notes", async () => {
    const { client } = await runCommand(
      TransactionsAttachFile,
      ["100", "--file", "/path/to/file.jpg", "--notes", "Receipt for dinner", "--json"],
      (c) => {
        c.transactions.attachFile.resolves({});
      },
    );
    expect(client.transactions.attachFile.firstCall.args[1].notes).to.equal("Receipt for dinner");
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsAttachFile, ["100", "--file", "/path/to/file.jpg"], (c) => {
      c.transactions.attachFile.resolves({});
    });
    expect(stdout).to.equal("Attached file to transaction 100.\n");
  });
});
