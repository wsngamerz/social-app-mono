import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import ComposeForm from "@/components/post/compose/compose-form";
import Link from "next/link";

export default function ComposePost() {
    return (
        <div className="flex gap-2">
            <Link href="/profile">
                <CurrentUserAvatar />
            </Link>
            <ComposeForm />
        </div>
    );
}
