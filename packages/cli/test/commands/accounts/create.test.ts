import { expect } from "chai";

import AccountsCreate from "../../../src/commands/accounts/create.js";
import { runCommand } from "../../helpers/index.js";

describe("accounts create", () => {
  it("creates with required flags", async () => {
    const created = { balance: "500.00", id: 99, name: "New", type: "credit" };
    const { client, result } = await runCommand(
      AccountsCreate,
      ["--name", "New", "--type", "credit", "--balance", "500.00", "--json"],
      (c) => {
        c.manualAccounts.create.resolves(created);
      },
    );
    expect(result).to.deep.equal(created);
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body).to.include({ balance: "500.00", name: "New", type: "credit" });
  });

  it("maps optional flags to request body", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--institution-name", "Chase", "--currency", "eur", "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.institution_name).to.equal("Chase");
    expect(body.currency).to.equal("eur");
  });

  it("parses --custom-metadata as JSON", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--custom-metadata", '{"foo":"bar"}', "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.custom_metadata).to.deep.equal({ foo: "bar" });
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(
      AccountsCreate,
      ["--name", "Visa", "--type", "credit", "--balance", "0"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 101, name: "Visa" });
      },
    );
    expect(stdout).to.equal('Created account "Visa" (ID: 101).\n');
  });
});
