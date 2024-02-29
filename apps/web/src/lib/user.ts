import supabaseServer from "@/lib/supabaseServer";

export async function getUserId() {
    const supabase = supabaseServer();
    const session = await supabase.auth.getSession();
    const user = session?.data.session?.user;
    return user?.id;
}