import {Client} from "pg"

const connectionString = process.env["DATABASE_URL"] as string;
const client = new Client({
    connectionString,
});
await client.connect().catch(e => {
    console.error("[DB] Error: ", e);
})

export const runtime = "nodejs";

export async function POST(request: Request) {
    const result = await request.json()
    const {sql, params, method} = result;

    // console.log(`[DB] ${method} ${sql} ${params}`);

    // prevent multiple queries
    const sqlBody = sql.replace(/;/g, '');

    try {
        let result = (await client.query({
            text: sqlBody,
            values: params,
            rowMode: "array"
        })).rows;
        // console.log("[DB] Result:", result);
        return Response.json(result);
    } catch (e: any) {
        console.error("[DB] Error: ", e);
        return Response.json({error: e}, {status: 500});
    }
}