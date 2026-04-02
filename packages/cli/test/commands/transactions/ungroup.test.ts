import { describe, expect, it, vi } from "vitest";

import TransactionsUngroup from "../../../src/commands/transactions/ungroup.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions ungroup", () => {
  it("ungroups transaction by ID", async () => {
    const ungroup = vi.fn().mockResolvedValue({ success: true, ungrouped_id: 999 });
    mockClient({ transactions: { ungroup } });

    const { result } = await runCommand(TransactionsUngroup, ["999", "--json"]);
    expect(result).toEqual({ success: true, ungrouped_id: 999 });
    expect(ungroup.mock.calls[0][0]).toBe(999);
  });

  it("shows confirmation message", async () => {
    const ungroup = vi.fn().mockResolvedValue({ success: true, ungrouped_id: 999 });
    mockClient({ transactions: { ungroup } });

    const { stdout } = await runCommand(TransactionsUngroup, ["999"]);
    expect(stdout).toBe("Ungrouped transaction 999.\n");
  });
});
