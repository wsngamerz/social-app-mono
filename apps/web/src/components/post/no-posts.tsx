import {Card, CardContent} from "@repo/ui/components/ui/card";
import Tumbleweed from "@/components/shared/tumbleweed";

export default function NoPosts() {
    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4">
                <Tumbleweed/>
                <p className="text-gray-500">
                    Oh no! It looks a little quiet around here. Why not create a
                    post?
                </p>
            </CardContent>
        </Card>
    );
}
