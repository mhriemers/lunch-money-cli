import { type SinonStub, stub } from "sinon";

export interface MockClient {
  budgets: {
    delete: SinonStub;
    getSettings: SinonStub;
    upsert: SinonStub;
  };
  categories: {
    create: SinonStub;
    delete: SinonStub;
    get: SinonStub;
    getAll: SinonStub;
    update: SinonStub;
  };
  manualAccounts: {
    create: SinonStub;
    delete: SinonStub;
    get: SinonStub;
    getAll: SinonStub;
    update: SinonStub;
  };
  plaidAccounts: {
    get: SinonStub;
    getAll: SinonStub;
    triggerFetch: SinonStub;
  };
  recurringItems: {
    get: SinonStub;
    getAll: SinonStub;
  };
  summary: {
    get: SinonStub;
  };
  tags: {
    create: SinonStub;
    delete: SinonStub;
    get: SinonStub;
    getAll: SinonStub;
    update: SinonStub;
  };
  transactions: {
    attachFile: SinonStub;
    create: SinonStub;
    delete: SinonStub;
    deleteAttachment: SinonStub;
    deleteMany: SinonStub;
    get: SinonStub;
    getAll: SinonStub;
    getAttachmentUrl: SinonStub;
    group: SinonStub;
    split: SinonStub;
    ungroup: SinonStub;
    unsplit: SinonStub;
    update: SinonStub;
    updateMany: SinonStub;
  };
  user: {
    getMe: SinonStub;
  };
}

/**
 * Creates a full mock client with all methods stubbed to resolve with
 * sensible defaults. Tests override specific stubs as needed.
 */
export function createMockClient(): MockClient {
  return {
    budgets: {
      delete: stub().resolves(),
      getSettings: stub().resolves({}),
      upsert: stub().resolves({}),
    },
    categories: {
      create: stub().resolves({}),
      delete: stub().resolves(),
      get: stub().resolves({}),
      getAll: stub().resolves([]),
      update: stub().resolves({}),
    },
    manualAccounts: {
      create: stub().resolves({}),
      delete: stub().resolves(),
      get: stub().resolves({}),
      getAll: stub().resolves([]),
      update: stub().resolves({}),
    },
    plaidAccounts: {
      get: stub().resolves({}),
      getAll: stub().resolves([]),
      triggerFetch: stub().resolves(),
    },
    recurringItems: {
      get: stub().resolves({}),
      getAll: stub().resolves([]),
    },
    summary: {
      get: stub().resolves({ categories: [] }),
    },
    tags: {
      create: stub().resolves({}),
      delete: stub().resolves(),
      get: stub().resolves({}),
      getAll: stub().resolves([]),
      update: stub().resolves({}),
    },
    transactions: {
      attachFile: stub().resolves({}),
      create: stub().resolves({ ids: [] }),
      delete: stub().resolves(),
      deleteAttachment: stub().resolves(),
      deleteMany: stub().resolves(),
      get: stub().resolves({}),
      getAll: stub().resolves({ has_more: false, transactions: [] }),
      getAttachmentUrl: stub().resolves({ url: "https://example.com/file" }),
      group: stub().resolves({}),
      split: stub().resolves({}),
      ungroup: stub().resolves(),
      unsplit: stub().resolves(),
      update: stub().resolves({}),
      updateMany: stub().resolves({}),
    },
    user: {
      getMe: stub().resolves({}),
    },
  };
}
