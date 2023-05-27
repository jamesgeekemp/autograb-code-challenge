import { Account } from "../model/account.ts";
import { Transaction, TransactionInput } from "../model/transaction.ts";
import { User } from "../model/user.ts";

export default {
  getUser: async (_id: string): Promise<User | undefined> => undefined,
  postTransaction: async (
    _transactionInput: TransactionInput
  ): Promise<Transaction | undefined> => undefined,
  putTransaction: async (
    _transaction: Transaction
  ): Promise<Transaction | undefined> => undefined,
  putAccount: async (_account: Account): Promise<Account | undefined> =>
    undefined,
  getAccount: async (_id: string): Promise<Account | undefined> => undefined,
};
