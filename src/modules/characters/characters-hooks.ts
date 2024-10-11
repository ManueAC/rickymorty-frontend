import { useForm } from "react-hook-form";
import { characterFilterSchema, characterSchema } from "./characters-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CharacterFilterSchemaType,
  CharacterSchemaType,
} from "./characters-types";

export const useCharacterForm = (defValues?: CharacterSchemaType) => {
  return useForm<CharacterSchemaType>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: defValues?.name ?? "",
      status: defValues?.status ?? "",
      species: defValues?.species ?? "",
      image: defValues?.image ?? "",
    },
  });
};

export const useCharacterFilterForm = () => {
  return useForm<CharacterFilterSchemaType>({
    resolver: zodResolver(characterFilterSchema),
    defaultValues: {
      gender: "",
      species: "",
      name: "",
      status: "",
    },
  });
};
