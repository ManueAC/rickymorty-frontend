import { z } from "zod";

export const characterSchema = z.object({
  name: z.string().min(2).max(50),
  status: z.string(),
  species: z.string(),
  image: z.string(),
  gender: z.string(),
});

export const characterFilterSchema = z.object({
  name: z.string(),
  status: z.string(),
  species: z.string(),
  gender: z.string(),
});
