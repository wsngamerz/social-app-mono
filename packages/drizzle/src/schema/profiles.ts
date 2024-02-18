import { pgTable, text, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import {type InferSelectModel} from "drizzle-orm";

export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    displayName: text('display_name'),
    username: varchar('username').unique(),
    profileImage: text('profile_image'),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Profile = InferSelectModel<typeof profiles>;