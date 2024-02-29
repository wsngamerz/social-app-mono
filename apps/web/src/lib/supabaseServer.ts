import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";

export default () => {
    cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
    return createServerComponentClient<Database>({cookies});
};