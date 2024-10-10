import { PencilIcon, TrashIcon } from "lucide-react";
import { BaseLayout } from "@/shared/components/containers/BaseLayout";
import { Box } from "@/shared/components/containers/Box";
import { Table } from "@/shared/components/table/Tables";
import { Select } from "@/shared/components/select/Select";

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
const speciesOptions = [
  {
    label: "ALIEN",
    value: "alien",
  },
  {
    label: "HUMAN",
    value: "human",
  },
];
const statusOptions = [
  {
    label: "active",
    value: "active",
  },
  {
    label: "suspended",
    value: "suspended",
  },
];
const genderOptions = [
  {
    label: "male",
    value: "male",
  },
  {
    label: "female",
    value: "female",
  },
];

export const CharactersView = () => {
  const updatingItem = (id: string, data: Record<string, any>) => {
    console.log("Updating character:", id, data);
  };
  const deleteItem = (id: string) => {
    console.log("Deleting character:", id);
  };

  const mapHeadLabels = [
    "Name",
    "Status",
    "Active",
    "Participation",
    "Actions",
  ].map((label) => ({
    label: label,
  }));

  const mapBodyRow = characters.map((char) => ({
    ...char,
    actions: [
      {
        label: "edit",
        // action: <IconButton component={<PencilIcon size={17} />} />,
        action: () => updatingItem(char.id, char),
      },
      {
        label: "delete",
        // action: <IconButton component={<TrashIcon size={17} />} />,
        action: deleteItem(char.id),
      },
    ],
  }));

  return (
    <BaseLayout title="CHARACTERS">
      <Box className="flex gap-4 mt-3 border-b pb-5">
        <Select placeholder="Select" label="Species" options={speciesOptions} />
        <Select placeholder="Select" label="Status" options={statusOptions} />
        <Select placeholder="Select" label="Gender" options={genderOptions} />
      </Box>
      <Box className="mt-5">
        <Table
          head={mapHeadLabels}
          data={mapBodyRow}
          footerDescription="A list of your recent invoices."
        />
      </Box>
    </BaseLayout>
  );
};
