import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "../Icon";
import { Menu } from "lucide-react";
import { FC } from "react";

export type TableOption = {
  label: string;
  action: () => void;
};

interface TableOptionsProps {
  options: TableOption[];
}
export const TableOptions: FC<TableOptionsProps> = ({ options }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton component={<Menu />} />
      </DropdownMenuTrigger>
      {/*  */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {options.map(({ label, action }) => {
            return (
              <DropdownMenuItem
              // onClick={action}
              >
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
