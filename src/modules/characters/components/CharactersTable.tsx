"use client";
import { Table } from "@/shared/components/table/Tables";
import { CharacterType, useStore } from "@/store/store";
import { Box } from "@/shared/components/containers/Box";

export const CharactersTable = (): JSX.Element => {
  const store = useStore();

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
  const paginate = (
    // array: Array<Record<string, string | number>>,
    array: CharacterType[],
    pageSize: number,
    pageNumber: number
  ) => {
    // Calcula el índice de inicio
    const startIndex = (pageNumber - 1) * pageSize;

    // Extrae la porción del array
    return array.slice(startIndex, startIndex + pageSize);
  };
  console.log("====================================");
  console.log("paginate", paginate(characters, characters?.length, 1));
  console.log("====================================");
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
    <Box className="overflow-auto max-h-[400px]">
      <Table
        head={mapHeadLabels}
        data={mapBodyRow}
        footerDescription="A list of your characters invoices."
      />
    </Box>
  );
};
