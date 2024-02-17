import { Card, CardContent } from "@ui/components/ui/card";
import ComposePost from "@/components/post/compose/compose-post";

export default function ComposeCard() {
    return (
        <Card>
            <CardContent className="p-6">
                <ComposePost />
            </CardContent>
        </Card>
    );
}
