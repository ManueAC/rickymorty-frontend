import { Button } from "@/components/ui/button";
import { FC } from "react";

interface IconButtonProps {
  component: React.ReactNode;
}
export const IconButton: FC<IconButtonProps> = ({ component }) => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="hover:bg-slate-300 rounded"
    >
      {component}
    </Button>
  );
};
