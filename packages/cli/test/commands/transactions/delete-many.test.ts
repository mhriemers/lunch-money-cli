import { describe, expect, it, vi } from "vitest";

import TransactionsDeleteMany from "../../../src/commands/transactions/delete-many.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions delete-many", () => {
  it("deletes multiple transactions by IDs", async () => {
    const deleteMany = vi.fn().mockResolvedValue({ deleted_ids: [100, 200, 300], success: true });
    mockClient({ transactions: { deleteMany } });

    const { result } = await runCommand(TransactionsDeleteMany, ["--ids", "[100, 200, 300]", "--json"]);
    expect(result).toEqual({ deleted_ids: [100, 200, 300], success: true });
    expect(deleteMany).toHaveBeenCalledOnce();
    expect(deleteMany.mock.calls[0][0]).toEqual({ ids: [100, 200, 300] });
  });

  it("shows count in confirmation message", async () => {
    const deleteMany = vi.fn().mockResolvedValue({ deleted_ids: [1, 2], success: true });
    mockClient({ transactions: { deleteMany } });

    const { stdout } = await runCommand(TransactionsDeleteMany, ["--ids", "[1, 2]"]);
    expect(stdout).toBe("Deleted 2 transaction(s).\n");
  });
});
