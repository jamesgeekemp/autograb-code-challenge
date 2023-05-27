import store from "../store/store.ts";

export const checkWholeBankBalance = async (): Promise<number> => {
  const accounts = await store.getAccounts();
  if (!accounts) throw new Error("Error retrieving accounts");
  return accounts.reduce(
    (accumulatedBalance, account) => accumulatedBalance + account.balance,
    0
  );
};

export const checkAccountBalance = async (
  accountId: string
): Promise<number> => {
  const account = await store.getAccount(accountId);
  if (!account) throw new Error("Invalid account id");
  return account.balance;
};
