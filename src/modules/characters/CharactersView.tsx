"use server";
// 'use client';
import { BaseLayout } from "@/shared/components/containers/BaseLayout";
import { Box } from "@/shared/components/containers/Box";
import { Table } from "@/shared/components/table/Tables";
import { Select } from "@/shared/components/select/Select";
import { CreateUserModal } from "@/shared/components/modal/CreateUserModal";
import { Dialog } from "@/components/ui/dialog";
import {
  API_URL,
  genderOptions,
  speciesOptions,
  statusOptions,
} from "@/constants";
import { useCallback } from "react";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useStore } from "@/store/store";
import { SyncCharactersModal } from "./components/SyncCharactersModal";
import { getCharacters } from "@/lib/get-characters";
import { CharactersTable } from "./components/CharactersTable";
import { CharacterFilters } from "./components/CharacterFilters";

export type CharType = {
  id: string;
  name: string;
  status: string;
  species: string;
  participationCount: number;
};

const characters: CharType[] = [
  {
    id: "11111111111111",
    name: "Rick Sanchez",
    status: "ACTIVE",
    species: "HUMAN",
    participationCount: 93,
  },
  {
    id: "33333333333333",
    name: "Morty",
    status: "ACTIVE",
    species: "HUMAN",
    participationCount: 44,
  },
];

export const CharactersView = () => {
  async function openCreateChar(v: Record<string, string>) {
    "use server";
  }
  // eslint-disable-next-line

  return (
    <Dialog>
      <BaseLayout
        title="CHARACTERS"
        actions={[
          {
            label: "Create",
            color: "green-700",
            query: "openCreateCharacterDialog",
            action: openCreateChar,
          },
        ]}
      >
        <CharacterFilters />

        <Box className="mt-5">
          <CharactersTable />
        </Box>
        <CreateUserModal />
        <SyncCharactersModal />
      </BaseLayout>
    </Dialog>
  );
};
