import { Transaction, parseTransactionInput } from "../../model/transaction.ts";
import store from "../../store/store.ts";

const depositAccount = async (accountId: string, amount: number) => {
  const account = await store.getAccount(accountId);

  if (!account) throw new Error("Invalid account id");

  // TODO: business rules around whether deposit can proceed for this account type
  account.balance += amount;
  await store.putAccount(account);
};

export const deposit = async (
  userId: string,
  accountId: string,
  amount: number
): Promise<Transaction> => {
  const user = await store.getUser(userId);
  if (!user) throw new Error("Invalid user id");
  const transactionInput = parseTransactionInput({
    accountId,
    amount,
    type: "deposit",
  });
  const transaction = await store.postTransaction(transactionInput);
  if (!transaction) throw new Error("Failed to create transaction");
  if (transaction.status === "complete") {
    try {
      await depositAccount(accountId, amount);
    } catch (err) {
      console.log(err);
      transaction.status = "failed";
      await store.putTransaction(transaction);
    }
  }
  return transaction;
};
