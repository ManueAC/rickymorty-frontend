"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useDialog } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export const SyncCharactersModal = (): JSX.Element => {
  const dialog = useDialog((state) => state);

  const [sync, setSync] = useState<boolean>(false);
  const [charactersData, setCharactersData] = useState<ApiCharacterResponse>();

  const data = async (): Promise<void> => {
    const characters = await fetchAPI(API_ENTITY_ENUM.character);
    if (characters.results.length > 0) {
      setCharactersData(characters);
    }
    setSync(false);
  };

  useEffect(() => {
    if (sync) data();
  }, [sync]);

  useEffect(() => {
    if (charactersData) {
      if (charactersData?.results && charactersData?.results?.length > 0) {
        localStorage.setItem("characters", JSON.stringify(charactersData));
      }
    }
  }, [charactersData]);

  return (
    <Dialog open={dialog.openSyncDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            Sync characters
          </DialogTitle>
        </DialogHeader>
        <Button onClick={() => setSync(!sync)}>Fetch and Sync</Button>
        <Link
          href={{
            query: {
              openSync: false,
            },
          }}
        >
          Cancel
        </Link>
        <DialogClose>
          <Button onClick={() => dialog.handleSyncDialog()}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
