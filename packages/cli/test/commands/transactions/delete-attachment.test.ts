import { describe, expect, it, vi } from "vitest";

import TransactionsDeleteAttachment from "../../../src/commands/transactions/delete-attachment.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions delete-attachment", () => {
  it("deletes attachment by file ID", async () => {
    const deleteAttachment = vi.fn().mockResolvedValue({ deleted_file_id: 50, success: true });
    mockClient({ transactions: { deleteAttachment } });

    const { result } = await runCommand(TransactionsDeleteAttachment, ["50", "--json"]);
    expect(result).toEqual({ deleted_file_id: 50, success: true });
    expect(deleteAttachment.mock.calls[0][0]).toBe(50);
  });

  it("shows confirmation message", async () => {
    const deleteAttachment = vi.fn().mockResolvedValue({ deleted_file_id: 50, success: true });
    mockClient({ transactions: { deleteAttachment } });

    const { stdout } = await runCommand(TransactionsDeleteAttachment, ["50"]);
    expect(stdout).toBe("Deleted attachment 50.\n");
  });
});
