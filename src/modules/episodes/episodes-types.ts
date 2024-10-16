import { z } from "zod";
import { episodeFilterSchema, episodeSchema } from "./episodes-schemas";

export type EpisodeSchemaType = z.infer<typeof episodeSchema>;
export type EpisodeFilterSchemaType = z.infer<typeof episodeFilterSchema>;
