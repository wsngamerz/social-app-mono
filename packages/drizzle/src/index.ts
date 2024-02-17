import * as schema from "./schema";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// This is a hack to make sure we only create one connection (and reuse the existing)
// to the database when running in development mode
declare global {
    var db: PostgresJsDatabase<typeof schema> | undefined;
}

const connectionString = process.env["DATABASE_URL"] as string;
let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
    db = drizzle(postgres(connectionString), { schema });
} else {
    if (!global.db) global.db = drizzle(postgres(connectionString), { schema });
    db = global.db;
}

export { db };