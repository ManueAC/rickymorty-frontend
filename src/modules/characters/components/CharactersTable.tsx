"use client";
import { Table } from "@/shared/components/table/Tables";
import { CharacterType, useStore } from "@/store/store";
import { Box } from "@/shared/components/containers/Box";
import { useState } from "react";
import Paginator from "@/shared/components/pagination/Paginator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { TableLoader } from "@/shared/components/table/TableLoader";

export const CharactersTable = (): JSX.Element => {
  const store = useStore();

  const pathname = usePathname();

  const { setDataAll, refresh } = useLocalStorage("characters");

  const id = useSearchParams().get("id");

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);

  const pagInfo = store.characters.info.pages;

  const onSubmit = async (page: number) => {
    setLoading(true);
    const data = await fetchAPI(
      API_ENTITY_ENUM.character,
      page
        ? {
            page: String(page),
          }
        : undefined
    );

    setDataAll("characters", data);
    refresh();
    toast({
      title: "Pagination",
      description: "Completed",
    });
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(pathname + "?page=" + page + `${id ? `id=${id}` : ""}`);
    onSubmit(page);
  };

  const mapHeadLabels = [
    "Avatar",
    "Name",
    "Type",
    "Gender",
    "Status",
    "Actions",
  ].map((label) => ({
    label: label,
  }));

  const characters = store.characters.results;

  const mapBodyRow: CharacterType[] =
    characters?.length > 0
      ? characters?.map((char) => ({
          id: char?.id,
          image: char?.image,
          name: char?.name,
          species: char?.species,
          gender: char?.gender,
          status: char?.status,
          actions: [
            {
              label: "edit",
              query: "openCreateCharacterDialog",
            },
            {
              label: "delete",
              query: "openDeleteCharDialog",
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
            footerDescription="A list of your characters invoices."
          />
        </Box>
        {loading && <TableLoader />}
      </Box>
      <Paginator
        currentPage={currentPage}
        totalPages={pagInfo}
        onPageChange={handlePageChange}
        showPreviousNext={true}
      />
    </Box>
  );
};
