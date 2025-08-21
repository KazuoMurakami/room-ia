import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

export const uploadMp3AudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/mp3-audio',
    {
      schema: {
        params: z.object({
          roomId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { roomId } = request.params as { roomId: string }

        const file = await request.file()

        if (!file) {
          return reply.status(400).send({ error: 'No file uploaded.' })
        }

        const chunks: Buffer[] = []

        for await (const chunk of file.file) {
          chunks.push(chunk)
        }

        const fileBuffer = Buffer.concat(chunks)
        const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2)
        console.log(
          `💾 Arquivo processado: ${fileBuffer.length} bytes (${fileSizeMB} MB)`
        )

        if (!fileBuffer || fileBuffer.length === 0) {
          return reply.status(400).send({ error: 'Invalid or empty file.' })
        }

        const mimeType = file.mimetype || 'audio/mp3'

        const audioAsBase64 = fileBuffer.toString('base64')
        const base64SizeMB = (
          (audioAsBase64.length * 0.75) /
          1024 /
          1024
        ).toFixed(2)

        // Gemini tem um limite de 15mb por audio
        if (audioAsBase64.length > 20 * 1024 * 1024) {
          console.log(
            '⚠️ Arquivo muito grande para processamento direto pelo Gemini'
          )

          return reply.status(400).send({
            error:
              'Arquivo muito grande. Por favor, use um arquivo menor que 15MB ou divida em partes menores.',
          })
        }

        const fullTranscription = await transcribeAudio(audioAsBase64, mimeType)

        const wordsPerChunk = 100
        const words = fullTranscription.split(' ')
        const totalChunks = Math.ceil(words.length / wordsPerChunk)

        console.log(
          `Dividindo em ${totalChunks} chunks de ~${wordsPerChunk} palavras cada`
        )

        const chunkPromises = []

        for (let i = 0; i < totalChunks; i++) {
          const startIndex = i * wordsPerChunk
          const endIndex = Math.min(startIndex + wordsPerChunk, words.length)
          const chunkText = words.slice(startIndex, endIndex).join(' ')

          if (chunkText.trim().length === 0) continue

          console.log(
            `🧠 Processando chunk ${
              i + 1
            }/${totalChunks}: "${chunkText.substring(0, 50)}..."`
          )

          const chunkPromise = generateEmbeddings(chunkText).then(
            async (embeddings) => {
              await db.insert(schema.audioChunks).values({
                roomId,
                transcription: chunkText,
                embeddings,
                provider: 'upload',
              })
            }
          )

          chunkPromises.push(chunkPromise)
        }

        await Promise.all(chunkPromises)

        console.log(
          `✅ Upload MP3 processado com sucesso! ${totalChunks} chunks criados.`
        )
        return reply.status(204).send()
      } catch (error) {
        console.error('Error processing MP3 audio:', error)
        return reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
