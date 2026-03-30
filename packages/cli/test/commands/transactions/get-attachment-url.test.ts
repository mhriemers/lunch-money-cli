/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsGetAttachmentUrl from "../../../src/commands/transactions/get-attachment-url.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions get-attachment-url", () => {
  it("returns attachment URL as JSON", async () => {
    const response = { url: "https://cdn.example.com/file.pdf" };
    const { result, client } = await runCommand(TransactionsGetAttachmentUrl, ["50", "--json"], (c) => {
      c.transactions.getAttachmentUrl.resolves(response);
    });
    expect(result).to.deep.equal(response);
    expect(client.transactions.getAttachmentUrl.calledOnceWith(50)).to.be.true;
  });

  it("outputs URL as text", async () => {
    const { stdout } = await runCommand(TransactionsGetAttachmentUrl, ["50"], (c) => {
      c.transactions.getAttachmentUrl.resolves({ url: "https://cdn.example.com/file.pdf" });
    });
    expect(stdout).to.equal("https://cdn.example.com/file.pdf\n");
  });
});
