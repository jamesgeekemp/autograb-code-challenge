const getAccountMock = jest.fn();
const getAccountsMock = jest.fn();
const getUserMock = jest.fn();
jest.mock("../store/store", () => ({
  __esModule: true,
  default: {
    getAccount: getAccountMock,
    getAccounts: getAccountsMock,
    getUser: getUserMock,
  },
}));

import { Account } from "../model/account.ts";
import { checkAccountBalance, checkWholeBankBalance } from "./checkBalance.ts";

const testAccountId = "12345";
const testAccount: Account = {
  id: testAccountId,
  balance: 100,
  type: "savings",
};

const mockTestAccounts = (...balances: number[]) =>
  balances.map((balance) => ({
    id: testAccountId,
    balance,
    type: "savings",
  }));

describe("check balance", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("check account balance", () => {
    describe("given valid account id", () => {
      it("should return correct account balance", async () => {
        getAccountMock.mockResolvedValue(testAccount);
        expect(await checkAccountBalance(testAccountId)).toBe(100);
        expect(getAccountMock).toHaveBeenCalledTimes(1);
        expect(getAccountMock).toHaveBeenCalledWith(testAccountId);
      });

      describe("given invalid (non existing) account id", () => {
        it("should reject invalid account id", async () => {
          getAccountMock.mockResolvedValue(undefined);
          return expect(checkAccountBalance(testAccountId)).rejects.toThrow(
            "Invalid account id"
          );
        });
      });
    });
  });
  describe("check whole bank balance", () => {
    describe("given 6 accounts with varying positive and negative balances", () => {
      it("should return correct combined balance across the 6 accounts", async () => {
        const accounts = mockTestAccounts(1000, 2000, -0.5, 100536, -90, 666);
        getAccountsMock.mockResolvedValue(accounts);
        const result = await checkWholeBankBalance();
        expect(result).toBe(104111.5);
      });
    });
  });
});
