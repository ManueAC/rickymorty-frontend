import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, {
    message: "Username must contain at least 5 characters(s)",
  }),
  password: z.string().min(5, {
    message: "Password must contain at least 5 characters(s)",
  }),
});
