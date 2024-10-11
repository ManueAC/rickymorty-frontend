import { z } from "zod";
import { loginSchema } from "./login-schema";

export type LoginSchemaType = z.infer<typeof loginSchema>;
