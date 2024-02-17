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