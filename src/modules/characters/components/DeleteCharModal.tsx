"use client";

import Link from "next/link";
import { DialogDescription } from "@radix-ui/react-dialog";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Box } from "@/shared/components/containers/Box";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useDialog } from "@/store/store";

export type ApiCharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  // eslint-disable-next-line
  results: Record<string, any>[];
};

export const DeleteCharactersModal = (): JSX.Element => {
  const dialog = useDialog((state) => state);
  const params = useSearchParams();
  const { removeData } = useLocalStorage("characters");

  const path = usePathname();

  const id = Number(params.get("id"));

  const onSubmit = () => {
    if (id) {
      removeData("characters", id);
    }
    toast({
      title: "Delete character",
      description: "Success",
    });
    dialog.handleCharDeleteDialog();
  };

  return (
    <Dialog open={dialog.openDeleteCharacter}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            Delete character
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <Box className="flex justify-center gap-4 w-full">
          <Button variant={"destructive"} onClick={() => onSubmit()}>
            <Link
              href={{
                pathname: path,
                query: null,
              }}
            >
              Delete
            </Link>
          </Button>
          <DialogClose>
            <Button>
              <Link
                href={{
                  pathname: path,
                  query: null,
                }}
                onClick={() => {
                  dialog.handleCharDeleteDialog();
                }}
              >
                Cancel
              </Link>
            </Button>
          </DialogClose>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
