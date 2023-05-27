import { z } from "zod";

const Transaction = z.object({
  id: z.string(),
  accountId: z.string(),
  amount: z.number(),
  type: z.enum(["deposit", "withdrawal"]),
  utcTimestamp: z.string().datetime(),
  status: z.enum(["pending", "complete", "failed"]),
});

export const parseTransaction = (transaction: Transaction) =>
  Transaction.parse(transaction);

export type Transaction = z.infer<typeof Transaction>;
