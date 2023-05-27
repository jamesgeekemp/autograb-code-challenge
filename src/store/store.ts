import { Account, AccountInput } from "../model/account.ts";
import { Transaction, TransactionInput } from "../model/transaction.ts";
import { User, UserInput } from "../model/user.ts";

export default {
  getUser: async (_id: string): Promise<User | undefined> => undefined,
  postUser: async (_userInput: UserInput): Promise<User | undefined> =>
    undefined,
  postTransaction: async (
    _transactionInput: TransactionInput
  ): Promise<Transaction | undefined> => undefined,
  putTransaction: async (
    _transaction: Transaction
  ): Promise<Transaction | undefined> => undefined,
  postAccount: async (
    _accountInput: AccountInput
  ): Promise<Account | undefined> => undefined,
  putAccount: async (_account: Account): Promise<Account | undefined> =>
    undefined,
  getAccount: async (_id: string): Promise<Account | undefined> => undefined,
  getAccounts: async (): Promise<Account[] | undefined> => undefined,
};
