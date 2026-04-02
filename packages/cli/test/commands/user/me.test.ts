import { describe, expect, it, vi } from "vitest";

import UserMe from "../../../src/commands/user/me.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("user me", () => {
  it("returns user as JSON", async () => {
    const data = { budget_name: "My Budget", email: "test@example.com", name: "Test User" };
    const getMe = vi.fn().mockResolvedValue(data);
    mockClient({ user: { getMe } });

    const { result } = await runCommand(UserMe, ["--json"]);
    expect(result).toEqual(data);
    expect(getMe).toHaveBeenCalledOnce();
  });

  it("formats user detail as text", async () => {
    const getMe = vi.fn().mockResolvedValue({
      account_id: 200,
      api_key_label: "CLI Key",
      budget_name: "My Budget",
      email: "test@example.com",
      id: 100,
      name: "Test User",
      primary_currency: "usd",
    });
    mockClient({ user: { getMe } });

    const { stdout } = await runCommand(UserMe, []);
    await expect(stdout).toMatchFileSnapshot(fixture("user/me-detail"));
  });
});
