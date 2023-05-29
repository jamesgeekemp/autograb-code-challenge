import { Account, AccountInput } from "../model/account.ts";
import { Transaction, TransactionInput } from "../model/transaction.ts";
import { User, UserInput } from "../model/user.ts";
import { v4 as uuid } from "uuid";

const users: User[] = [];
const transactions: Transaction[] = [];
const accounts: Account[] = [];

const deleteItem = <T extends { id: string }>(item: T, container: T[]) => {
  const itemInContainer = container.find((i) => i.id === item.id);
  if (itemInContainer) container.splice(container.indexOf(itemInContainer), 1);
};

const put = <T extends { id: string }>(item: T, container: T[]) => {
  deleteItem(item, container);
  container.push(item);
};

export default {
  getUser: async (_id: string): Promise<User | undefined> =>
    users.find((user) => user.id === _id),
  postUser: async (_userInput: UserInput): Promise<User | undefined> => {
    const user: User = { ..._userInput, id: uuid() };
    users.push(user);
    return user;
  },
  putUser: async (_user: User): Promise<User | undefined> => {
    put(_user, users);
    return _user;
  },
  postTransaction: async (
    _transactionInput: TransactionInput
  ): Promise<Transaction | undefined> => {
    const transaction = {
      ..._transactionInput,
      id: uuid(),
      utcTimestamp: new Date().toUTCString(),
      status: "complete" as "complete" | "failed",
    };
    transactions.push(transaction);
    return transaction;
  },
  putTransaction: async (
    _transaction: Transaction
  ): Promise<Transaction | undefined> => {
    put(_transaction, transactions);
    return _transaction;
  },
  postAccount: async (
    _accountInput: AccountInput
  ): Promise<Account | undefined> => {
    const account = { ..._accountInput, id: uuid() };
    accounts.push(account);
    return account;
  },
  putAccount: async (_account: Account): Promise<Account | undefined> => {
    put(_account, accounts);
    return _account;
  },
  getAccount: async (_id: string): Promise<Account | undefined> =>
    accounts.find((account) => account.id === _id),
  getAccounts: async (): Promise<Account[] | undefined> => accounts,
};
