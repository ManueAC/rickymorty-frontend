"use client";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputBase } from "@/shared/components/input/FormInputBase";
import { useLoginForm } from "./login-hooks";
import { LoginSchemaType } from "./login-types";
import { MainTitle } from "@/shared/components/Typography";
import { useStore } from "@/store/store";
import { random } from "lodash";
import { useRouter } from "next/navigation";

export const LoginView = (): JSX.Element => {
  const form = useLoginForm();
  const router = useRouter();
  const store = useStore();

  const onSubmit = (values: LoginSchemaType) => {
    store.saveUser(values);
    const token = {
      ...values,
      exp: random(100000),
    };

    const expDays = token.exp;

    Cookies.set("token", JSON.stringify(token), {
      expires: expDays,
      secure: true,
    });

    router.push("/characters");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-teal-100">
      <div className="w-[300px] flex flex-col text-center p-4 rounded-lg shadow-md my-auto gap-4 bg-slate-50">
        <MainTitle text="Welcome, stranger" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputBase
              control={form.control}
              entity=""
              label={""}
              placeholder="Username"
              name={"username"}
              form={form}
            />
            <FormInputBase
              control={form.control}
              entity=""
              label={""}
              name={"password"}
              placeholder="Password"
              type={"password"}
              form={form}
            />
            <Button type="submit" variant={"default"}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
