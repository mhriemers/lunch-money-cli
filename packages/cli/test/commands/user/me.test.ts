/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import UserMe from "../../../src/commands/user/me.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("user me", () => {
  it("returns user as JSON", async () => {
    const data = { name: "Test User", email: "test@example.com", budget_name: "My Budget" };
    const { result, client } = await runCommand(UserMe, ["--json"], (c) => {
      c.user.getMe.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.user.getMe.calledOnce).to.be.true;
  });

  it("formats user detail as text", async () => {
    const { stdout } = await runCommand(UserMe, [], (c) => {
      c.user.getMe.resolves({
        id: 100,
        name: "Test User",
        email: "test@example.com",
        account_id: 200,
        budget_name: "My Budget",
        primary_currency: "usd",
        api_key_label: "CLI Key",
      });
    });
    expectFixture(stdout, "user/me-detail");
  });
});
