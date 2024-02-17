import Link from "next/link";

export default function Brand() {
    return (
        <Link href="/">
            <div className="text-2xl font-bold bg-zinc-900 px-2 py-1 rounded-lg text-gray-300 dark:bg-zinc-200 dark:text-gray-900">
                S<span className="hidden lg:inline-block">ocialApp</span>
                <span className="text-purple-500">.</span>
            </div>
        </Link>
    );
}
