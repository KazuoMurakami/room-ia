import { count, countDistinct, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getStatsRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/stats', async () => {
    const stats = await db
      .select({
        totalRooms: countDistinct(schema.rooms.id),
        totalQuestions: countDistinct(schema.questions.id),
        totalAnswers: countDistinct(schema.questions.id), // supondo tabela answers
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))

    return stats
  })
}
