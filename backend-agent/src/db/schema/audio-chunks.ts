import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  vector,
} from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const audioChunks = pgTable('audio_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id')
    .references(() => rooms.id, { onDelete: 'cascade' })
    .notNull(),
  transcription: text('transcription').notNull(),
  embeddings: vector('embeddings', { dimensions: 768 }).notNull(),
  provider: varchar('provider', { length: 50 }).default('record').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const audioChunksRelations = relations(audioChunks, ({ one }) => ({
  room: one(rooms, {
    fields: [audioChunks.roomId],
    references: [rooms.id],
  }),
}))
