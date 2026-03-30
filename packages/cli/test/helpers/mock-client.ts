import sinon from "sinon";

export interface MockClient {
  budgets: {
    delete: sinon.SinonStub;
    getSettings: sinon.SinonStub;
    upsert: sinon.SinonStub;
  };
  categories: {
    create: sinon.SinonStub;
    delete: sinon.SinonStub;
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
    update: sinon.SinonStub;
  };
  manualAccounts: {
    create: sinon.SinonStub;
    delete: sinon.SinonStub;
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
    update: sinon.SinonStub;
  };
  plaidAccounts: {
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
    triggerFetch: sinon.SinonStub;
  };
  recurringItems: {
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
  };
  summary: {
    get: sinon.SinonStub;
  };
  tags: {
    create: sinon.SinonStub;
    delete: sinon.SinonStub;
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
    update: sinon.SinonStub;
  };
  transactions: {
    attachFile: sinon.SinonStub;
    create: sinon.SinonStub;
    delete: sinon.SinonStub;
    deleteAttachment: sinon.SinonStub;
    deleteMany: sinon.SinonStub;
    get: sinon.SinonStub;
    getAll: sinon.SinonStub;
    getAttachmentUrl: sinon.SinonStub;
    group: sinon.SinonStub;
    split: sinon.SinonStub;
    ungroup: sinon.SinonStub;
    unsplit: sinon.SinonStub;
    update: sinon.SinonStub;
    updateMany: sinon.SinonStub;
  };
  user: {
    getMe: sinon.SinonStub;
  };
}

/**
 * Creates a full mock client with all methods stubbed to resolve with
 * sensible defaults. Tests override specific stubs as needed.
 */
export function createMockClient(): MockClient {
  return {
    budgets: {
      delete: sinon.stub().resolves(),
      getSettings: sinon.stub().resolves({}),
      upsert: sinon.stub().resolves({}),
    },
    categories: {
      create: sinon.stub().resolves({}),
      delete: sinon.stub().resolves(),
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves([]),
      update: sinon.stub().resolves({}),
    },
    manualAccounts: {
      create: sinon.stub().resolves({}),
      delete: sinon.stub().resolves(),
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves([]),
      update: sinon.stub().resolves({}),
    },
    plaidAccounts: {
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves([]),
      triggerFetch: sinon.stub().resolves(),
    },
    recurringItems: {
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves([]),
    },
    summary: {
      get: sinon.stub().resolves({ categories: [] }),
    },
    tags: {
      create: sinon.stub().resolves({}),
      delete: sinon.stub().resolves(),
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves([]),
      update: sinon.stub().resolves({}),
    },
    transactions: {
      attachFile: sinon.stub().resolves({}),
      create: sinon.stub().resolves({ ids: [] }),
      delete: sinon.stub().resolves(),
      deleteAttachment: sinon.stub().resolves(),
      deleteMany: sinon.stub().resolves(),
      get: sinon.stub().resolves({}),
      getAll: sinon.stub().resolves({ has_more: false, transactions: [] }),
      getAttachmentUrl: sinon.stub().resolves({ url: "https://example.com/file" }),
      group: sinon.stub().resolves({}),
      split: sinon.stub().resolves({}),
      ungroup: sinon.stub().resolves(),
      unsplit: sinon.stub().resolves(),
      update: sinon.stub().resolves({}),
      updateMany: sinon.stub().resolves({}),
    },
    user: {
      getMe: sinon.stub().resolves({}),
    },
  };
}
