import { z } from "zod";
import { publicProcedure, router } from "../trcp";


let post = {
  id: 1,
  name: "Hello World",
};

export const defaultRouter = router({
  connect: publicProcedure.query(() => ({
    status: "Server connected",
  })),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
