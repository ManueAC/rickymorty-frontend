import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginView = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <div className="w-[300px] flex flex-col text-center p-4 rounded-lg shadow-md gap-4">
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button variant={"default"}>Submit</Button>
        <Button variant={"secondary"}>Sign Up</Button>
      </div>
    </div>
  );
};
