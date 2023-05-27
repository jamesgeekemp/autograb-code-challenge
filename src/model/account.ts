import { z } from "zod";

const Account = z.object({
  id: z.string(),
  balance: z.number(),
  type: z.enum(["savings", "credit", "homelone"]),
});

export const parseAccount = (account: Account) => Account.parse(account);

export type Account = z.infer<typeof Account>;
