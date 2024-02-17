import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
        cookies: () => cookieStore,
    });

    const result = await supabase.auth.signOut();
    if (result.error) {
        console.error(result.error);
    }

    redirect(`${requestUrl.origin}/login`);
}
