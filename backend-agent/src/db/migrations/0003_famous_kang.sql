ALTER TABLE "audio_chunks" DROP CONSTRAINT "audio_chunks_room_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "audio_chunks" ADD COLUMN "provider" varchar(50) DEFAULT 'record' NOT NULL;--> statement-breakpoint
ALTER TABLE "audio_chunks" ADD CONSTRAINT "audio_chunks_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;