import { describe, expect, it, vi } from "vitest";

import TransactionsAttachFile from "../../../src/commands/transactions/attach-file.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions attach-file", () => {
  it("attaches file to transaction", async () => {
    const response = { filename: "receipt.pdf", id: 50 };
    const attachFile = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { attachFile } });

    const { result } = await runCommand(TransactionsAttachFile, ["100", "--file", "/path/to/receipt.pdf", "--json"]);
    expect(result).toEqual(response);
    const [txId, body] = attachFile.mock.calls[0];
    expect(txId).toBe(100);
    expect(body.file).toBe("/path/to/receipt.pdf");
  });

  it("passes optional --notes", async () => {
    const attachFile = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { attachFile } });

    await runCommand(TransactionsAttachFile, [
      "100",
      "--file",
      "/path/to/file.jpg",
      "--notes",
      "Receipt for dinner",
      "--json",
    ]);
    expect(attachFile.mock.calls[0][1].notes).toBe("Receipt for dinner");
  });

  it("shows confirmation message", async () => {
    const attachFile = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { attachFile } });

    const { stdout } = await runCommand(TransactionsAttachFile, ["100", "--file", "/path/to/file.jpg"]);
    expect(stdout).toBe("Attached file to transaction 100.\n");
  });
});
