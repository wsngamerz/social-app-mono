
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/schema/index.ts",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    out: "./migrations",
};