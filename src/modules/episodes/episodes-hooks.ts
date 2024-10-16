import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EpisodeFilterSchemaType, EpisodeSchemaType } from "./episodes-types";
import { episodeFilterSchema, episodeSchema } from "./episodes-schemas";

export const useEpisodeForm = (defValues?: EpisodeSchemaType) => {
  return useForm<EpisodeSchemaType>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      name: defValues?.name ?? "",
      status: defValues?.status ?? "",
      air_date: "",
      created: "",
      episode: "",
    },
  });
};

export const useEpisodeFilterForm = () => {
  return useForm<EpisodeFilterSchemaType>({
    resolver: zodResolver(episodeFilterSchema),
    defaultValues: {
      name: "",
      season: "",
      episode: "",
    },
  });
};
