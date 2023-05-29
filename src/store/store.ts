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
  getUser: async (id: string): Promise<User | undefined> =>
    users.find((user) => user.id === id),
  postUser: async (userInput: UserInput): Promise<User | undefined> => {
    const user: User = { ...userInput, id: uuid() };
    users.push(user);
    return user;
  },
  putUser: async (user: User): Promise<User | undefined> => {
    put(user, users);
    return user;
  },
  postTransaction: async (
    transactionInput: TransactionInput
  ): Promise<Transaction | undefined> => {
    const transaction = {
      ...transactionInput,
      id: uuid(),
      utcTimestamp: new Date().toUTCString(),
      status: "complete" as "complete" | "failed",
    };
    transactions.push(transaction);
    return transaction;
  },
  putTransaction: async (
    transaction: Transaction
  ): Promise<Transaction | undefined> => {
    put(transaction, transactions);
    return transaction;
  },
  postAccount: async (
    accountInput: AccountInput
  ): Promise<Account | undefined> => {
    const account = { ...accountInput, id: uuid() };
    accounts.push(account);
    return account;
  },
  putAccount: async (account: Account): Promise<Account | undefined> => {
    put(account, accounts);
    return account;
  },
  getAccount: async (id: string): Promise<Account | undefined> =>
    accounts.find((account) => account.id === id),
  getAccounts: async (): Promise<Account[] | undefined> => accounts,
};
