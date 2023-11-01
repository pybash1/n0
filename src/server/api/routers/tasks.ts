import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ task: z.string(), done: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const day = new Date(new Date().setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return await ctx.db.put({
        habit: input.task,
        days: { [dateStr]: input.done },
        archived: false,
      });
    }),

  init: publicProcedure
    .input(z.object({ id: z.string(), date: z.date() }))
    .mutation(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      await ctx.db.update(
        {
          [`days.${dateStr}`]: false,
        },
        input.id,
      );
    }),

  get: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return (
        await ctx.db.fetch([
          {
            [encodeURIComponent(`days.${dateStr}`)]: false,
          },
          {
            [encodeURIComponent(`days.${dateStr}`)]: true,
          },
        ])
      ).items;
    }),

  getAll: publicProcedure.query(
    async ({ ctx }) => (await ctx.db.fetch({ archived: false })).items,
  ),

  markAsDone: publicProcedure
    .input(z.object({ id: z.string(), date: z.date(), done: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const day = new Date(input.date.setHours(0, 0, 0, 0));
      const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

      return await ctx.db.update(
        {
          [encodeURIComponent(`days.${dateStr}`)]: !input.done,
        },
        input.id,
      );
    }),

  archive: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.update(
        {
          archived: true,
        },
        input.id,
      );
    }),
});
