import { z } from "zod";

const UserInput = z.object({
  username: z.string(),
  role: z.enum(["customer", "bank manager"]),
});

const User = UserInput.extend({
  id: z.string(),
});

export const parseUser = (user: User) => User.parse(user);
export const parseUserInput = (userInput: UserInput) =>
  UserInput.parse(userInput);

export type User = z.infer<typeof User>;
export type UserInput = z.infer<typeof UserInput>;
