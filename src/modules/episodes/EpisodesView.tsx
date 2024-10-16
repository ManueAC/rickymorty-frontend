import { Dialog } from "@/components/ui/dialog";
import { BaseLayout } from "@/shared/components/containers/BaseLayout";
import { Box } from "@/shared/components/containers/Box";
import { EpisodesFilters } from "./components/EpisodesFilters";
import { EpisodesTable } from "./components/EpisodeTable";
import { DeleteEpisodeModal } from "./components/DeleteEpisodeModal";
import { CreateEpisodeModal } from "./components/CreateEpisodeModal";

export const EpisodesView = () => {
  return (
    <Dialog>
      <BaseLayout
        title="EPISODES"
        actions={[
          {
            label: "Create",
            color: "green-700",
            query: "openCreateEpisodeDialog",
          },
        ]}
      >
        <EpisodesFilters />

        <Box className="mt-5">
          <EpisodesTable />
        </Box>
        {/* <CreateUserModal />
        <SyncCharactersModal />
        <DeleteCharactersModal /> */}
        <CreateEpisodeModal />
        <DeleteEpisodeModal />
      </BaseLayout>
    </Dialog>
  );
};
