"use client";
import { Button } from "@/components/ui/button";
import { episodesOptions, seasonsOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { Box } from "@/shared/components/containers/Box";
import {
  FormInputBase,
  FormSelectBase,
} from "@/shared/components/input/FormInputBase";
import { EpisodeFilterSchemaType } from "../episodes-types";
import { Form } from "@/components/ui/form";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useEpisodeFilterForm } from "../episodes-hooks";
import { useStore } from "@/store/store";
import { useState } from "react";

export const EpisodesFilters = (): JSX.Element | null => {
  const store = useStore();
  const { setDataAll, refresh } = useLocalStorage(API_ENTITY_ENUM.episode);
  const [currentSeason, setCurrentSeason] = useState<string>();
  const [currentEpisode, setCurrentEpisode] = useState<string>();
  const form = useEpisodeFilterForm();

  const totalEpisodes = store?.episodes?.info?.count ?? currentEpisode;
  const control = form.control;

  const onSubmit = async (values: EpisodeFilterSchemaType) => {
    setCurrentSeason(values.season);
    setCurrentEpisode(values.episode);

    const epistleNroFormat =
      Number(values.episode) < 10 ? `0${values.episode}` : values.episode;
    const seasonNroFormat = Boolean(values.season) ? `S0${values.season}` : "";

    const formatEpisode = `${seasonNroFormat}${
      values.episode ? `E${epistleNroFormat}` : ""
    }`;

    const data = await fetchAPI(API_ENTITY_ENUM.episode, {
      ...values,
      episode: formatEpisode,
    });

    setDataAll("episodes", data);
    refresh();
  };
  const episodeSelector = episodesOptions(totalEpisodes);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box className={cn("flex gap-4 mt-3 border-b  items-end")}>
          <FormInputBase
            control={control}
            entity="Episode"
            label={"Name"}
            name={"name"}
            form={form}
          />
          <FormSelectBase
            entity="Season"
            control={control}
            label={"Season"}
            name={"season"}
            form={form}
            options={seasonsOptions}
          />
          <FormSelectBase
            showComp
            entity="Episode"
            control={control}
            label={"Episode"}
            name={"episode"}
            form={form}
            options={episodeSelector}
            disabled={!currentSeason}
          />
          {/* <FormSelectBase
            entity="Status"
            control={control}
            label={"Status"}
            name={"status"}
            form={form}
            options={genderOptions}
          /> */}

          <Button type="submit" className="ml-4 mb-6">
            Apply
          </Button>
          <Button
            className="mb-6"
            onClick={() => {
              form.reset();
            }}
          >
            Clear
          </Button>
        </Box>
      </form>
    </Form>
  );
};
