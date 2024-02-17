import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import type {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {db} from "@repo/drizzle";

export async function GET(request: Request) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({cookies: () => cookieStore})

    const userSession = await supabase.auth.getSession()
    const userId = userSession?.data?.session?.user.id;
    if (!userSession || !userId) {
        return Response.json({error: "Unauthorized"}, {status: 401})
    }

    const userProfile = await db.query.profiles.findFirst({
        where: (profiles, {eq}) => eq(profiles.id, userId)
    })
    if (!userProfile) {
        return Response.json({error: "User not found"}, {status: 404})
    }

    return Response.json(userProfile, {status: 200})
}