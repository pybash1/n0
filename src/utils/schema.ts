import { Deta } from "base-safe";
import { env } from "~/env.mjs";
import { z } from "zod";

const N0BaseSchema = z.object({
  habit: z.string(),
  days: z.record(z.string().regex(/\d?\d-\d?\d-\d\d\d\d/), z.boolean()),
  archived: z.boolean().optional(),
  user: z.string(),
});

const N0SelfHostBaseSchema = z.object({
  habit: z.string(),
  days: z.record(z.string().regex(/\d?\d-\d?\d-\d\d\d\d/), z.boolean()),
  archived: z.boolean().optional(),
});

export const N0Base = Deta(env.DETA_API_KEY).TypedBase(
  "n0",
  env.SELF_HOST ? N0SelfHostBaseSchema : N0BaseSchema,
);
