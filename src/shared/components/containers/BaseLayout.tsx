"use client";
import { FC } from "react";
import { MainTitle } from "../Typography";
import { Box } from "./Box";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDialog } from "@/store/store";

type LayoutAction = {
  label: string;
  color?: string;
  query?: string;

  action: (id: Record<string, string>) => void;
};
interface BaseLayoutProps {
  title: string;
  actions?: LayoutAction[];
  children: React.ReactNode;
}
export const BaseLayout: FC<BaseLayoutProps> = ({
  title,
  actions = [],
  children,
}): JSX.Element => {
  const dialog = useDialog((state) => state);

  const handleDialog = {
    openSyncDialog: dialog.handleSyncDialog,
    openCreateCharacterDialog: dialog.handleCreateCharacterDialog,
    openCharacterFilters: dialog.handleCharacterFilterDialog,
  };
  const layoutButtons = (
    <Box className="flex gap-3">
      {actions.map(({ label, query = "" }, idx) => {
        const k = query as keyof typeof handleDialog;
        return (
          <Button
            key={idx}
            className={cn(`bg-blue-950`)}
            onClick={() => {
              handleDialog[k]();
            }}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
  return (
    <div className="w-full">
      <Box className="flex">
        <Box className="flex-1">
          <MainTitle text={title} color="mediumNext" separator />
        </Box>
        {actions && actions.length > 0 ? layoutButtons : null}
      </Box>
      {children}
    </div>
  );
};
