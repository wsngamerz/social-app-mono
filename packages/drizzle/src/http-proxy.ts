import {RemoteCallback} from "drizzle-orm/pg-proxy";

export const httpDriver: RemoteCallback = async (sql, params, method) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
        const url = `http${!baseUrl?.startsWith("localhost") ? "s" : ""}://${baseUrl}/api/data`
        const body = JSON.stringify({sql, params, method});

        // console.log(`[DB proxy] ${url} - ${body}`)
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        }).then(res => res.json());
        const result = {rows: data};

        console.log(`[DB proxy] Response:`, result);
        return result;
    } catch (e: any) {
        console.error('[DB proxy] Error:', e)
        return {rows: []};
    }
}