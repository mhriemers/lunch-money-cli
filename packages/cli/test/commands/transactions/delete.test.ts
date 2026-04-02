import { describe, expect, it, vi } from "vitest";

import TransactionsDelete from "../../../src/commands/transactions/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions delete", () => {
  it("deletes transaction by ID", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 100, success: true });
    mockClient({ transactions: { delete: deleteFunction } });

    const { result } = await runCommand(TransactionsDelete, ["100", "--json"]);
    expect(result).toEqual({ deleted_id: 100, success: true });
    expect(deleteFunction.mock.calls[0][0]).toBe(100);
  });

  it("shows confirmation message", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 100, success: true });
    mockClient({ transactions: { delete: deleteFunction } });

    const { stdout } = await runCommand(TransactionsDelete, ["100"]);
    expect(stdout).toBe("Deleted transaction 100.\n");
  });
});
