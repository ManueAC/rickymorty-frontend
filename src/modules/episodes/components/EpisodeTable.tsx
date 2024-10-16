"use client";

import { useState } from "react";
// import {  } from "luxon";

import { Box } from "@/shared/components/containers/Box";
import Paginator from "@/shared/components/pagination/Paginator";
import { TableLoader } from "@/shared/components/table/TableLoader";
import { Table } from "@/shared/components/table/Tables";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { EpisodeType, useStore } from "@/store/store";
import { DateTime } from "luxon";

export const EpisodesTable = (): JSX.Element => {
  const store = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const id = useSearchParams().get("id");

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { setDataAll, refresh } = useLocalStorage(API_ENTITY_ENUM.episode);

  const totalPages = store?.episodes?.info?.pages;

  const onSubmit = async (page: number) => {
    setLoading(true);
    const data = await fetchAPI(
      API_ENTITY_ENUM.episode,
      page
        ? {
            page: String(page),
          }
        : undefined
    );

    setDataAll("episodes", data);
    refresh();

    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(pathname + "?page=" + page + `${id ? `id=${id}` : ""}`);
    onSubmit(page);
  };

  const mapHeadLabels = [
    "Episode Nmb.",
    "Title",
    "Air date",
    "Created",
    "Characters",
    "Status",
    "Actions",
  ].map((label) => ({
    label: label,
  }));

  const episodes = store?.episodes?.results;

  const mapBodyRow /* Partial<EpisodeType>[] */ =
    episodes?.length > 0
      ? episodes?.map((episode: EpisodeType) => ({
          id: episode?.id,
          name: episode?.name,
          airDate: episode?.air_date,
          created: DateTime.fromISO(episode.created).toFormat("yyyy LLL dd"),
          characters: episode?.characters?.length,
          status: episode?.status,
          actions: [
            {
              label: "edit",
              query: "openCreateEpisodeDialog",
            },
            {
              label: "delete",
              query: "openDeleteEpisodeDialog",
            },
          ],
        }))
      : [];

  return (
    <Box>
      <Box className="relative">
        <Box className="overflow-auto max-h-[400px] mb-4">
          <Table
            head={mapHeadLabels}
            data={mapBodyRow}
            loading={loading}
            footerDescription="A list of your episodes."
          />
        </Box>

        {loading && <TableLoader />}
      </Box>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showPreviousNext={true}
      />
    </Box>
  );
};
