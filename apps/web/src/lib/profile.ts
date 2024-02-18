import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import type {Profile} from "@repo/drizzle/schema";


export function useProfile() {
    const {data, error, isLoading} = useSWR<Profile>("/api/auth/profile", fetcher);
    return {
        profile: data,
        isLoading,
        isError: error,
    }
}

/**
 * Compute the gravatar hash for the given email.
 * Note that this is a server-side function and should not be called from the client.
 * @see https://docs.gravatar.com/general/hash/
 * @param email
 */
export async function computeEmailHash(email: string) {
    // return createHash('md5')
    //     .update(email.trim().toLowerCase())
    //     .digest('hex');
    const encoder = new TextEncoder();
    const data = encoder.encode(email.trim().toLowerCase());
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}