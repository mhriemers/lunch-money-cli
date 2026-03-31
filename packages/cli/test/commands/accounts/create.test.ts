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

  it("converts closed-on 'null' to null", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--closed-on", "null", "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.closed_on).to.equal(null);
  });

  it("passes closed-on date value through", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--closed-on", "2025-06-15", "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.closed_on).to.equal("2025-06-15");
  });

  it("maps --exclude-from-transactions boolean flag", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--exclude-from-transactions", "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.exclude_from_transactions).to.equal(true);
  });

  it("maps remaining optional flags", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      [
        "--name", "X", "--type", "cash", "--balance", "100",
        "--balance-as-of", "2025-01-15T12:00:00Z",
        "--display-name", "My Account",
        "--external-id", "ext-123",
        "--status", "active",
        "--subtype", "checking",
        "--json",
      ],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body.balance_as_of).to.equal("2025-01-15T12:00:00Z");
    expect(body.display_name).to.equal("My Account");
    expect(body.external_id).to.equal("ext-123");
    expect(body.status).to.equal("active");
    expect(body.subtype).to.equal("checking");
  });

  it("omits optional flags from body when not set", async () => {
    const { client } = await runCommand(
      AccountsCreate,
      ["--name", "X", "--type", "cash", "--balance", "0", "--json"],
      (c) => {
        c.manualAccounts.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.manualAccounts.create.firstCall.args[0];
    expect(body).to.deep.equal({ balance: "0", name: "X", type: "cash" });
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
