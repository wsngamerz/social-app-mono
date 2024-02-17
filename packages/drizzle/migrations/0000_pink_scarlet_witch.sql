CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"display_name" text,
	"username" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
