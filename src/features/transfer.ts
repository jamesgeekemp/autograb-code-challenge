import { Transaction, Transfer } from "../model/transaction.ts";

export const transfer = async (
  fromAccountId: string,
  toAccountId: string,
  transferAmount: number
): Promise<Transfer> => {
  return {
    withdrawal: {
      accountId: fromAccountId,
      amount: transferAmount,
      type: "withdrawal",
    } as Transaction,
    deposit: {
      accountId: toAccountId,
      amount: transferAmount,
      type: "deposit",
    } as Transaction,
  };
};
