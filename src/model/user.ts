import { z } from "zod";

const User = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(["customer", "bank manager"]),
});

export const parseUser = (user: User) => User.parse(user);

export type User = z.infer<typeof User>;
