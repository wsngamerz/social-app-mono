import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import {Card, CardContent} from "@ui/components/ui/card";
import EditForm from "@/components/post/edit/edit-form";

type EditPostProps = {
    id: string;
    text: string;
}

export default function EditPost({id, text}: EditPostProps) {
    return (
        <Card>
            <CardContent className="p-6 flex gap-2">
                <CurrentUserAvatar/>
                <EditForm id={id} text={text}/>
            </CardContent>
        </Card>
    )
}
