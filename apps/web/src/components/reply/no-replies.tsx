import { Card, CardContent } from "@repo/ui/components/ui/card";
import { GiTumbleweed } from "react-icons/gi";

export default function NoReplies() {
    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4">
                <div className="animate-bounce pt-4">
                    <GiTumbleweed className="text-6xl text-gray-500 animate-[spin_2.5s_linear_infinite]" />
                </div>
                <p className="text-gray-500">
                    Oh no! This post has no replies yet. Why not be the first to
                    say something?
                </p>
            </CardContent>
        </Card>
    );
}
