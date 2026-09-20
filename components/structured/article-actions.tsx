"use client";

import { Bookmark, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

const GISCUS_ORIGIN = "https://giscus.app";

type ArticleActionsProps = Readonly<{
    className?: string;
}>;

const actionIconClass = cn(
    "size-4",
    "transition-transform",
    "duration-300",
    "group-hover:rotate-12",
    "motion-reduce:transition-none",
    "motion-reduce:transform-none",
);

const actionButtonClass = cn(
    "group",
    "inline-flex",
    "size-8",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "rounded-md",
    "p-2",
    "text-neutral-500",
    "transition-colors",
    "duration-100",
    "hover:text-journal-accent-text",
    "motion-reduce:transition-none",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-journal-accent",
);

const commentButtonClass = cn(
    "group",
    "inline-flex",
    "h-8",
    "cursor-pointer",
    "items-center",
    "gap-1.5",
    "rounded-md",
    "px-2",
    "text-neutral-500",
    "transition-colors",
    "duration-100",
    "hover:text-journal-accent-text",
    "motion-reduce:transition-none",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-journal-accent",
);

export function ArticleActions({ className }: ArticleActionsProps) {
    const [commentCount, setCommentCount] = useState<number | null>(null);

    const scrollToComments = () => {
        const comments = document.getElementById("comments");

        if (!comments) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        comments.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== GISCUS_ORIGIN) {
                return;
            }

            const data = event.data as {
                giscus?: {
                    discussion?: { totalCommentCount?: number };
                    error?: string;
                };
            };

            if (data?.giscus?.discussion) {
                setCommentCount(data.giscus.discussion.totalCommentCount ?? 0);
            } else if (
                typeof data?.giscus?.error === "string" &&
                data.giscus.error.includes("Discussion not found")
            ) {
                setCommentCount(0);
            }
        };

        window.addEventListener("message", onMessage);

        return () => window.removeEventListener("message", onMessage);
    }, []);

    return (
        <div
            className={cn(
                "flex",
                "items-center",
                "justify-between",
                "border-y",
                "border-smooth-border",
                "py-2",
                className,
            )}
        >
            <div className={cn("flex", "items-center", "gap-1")}>
                <button
                    type="button"
                    aria-label="Like article"
                    title="Like article"
                    className={actionButtonClass}
                >
                    <ThumbsUp aria-hidden="true" className={actionIconClass} />
                </button>

                <button
                    type="button"
                    aria-label="Jump to comments"
                    title="Jump to comments"
                    onClick={scrollToComments}
                    className={commentButtonClass}
                >
                    <MessageCircle
                        aria-hidden="true"
                        className={actionIconClass}
                    />
                    {commentCount !== null && (
                        <span className={cn("font-mono", "text-xs")}>
                            {commentCount}
                        </span>
                    )}
                </button>
            </div>

            <div className={cn("flex", "items-center", "gap-1")}>
                <button
                    type="button"
                    aria-label="Save article"
                    title="Save article"
                    className={actionButtonClass}
                >
                    <Bookmark aria-hidden="true" className={actionIconClass} />
                </button>

                <button
                    type="button"
                    aria-label="Share article"
                    title="Share article"
                    className={actionButtonClass}
                >
                    <Share aria-hidden="true" className={actionIconClass} />
                </button>
            </div>
        </div>
    );
}
