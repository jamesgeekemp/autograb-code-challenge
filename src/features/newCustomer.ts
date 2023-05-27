import { parseAccountInput } from "../model/account.ts";
import { User, parseUserInput } from "../model/user.ts";
import store from "../store/store.ts";

export const newCustomer = async (
  username: string,
  balance: number
): Promise<User | undefined> => {
  const userInput = parseUserInput({ username, role: "customer" });
  const user = await store.postUser(userInput);
  if (!user) throw new Error("Unable to create user");
  const accountInput = parseAccountInput({ type: "savings", balance });
  const account = await store.postAccount(accountInput);
  if (!account) throw new Error("Unable to create account");
  return user;
};
