import {boolean, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {type InferSelectModel, relations} from "drizzle-orm";
import {profiles} from "./profiles";

export const posts = pgTable('posts', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => profiles.id),
    text: text('text').notNull(),
    deleted: boolean('deleted').notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
});

export const postsRelations = relations(posts, ({ one }) => ({
    user: one(profiles, {
        fields: [posts.userId],
        references: [profiles.id],
    })
}));

export type Post = InferSelectModel<typeof posts>;