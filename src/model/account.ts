import { z } from "zod";

const AccountInput = z.object({
  balance: z.number(),
  type: z.enum(["savings", "credit", "homelone"]),
});

const Account = AccountInput.extend({
  id: z.string(),
});

export const parseAccount = (account: Account) => Account.parse(account);
export const parseAccountInput = (accountInput: AccountInput) =>
  AccountInput.parse(accountInput);

export type Account = z.infer<typeof Account>;
export type AccountInput = z.infer<typeof AccountInput>;
