import { count, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getStatsRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/stats", async () => {
    const stats = await db
      .select({
        totalRooms: count(schema.rooms.id),
        totalQuestions: count(schema.questions.id),
        totalAnswers: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id));

    return stats;
  });
};
