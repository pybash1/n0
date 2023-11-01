import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        task: z.string(),
        done: z.boolean(),
        user: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const day = new Date(new Date().setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return env.SELF_HOST
        ? await ctx.db.put({
            habit: input.task,
            days: { [dateStr]: input.done },
            archived: false,
          })
        : await ctx.pdb.put({
            habit: input.task,
            days: { [dateStr]: input.done },
            archived: false,
            user: input.user!,
          });
    }),

  init: publicProcedure
    .input(
      z.object({ id: z.string(), date: z.date(), user: z.string().optional() }),
    )
    .mutation(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      env.SELF_HOST
        ? await ctx.db.update(
            {
              [`days.${dateStr}`]: false,
            },
            input.id,
          )
        : await ctx.pdb.update(
            {
              [`days.${dateStr}`]: false,
              user: input.user!,
            },
            input.id,
          );
    }),

  get: publicProcedure
    .input(z.object({ date: z.date(), user: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return (
        env.SELF_HOST
          ? await ctx.db.fetch([
              {
                [encodeURIComponent(`days.${dateStr}`)]: false,
              },
              {
                [encodeURIComponent(`days.${dateStr}`)]: true,
              },
            ])
          : await ctx.pdb.fetch([
              {
                [encodeURIComponent(`days.${dateStr}`)]: false,
                user: input.user!,
              },
              {
                [encodeURIComponent(`days.${dateStr}`)]: true,
                user: input.user!,
              },
            ])
      ).items;
    }),

  getAll: publicProcedure
    .input(z.object({ user: z.string().optional() }))
    .query(
      async ({ input, ctx }) =>
        (env.SELF_HOST
          ? await ctx.db.fetch({ archived: false })
          : await ctx.pdb.fetch({ archived: false, user: input.user! })
        ).items,
    ),

  markAsDone: publicProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        done: z.boolean(),
        user: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return env.SELF_HOST
        ? await ctx.db.update(
            {
              [encodeURIComponent(`days.${dateStr}`)]: !input.done,
            },
            input.id,
          )
        : await ctx.pdb.update(
            {
              [encodeURIComponent(`days.${dateStr}`)]: !input.done,
              user: input.user!,
            },
            input.id,
          );
    }),

  archive: publicProcedure
    .input(z.object({ id: z.string(), user: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      return env.SELF_HOST
        ? await ctx.db.update(
            {
              archived: true,
            },
            input.id,
          )
        : await ctx.pdb.update(
            {
              archived: true,
              user: input.user!,
            },
            input.id,
          );
    }),

  selfHosted: publicProcedure.query(() => env.SELF_HOST),
});
