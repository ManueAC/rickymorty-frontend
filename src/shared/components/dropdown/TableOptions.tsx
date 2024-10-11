"use client";
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
import { useDialog } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";

export type TableOption = {
  label: string;
  query: string;
  data: Record<string, unknown>;
};

interface TableOptionsProps {
  options: TableOption[];
}
export const TableOptions: FC<TableOptionsProps> = ({ options }) => {
  const dialog = useDialog();
  const router = useRouter();
  const pathname = usePathname();

  const handleDialog = {
    openSyncDialog: dialog.handleSyncDialog,
    openCreateCharacterDialog: dialog.handleCreateCharacterDialog,
    openCharacterFilters: dialog.handleCharacterFilterDialog,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton component={<Menu />} />
      </DropdownMenuTrigger>
      {/*  */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {options.map(({ label, query, data }, key) => {
            const k = query as keyof typeof handleDialog;

            return (
              <DropdownMenuItem
                key={key}
                onClick={() => {
                  router.push(`${pathname}?id=${data.id}`);
                  const t = setTimeout(() => {
                    handleDialog[k]();
                  }, 300);
                }}
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
