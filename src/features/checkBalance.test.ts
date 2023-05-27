const getAccountMock = jest.fn();

jest.mock("../store/store", () => ({
  __esModule: true,
  default: {
    getAccount: getAccountMock,
  },
}));

import { Account } from "../model/account.ts";
import { checkBalance } from "./checkBalance.ts";
const testAccountId = "12345";

const testAccount: Account = {
  id: testAccountId,
  balance: 100,
  type: "savings",
};

describe("check balance", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("given valid account id", () => {
    it("should return correct account balance", async () => {
      getAccountMock.mockResolvedValue(testAccount);
      expect(await checkBalance(testAccountId)).toBe(100);
      expect(getAccountMock).toHaveBeenCalledTimes(1);
      expect(getAccountMock).toHaveBeenCalledWith(testAccountId);
    });
  });
  describe("given invalid (non existing) account id", () => {
    it("should reject invalid account id", async () => {
      getAccountMock.mockResolvedValue(undefined);
      return expect(checkBalance(testAccountId)).rejects.toThrow(
        "Invalid account id"
      );
    });
  });
});
