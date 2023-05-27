import store from "../store/store.ts";

export const checkBalance = async (accountId: string): Promise<number> => {
  const account = await store.getAccount(accountId);
  if (!account) throw new Error("Invalid account id");
  return account.balance;
};
