"use server";
import { BaseLayout } from "@/shared/components/containers/BaseLayout";
import { Box } from "@/shared/components/containers/Box";
import { CreateUserModal } from "@/shared/components/modal/CreateUserModal";
import { Dialog } from "@/components/ui/dialog";
import { SyncCharactersModal } from "./components/SyncCharactersModal";
import { CharactersTable } from "./components/CharactersTable";
import { CharacterFilters } from "./components/CharacterFilters";

export type CharType = {
  id: string;
  name: string;
  status: string;
  species: string;
  participationCount: number;
};

export const CharactersView = () => {
  async function openCreateChar() {
    "use server";
  }

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
