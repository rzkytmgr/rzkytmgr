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
                "sticky",
                "top-16",
                "z-40",
                "w-full",
                "border-b",
                "border-warning-border",
                "bg-warning-bg",
                className,
            )}
        >
            <div
                className={cn(
                    "mx-auto",
                    "flex",
                    "w-full",
                    "max-w-6xl",
                    "items-center",
                    "justify-center",
                    "gap-2",
                    "px-5",
                    "py-2",
                    "sm:px-6",
                )}
            >
                <TriangleAlert
                    aria-hidden="true"
                    className={cn("size-3.5", "flex-none", "text-warning")}
                />
                <p
                    className={cn(
                        "text-center",
                        "text-xs",
                        "leading-snug",
                        "text-warning-text",
                    )}
                >
                    {message}
                </p>
            </div>
        </div>
    );
}
