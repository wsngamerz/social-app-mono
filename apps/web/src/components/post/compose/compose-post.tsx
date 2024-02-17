import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import ComposeForm from "@/components/post/compose/compose-form";

export default function ComposePost() {
    return (
        <div className="flex gap-2">
            <CurrentUserAvatar />
            <ComposeForm />
        </div>
    );
}
