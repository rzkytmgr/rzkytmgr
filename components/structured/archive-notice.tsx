import { TriangleAlert } from "lucide-react";
import { cn } from "@/utils";

type ArchiveNoticeProps = Readonly<{
    message: string;
    className?: string;
}>;

export function ArchiveNotice({ message, className }: ArchiveNoticeProps) {
    return (
        <div
            role="alert"
            className={cn(
                "flex",
                "items-start",
                "gap-3",
                "rounded-md",
                "border",
                "border-yellow-700/40",
                "bg-orange-50",
                "px-4",
                "py-3",
                "dark:border-yellow-500/40",
                "dark:bg-yellow-500/10",
                className,
            )}
        >
            <TriangleAlert
                aria-hidden="true"
                className={cn(
                    "mt-0.5",
                    "size-4",
                    "flex-none",
                    "text-yellow-700",
                    "dark:text-yellow-400",
                )}
            />
            <p
                className={cn(
                    "text-sm",
                    "leading-relaxed",
                    "text-yellow-800",
                    "dark:text-yellow-200",
                )}
            >
                {message}
            </p>
        </div>
    );
}
