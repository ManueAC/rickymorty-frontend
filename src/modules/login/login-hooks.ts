import { useForm } from "react-hook-form";
import { loginSchema } from "./login-schema";
import { LoginSchemaType } from "./login-types";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = (defValues?: LoginSchemaType) => {
  return useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: defValues?.username ?? "",
      password: defValues?.password ?? "",
    },
  });
};
