import { z } from "zod";
import { characterFilterSchema, characterSchema } from "./characters-schemas";

export type CharacterSchemaType = z.infer<typeof characterSchema>;
export type CharacterFilterSchemaType = z.infer<typeof characterFilterSchema>;
