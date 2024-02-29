ALTER TABLE "replies" ADD COLUMN "deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "replies" ADD COLUMN "deleted_at" timestamp;