import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Typography } from "../ui/typography";
import { FadeUp } from "./fade-up";
import { cn } from "@/utils";

export function NotFoundContent() {
    return (
        <div
            className={cn(
                "relative",
                "flex",
                "min-h-[60vh]",
                "flex-col",
                "items-center",
                "justify-center",
                "px-5",
                "py-20",
                "text-center",
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none",
                    "absolute",
                    "inset-x-0",
                    "top-1/2",
                    "-translate-y-1/2",
                    "select-none",
                    "font-serif",
                    "text-[clamp(8rem,24vw,18rem)]",
                    "leading-none",
                    "tracking-[-0.03em]",
                    "text-zinc-950/[0.045]",
                    "dark:text-zinc-50/[0.06]",
                )}
            >
                404
            </div>

            <FadeUp className={cn("relative", "z-10")}>
                <div className={cn("space-y-5")}>
                    <Typography
                        as="p"
                        size="xs"
                        className={cn(
                            "font-mono",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        Error 404
                    </Typography>

                    <Typography
                        as="h1"
                        weight="bold"
                        className={cn(
                            "text-4xl",
                            "tracking-tight",
                            "text-zinc-950",
                            "md:text-5xl",
                            "dark:text-zinc-50",
                        )}
                    >
                        This page could not be found
                    </Typography>

                    <Typography
                        as="p"
                        className={cn(
                            "mx-auto",
                            "max-w-md",
                            "text-zinc-600",
                            "dark:text-zinc-400",
                        )}
                    >
                        The page you are looking for might have been moved,
                        renamed, or does not exist.
                    </Typography>

                    <div className={cn("pt-2")}>
                        <Link
                            href="/"
                            className={cn(
                                "group",
                                "inline-flex",
                                "items-center",
                                "gap-2",
                                "border-b",
                                "border-dashed",
                                "border-zinc-700",
                                "py-1",
                                "text-sm",
                                "font-medium",
                                "text-zinc-700",
                                "transition-colors",
                                "hover:text-journal-accent-text",
                                "dark:border-zinc-300",
                                "dark:text-zinc-300",
                            )}
                        >
                            Back to home
                            <MoveRight
                                aria-hidden="true"
                                className={cn(
                                    "size-3",
                                    "transition-transform",
                                    "group-hover:translate-x-1",
                                )}
                            />
                        </Link>
                    </div>
                </div>
            </FadeUp>
        </div>
    );
}
