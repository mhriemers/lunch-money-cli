/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import UserMe from "../../../src/commands/user/me.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("user me", () => {
  it("returns user as JSON", async () => {
    const data = { budget_name: "My Budget", email: "test@example.com", name: "Test User" };
    const { client, result } = await runCommand(UserMe, ["--json"], (c) => {
      c.user.getMe.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.user.getMe.calledOnce).to.be.true;
  });

  it("formats user detail as text", async () => {
    const { stdout } = await runCommand(UserMe, [], (c) => {
      c.user.getMe.resolves({
        account_id: 200,
        api_key_label: "CLI Key",
        budget_name: "My Budget",
        email: "test@example.com",
        id: 100,
        name: "Test User",
        primary_currency: "usd",
      });
    });
    expectFixture(stdout, "user/me-detail");
  });
});
