 
import { expect } from "chai";

import BudgetsUpsert from "../../../src/commands/budgets/upsert.js";
import { runCommand } from "../../helpers/index.js";

describe("budgets upsert", () => {
  it("creates budget with required flags", async () => {
    const response = { amount: 500, category_id: 10 };
    const { client, result } = await runCommand(
      BudgetsUpsert,
      ["--amount", "500", "--category-id", "10", "--start-date", "2025-01-01", "--json"],
      (c) => {
        c.budgets.upsert.resolves(response);
      },
    );
    expect(result).to.deep.equal(response);
    const body = client.budgets.upsert.firstCall.args[0];
    expect(body.amount).to.equal(500);
    expect(body.category_id).to.equal(10);
    expect(body.start_date).to.equal("2025-01-01");
  });

  it("maps optional currency and notes flags", async () => {
    const { client } = await runCommand(
      BudgetsUpsert,
      [
        "--amount",
        "250.50",
        "--category-id",
        "10",
        "--start-date",
        "2025-01-01",
        "--currency",
        "eur",
        "--notes",
        "Q1 budget",
        "--json",
      ],
      (c) => {
        c.budgets.upsert.resolves({});
      },
    );
    const body = client.budgets.upsert.firstCall.args[0];
    expect(body.currency).to.equal("eur");
    expect(body.notes).to.equal("Q1 budget");
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(
      BudgetsUpsert,
      ["--amount", "500", "--category-id", "10", "--start-date", "2025-01-01"],
      (c) => {
        c.budgets.upsert.resolves({});
      },
    );
    expect(stdout).to.equal("Budget saved for category 10 starting 2025-01-01.\n");
  });
});
