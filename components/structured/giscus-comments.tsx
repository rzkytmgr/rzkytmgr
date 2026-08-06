"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/utils";

type GiscusCommentsProps = Readonly<{
    config?: {
        repo: string;
        repoId: string;
        category: string;
        categoryId: string;
        mapping?: string;
        reactionsEnabled?: boolean;
        inputPosition?: "top" | "bottom";
        lang?: string;
    };
    className?: string;
}>;

const GISCUS_SCRIPT_SRC = "https://giscus.app/client.js";
const GISCUS_ORIGIN = "https://giscus.app";

export function GiscusComments({ config, className }: GiscusCommentsProps) {
    const { resolvedTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    const [commentCount, setCommentCount] = useState<number | null>(null);
    const themeRef = useRef<"light" | "dark">(
        resolvedTheme === "dark" ? "dark" : "light",
    );

    const enabled =
        Boolean(config?.repo) &&
        Boolean(config?.repoId) &&
        Boolean(config?.category) &&
        Boolean(config?.categoryId);

    const pushTheme = useCallback(() => {
        const frame = document.querySelector<HTMLIFrameElement>(
            "iframe.giscus-frame",
        );

        frame?.contentWindow?.postMessage(
            { giscus: { setConfig: { theme: themeRef.current } } },
            GISCUS_ORIGIN,
        );
    }, []);

    useEffect(() => {
        const theme = resolvedTheme === "dark" ? "dark" : "light";
        themeRef.current = theme;

        const script = document.querySelector<HTMLScriptElement>(
            'script[data-giscus-script="true"]',
        );

        if (script) {
            script.dataset.theme = theme;
        }

        pushTheme();
    }, [resolvedTheme, pushTheme]);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== GISCUS_ORIGIN) {
                return;
            }

            const data = event.data as {
                giscus?: {
                    loaded?: boolean;
                    error?: string;
                    discussion?: { totalCommentCount?: number };
                };
            };

            if (data?.giscus?.loaded === true) {
                pushTheme();
            }

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
    }, [pushTheme]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        document
            .querySelectorAll('script[data-giscus-script="true"]')
            .forEach((node) => node.remove());
        container.replaceChildren();

        setCommentCount(null);

        const script = document.createElement("script");
        script.async = true;
        script.src = GISCUS_SCRIPT_SRC;
        script.crossOrigin = "anonymous";
        script.dataset.giscusScript = "true";
        script.dataset.repo = config?.repo ?? "";
        script.dataset.repoId = config?.repoId ?? "";
        script.dataset.category = config?.category ?? "";
        script.dataset.categoryId = config?.categoryId ?? "";
        script.dataset.mapping = config?.mapping ?? "pathname";
        script.dataset.strict = "0";
        script.dataset.reactionsEnabled = config?.reactionsEnabled ? "1" : "0";
        script.dataset.emitMetadata = "1";
        script.dataset.inputPosition = config?.inputPosition ?? "bottom";
        script.dataset.theme = themeRef.current;
        script.dataset.lang = config?.lang ?? "en";
        script.dataset.loading = "lazy";

        document.body.appendChild(script);

        return () => script.remove();
    }, [
        enabled,
        config?.repo,
        config?.repoId,
        config?.category,
        config?.categoryId,
        config?.mapping,
        config?.reactionsEnabled,
        config?.inputPosition,
        config?.lang,
    ]);

    if (!enabled) {
        return null;
    }

    return (
        <section
            aria-label="Comments"
            className={cn(
                "mt-16",
                "w-full",
                "border-t",
                "border-smooth-border/70",
                "pt-8",
                className,
            )}
        >
            <div
                className={cn(
                    "mb-5",
                    "flex",
                    "items-baseline",
                    "justify-between",
                    "gap-4",
                )}
            >
                <Typography
                    as="h2"
                    size="xs"
                    className={cn(
                        "font-mono",
                        "uppercase",
                        "tracking-wider",
                        "text-neutral-500",
                    )}
                >
                    Comments
                </Typography>

                {commentCount !== null && (
                    <Typography
                        as="span"
                        size="xs"
                        aria-live="polite"
                        className={cn(
                            "font-mono",
                            "text-neutral-400",
                            "dark:text-neutral-500",
                        )}
                    >
                        {commentCount}{" "}
                        {commentCount === 1 ? "comment" : "comments"}
                    </Typography>
                )}
            </div>

            <div ref={containerRef} className="giscus" />
        </section>
    );
}
