import { transfer } from "./transfer.ts";

const getAccountMock = jest.fn();

jest.mock("../store/store", () => ({
  __esModule: true,
  default: {
    getAccount: getAccountMock,
  },
}));

const fromAccountId = "12345";
const toAccountId = "98765";

describe("transfer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("given valid account from and to account ids with 1000 in both accounts", () => {
    describe("given user transfers 100", () => {
      it("should create transfer transaction, leaving 900 and 1100 in from and to accounts", async () => {
        const result = await transfer(fromAccountId, toAccountId, 100);
        expect(result).toStrictEqual({
          withdrawal: {
            accountId: fromAccountId,
            amount: 100,
            type: "withdrawal",
          },
          deposit: {
            accountId: toAccountId,
            amount: 100,
            type: "deposit",
          },
        });
      });
    });
  });
});
