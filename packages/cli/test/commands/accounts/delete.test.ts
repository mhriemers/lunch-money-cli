import { describe, expect, it, vi } from "vitest";

import AccountsDelete from "../../../src/commands/accounts/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("accounts delete", () => {
  it("deletes account by ID", async () => {
    const deleteFunction = vi.fn();
    mockClient({ manualAccounts: { delete: deleteFunction } });

    const { result } = await runCommand(AccountsDelete, ["42", "--json"]);
    expect(result).toEqual({ deleted_id: 42, success: true });
    expect(deleteFunction.mock.calls[0][0]).toBe(42);
  });

  it("shows confirmation message", async () => {
    mockClient({ manualAccounts: { delete: vi.fn() } });

    const { stdout } = await runCommand(AccountsDelete, ["42"]);
    expect(stdout).toBe("Deleted account 42.\n");
  });
});
