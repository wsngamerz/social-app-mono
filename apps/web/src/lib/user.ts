import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";

export async function getUserId() {
    const supabase = createServerComponentClient<Database>({cookies});
    const session = await supabase.auth.getSession();
    const user = session?.data.session?.user;
    return user?.id;
}