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
import { transfer } from "./transfer.ts";

const fromUserId = "45678";
const fromAccountId = "12345";

const toUserId = "65432";
const toAccountId = "98765";

const transactionId = "29387";

const fromUser = {
  id: fromUserId,
  role: "customer",
  username: "fromTestUser",
} as User;
const toUser = {
  id: toUserId,
  role: "customer",
  username: "toTestUser",
} as User;

const fromAccount = {
  id: fromAccountId,
  type: "savings",
  balance: 1000,
} as Account;
const toAccount = {
  id: toAccountId,
  type: "savings",
  balance: 1000,
} as Account;

describe("transfer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("given valid account from and to user ids and account ids with 1000 in both accounts", () => {
    describe("given user transfers 100", () => {
      it("should create completed transfer transaction, leaving 900 and 1100 in from and to accounts", async () => {
        // from mocks
        getUserMock.mockResolvedValueOnce(fromUser);
        postTransactionMock.mockImplementation(
          (transactionInput: TransactionInput) =>
            Promise.resolve({
              ...transactionInput,
              id: transactionId,
              status: "complete",
            })
        );
        getAccountMock.mockResolvedValueOnce({ ...fromAccount });
        putTransactionMock.mockImplementation((transaction: Transaction) =>
          Promise.resolve(transaction)
        );
        // to mocks
        getUserMock.mockResolvedValueOnce(toUser);
        getAccountMock.mockResolvedValueOnce({ ...toAccount });
        const result = await transfer(
          fromUserId,
          fromAccountId,
          toUserId,
          toAccountId,
          100
        );
        expect(result).toStrictEqual({
          withdrawal: {
            id: transactionId,
            accountId: fromAccountId,
            amount: 100,
            type: "withdrawal",
            status: "complete",
          },
          deposit: {
            id: transactionId,
            accountId: toAccountId,
            amount: 100,
            type: "deposit",
            status: "complete",
          },
        });
        expect(putAccountMock).toHaveBeenCalledTimes(2);
        expect(putAccountMock).toHaveBeenNthCalledWith(1, {
          balance: 900,
          id: fromAccountId,
          type: "savings",
        });
        expect(putAccountMock).toHaveBeenNthCalledWith(2, {
          balance: 1100,
          id: toAccountId,
          type: "savings",
        });
      });
    });
  });
});
