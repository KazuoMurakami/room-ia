import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createQuestionRoute } from "./http/routes/create-question.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomQuestions } from "./http/routes/get-room-questions.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { uploadAudioRoute } from "./http/routes/upload-audio.ts";
import { uploadMp3AudioRoute } from "./http/routes/upload-mp3-audio.ts";
import { getStatsRoomsRoute } from "./http/routes/stats-rooms.ts";

const app = fastify({
  bodyLimit: 10 * 1024 * 1024, // 50MB limit
  requestTimeout: 300000, // 5 minutes timeout
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 50MB limit for individual files
  },
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);
app.register(uploadMp3AudioRoute);
app.register(getStatsRoomsRoute);

app.listen({ port: env.PORT });
