import {boolean, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {type InferSelectModel, relations} from "drizzle-orm";
import {profiles} from "./profiles";
import {posts} from "./posts";

export const replies = pgTable('replies', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => profiles.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    replyId: uuid('reply_id'),
    text: text('text').notNull(),
    deleted: boolean('deleted').notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
});

export const repliesRelations = relations(replies, ({ one }) => ({
    user: one(profiles, {
        fields: [replies.userId],
        references: [profiles.id],
    }),
    post: one(posts, {
        fields: [replies.postId],
        references: [posts.id],
    }),
    replyTo: one(replies, {
        fields: [replies.replyId],
        references: [replies.id],
    }),
}));

export type Reply = InferSelectModel<typeof replies>;