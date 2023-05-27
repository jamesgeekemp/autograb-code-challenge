import { Transaction, parseTransactionInput } from "../model/transaction.ts";
import store from "../store/store.ts";

const applyTransactionToAccount = async (
  accountId: string,
  transaction: Transaction
) => {
  const account = await store.getAccount(accountId);
  if (!account) throw new Error("Invalid account id");
  switch (transaction.type) {
    case "deposit":
      account.balance += transaction.amount;
      break;
    case "withdrawal":
      if (transaction.amount > account.balance)
        throw new Error("Insufficient funds!");
      account.balance -= transaction.amount;
      break;
  }
  await store.putAccount(account);
};

export const deposit = async (
  userId: string,
  accountId: string,
  amount: number
): Promise<Transaction> => {
  const user = await store.getUser(userId);
  if (!user) throw new Error("Invalid user id");
  const transactionType = amount > 0 ? "deposit" : "withdrawal";
  const transactionInput = parseTransactionInput({
    accountId,
    amount: transactionType === "withdrawal" ? amount * -1 : amount,
    type: transactionType,
  });
  const transaction = await store.postTransaction(transactionInput);
  if (!transaction) throw new Error("Failed to create transaction");
  if (transaction.status === "complete") {
    try {
      await applyTransactionToAccount(accountId, transaction);
    } catch (err) {
      transaction.status = "failed";
      await store.putTransaction(transaction);
    }
  }
  return transaction;
};

export const withdrawal = (userId: string, accountId: string, amount: number) =>
  deposit(userId, accountId, amount * -1);
