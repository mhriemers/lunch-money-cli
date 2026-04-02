import { describe, expect, it, vi } from "vitest";

import TransactionsGetAttachmentUrl from "../../../src/commands/transactions/get-attachment-url.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions get-attachment-url", () => {
  it("returns attachment URL as JSON", async () => {
    const response = { url: "https://cdn.example.com/file.pdf" };
    const getAttachmentUrl = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { getAttachmentUrl } });

    const { result } = await runCommand(TransactionsGetAttachmentUrl, ["50", "--json"]);
    expect(result).toEqual(response);
    expect(getAttachmentUrl.mock.calls[0][0]).toBe(50);
  });

  it("outputs URL as text", async () => {
    const getAttachmentUrl = vi.fn().mockResolvedValue({ url: "https://cdn.example.com/file.pdf" });
    mockClient({ transactions: { getAttachmentUrl } });

    const { stdout } = await runCommand(TransactionsGetAttachmentUrl, ["50"]);
    expect(stdout).toBe("https://cdn.example.com/file.pdf\n");
  });
});
