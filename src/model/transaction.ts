import { z } from "zod";

const TransactionInput = z.object({
  accountId: z.string(),
  amount: z.number(),
  type: z.enum(["deposit", "withdrawal"]),
});

const Transaction = TransactionInput.extend({
  id: z.string(),
  utcTimestamp: z.string().datetime(),
  status: z.enum(["complete", "failed"]),
});

const Transfer = z.object({
  withdrawal: Transaction,
  deposit: Transaction,
});

export const parseTransaction = (transaction: Transaction) =>
  Transaction.parse(transaction);
export const parseTransfer = (transfer: Transfer) => Transfer.parse(transfer);
export const parseTransactionInput = (transactionInput: TransactionInput) =>
  TransactionInput.parse(transactionInput);

export type Transaction = z.infer<typeof Transaction>;
export type Transfer = z.infer<typeof Transfer>;
export type TransactionInput = z.infer<typeof TransactionInput>;
