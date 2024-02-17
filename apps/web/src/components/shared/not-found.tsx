import { Separator } from "@ui/components/ui/separator";
import { Button } from "@ui/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl">
                <span className="font-extrabold">404</span> Not Found
            </h1>
            <p>Apologies but the page you are looking for does not exist.</p>
            <Separator />
            <Button variant="link" asChild>
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
}
