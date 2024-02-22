import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import ComposeForm from "@/components/post/compose/compose-form";
import Link from "next/link";

export default function ComposePost() {
    const tenorApiKey = process.env.TENOR_API_KEY;
    if (!tenorApiKey) {
        throw new Error("TENOR_API_KEY is not set");
    }

    return (
        <div className="flex gap-2">
            <Link href="/profile">
                <CurrentUserAvatar />
            </Link>
            <ComposeForm tenorApiKey={tenorApiKey} />
        </div>
    );
}
