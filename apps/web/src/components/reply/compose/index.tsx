import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import {Card, CardContent, CardHeader} from "@ui/components/ui/card";
import ComposeReplyForm from "@/components/reply/compose/compose-reply-form";

export default function ComposeReply() {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Reply</h2>
            </CardHeader>
            <CardContent className="flex gap-2">
                <CurrentUserAvatar/>
                <ComposeReplyForm/>
            </CardContent>
        </Card>
    );
}
