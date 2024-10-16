import { z } from "zod";

export const episodeSchema = z.object({
  name: z.string().min(2).max(50),
  episode: z.string(),
  air_date: z.string(),
  created: z.string(),
  status: z.string(),
  characters: z.array(z.string()),
});

export const episodeFilterSchema = z.object({
  name: z.string(),
  episode: z.string(),
  season: z.string(),
});
