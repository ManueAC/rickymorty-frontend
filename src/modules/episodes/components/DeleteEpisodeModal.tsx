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
import { useGetQueryParams } from "@/shared/hooks/use-get-query-params";
import { API_ENTITY_ENUM } from "@/shared/hooks/api";

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

export const DeleteEpisodeModal = (): JSX.Element => {
  const dialog = useDialog((state) => state);
  const params = useSearchParams();
  const query = useGetQueryParams();
  const qry = { ...query };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: NewId, ...rest } = qry;

  const { removeData } = useLocalStorage(API_ENTITY_ENUM.episode);

  const path = usePathname();

  const id = Number(params.get("id"));

  const onSubmit = () => {
    if (id) {
      removeData("episodes", id);
    }
    toast({
      title: "Delete episode",
      description: "Success",
    });
    dialog.handleDeleteEpisodeDialog();
  };

  return (
    <Dialog open={dialog.openDeleteEpisode}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">Delete episode</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <Box className="flex justify-center gap-4 w-full">
          <Button variant={"destructive"} onClick={() => onSubmit()}>
            <Link
              href={{
                pathname: path,
                query: rest,
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
                  query: qry,
                }}
                onClick={() => {
                  dialog.handleDeleteEpisodeDialog();
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
