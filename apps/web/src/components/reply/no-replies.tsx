import {Card, CardContent} from "@repo/ui/components/ui/card";
import Tumbleweed from "@/components/shared/tumbleweed";

export default function NoReplies() {
    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4">
                <Tumbleweed/>
                <p className="text-gray-500">
                    Oh no! This post has no replies yet. Why not be the first to
                    say something?
                </p>
            </CardContent>
        </Card>
    );
}
