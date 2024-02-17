import {cn} from "@ui/lib/utils";

export default function Steps({progress}: { progress: number }) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="my-4 flex gap-4">
                <Step step={1} title="Username" complete={progress >= 1}/>
                <Step step={2} title="Details" complete={progress >= 2}/>
                <Step step={3} title="Follow" complete={progress >= 3}/>
            </ol>
        </nav>
    );
}


function Step({step, title, complete}: { step: number, title: string, complete: boolean }) {
    return (
        <li className="flex-1">
            <div
                className={cn("group flex flex-col py-2 border-t-4",
                    complete ? "border-indigo-600 hover:border-indigo-800" : "border-gray-200 hover:border-gray-300")}>
                <span className={cn("text-sm font-medium", complete && "text-indigo-600 group-hover:text-indigo-800")}>
                    Step {step}
                </span>
                <span className="text-sm">{title}</span>
            </div>
        </li>
    );
}