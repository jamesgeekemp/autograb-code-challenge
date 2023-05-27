const getUserMock = jest.fn();
const postTransactionMock = jest.fn();
const putTransactionMock = jest.fn();
const getAccountMock = jest.fn();
const putAccountMock = jest.fn();

jest.mock("../store/store", () => ({
  __esModule: true,
  default: {
    getUser: getUserMock,
    getAccount: getAccountMock,
    postTransaction: postTransactionMock,
    putAccount: putAccountMock,
    putTransaction: putTransactionMock,
  },
}));
import { Account } from "../model/account.ts";
import { Transaction, TransactionInput } from "../model/transaction.ts";
import { User } from "../model/user.ts";
import { deposit } from "./deposit.ts";

const testUserId = "123456";
const testAccountId = "987654";
const testTransactionId = "23456";
const testUser: User = {
  id: testUserId,
  username: "testuser",
  role: "customer",
};
const testAccount: Account = {
  id: testAccountId,
  type: "savings",
  balance: 1000,
};

describe("deposit", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("given valid user", () => {
    describe("given valid account with balance 1000", () => {
      describe("given user deposits 100 in account", () => {
        it("should return complete transaction and account balance should be 1100", async () => {
          getUserMock.mockResolvedValue(testUser);
          postTransactionMock.mockImplementation(
            (transactionInput: TransactionInput) =>
              Promise.resolve({
                ...transactionInput,
                id: testTransactionId,
                status: "complete",
              })
          );
          getAccountMock.mockResolvedValue({ ...testAccount });
          putTransactionMock.mockImplementation((transaction: Transaction) =>
            Promise.resolve(transaction)
          );
          const result = await deposit(testUserId, testAccountId, 100);
          expect(result).toEqual({
            id: testTransactionId,
            accountId: testAccountId,
            status: "complete",
            type: "deposit",
            amount: 100,
          } as Transaction);
          expect(getUserMock).toHaveBeenCalledTimes(1);
          expect(postTransactionMock).toHaveBeenCalledTimes(1);
          expect(getAccountMock).toHaveBeenCalledTimes(1);
          expect(putAccountMock).toHaveBeenCalledTimes(1);
          expect(putAccountMock).toHaveBeenCalledWith({
            id: testAccountId,
            type: "savings",
            balance: 1100,
          } as Account);
        });
      });
      describe("given user withdraws 100 from account", () => {
        it("should return complete transaction and account balance should be 900", async () => {
          getUserMock.mockResolvedValue(testUser);
          postTransactionMock.mockImplementation(
            (transactionInput: TransactionInput) =>
              Promise.resolve({
                ...transactionInput,
                id: testTransactionId,
                status: "complete",
              })
          );
          getAccountMock.mockResolvedValue({ ...testAccount });
          putTransactionMock.mockImplementation((transaction: Transaction) =>
            Promise.resolve(transaction)
          );
          const result = await deposit(testUserId, testAccountId, -100);
          expect(result).toEqual({
            id: testTransactionId,
            accountId: testAccountId,
            status: "complete",
            type: "withdrawal",
            amount: 100,
          } as Transaction);
          expect(getUserMock).toHaveBeenCalledTimes(1);
          expect(postTransactionMock).toHaveBeenCalledTimes(1);
          expect(getAccountMock).toHaveBeenCalledTimes(1);
          expect(putAccountMock).toHaveBeenCalledTimes(1);
          expect(putAccountMock).toHaveBeenCalledWith({
            id: testAccountId,
            type: "savings",
            balance: 900,
          } as Account);
        });
      });
    });
    describe("given invalid (non-existent) account", () => {
      describe("given user deposits 100 in account", () => {
        it("should return failed transaction", async () => {
          getUserMock.mockResolvedValue(testUser);
          postTransactionMock.mockImplementation(
            (transactionInput: TransactionInput) =>
              Promise.resolve({
                ...transactionInput,
                id: testTransactionId,
                status: "complete",
              })
          );
          getAccountMock.mockResolvedValue(undefined);
          putTransactionMock.mockImplementation((transaction: Transaction) =>
            Promise.resolve(transaction)
          );
          const result = await deposit(testUserId, testAccountId, 100);
          expect(result).toEqual({
            id: testTransactionId,
            accountId: testAccountId,
            status: "failed",
            type: "deposit",
            amount: 100,
          } as Transaction);
          expect(getUserMock).toHaveBeenCalledTimes(1);
          expect(postTransactionMock).toHaveBeenCalledTimes(1);
          expect(getAccountMock).toHaveBeenCalledTimes(1);
          expect(putAccountMock).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
  describe("given invalid (non-existent) user", () => {
    describe("given user deposits 100 in account", () => {
      it("should reject invalid user id", () => {
        getUserMock.mockResolvedValue(undefined);
        return expect(deposit(testUserId, testAccountId, 100)).rejects.toThrow(
          "Invalid user id"
        );
      });
    });
  });
});
