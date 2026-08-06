"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

type MarkdownProps = Readonly<{
    html: string;
    className?: string;
}>;

const COPIED_RESET_DELAY = 1600;

export function Markdown({ html, className }: MarkdownProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return;
        }

        const pendingTimers = new WeakMap<HTMLButtonElement, number>();

        const fallbackCopy = (text: string): boolean => {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();

            let ok = false;

            try {
                ok = document.execCommand("copy");
            } catch {
                ok = false;
            }

            textarea.remove();
            return ok;
        };

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const button = target?.closest(
                "[data-code-block-copy]",
            ) as HTMLButtonElement | null;

            if (!button) {
                return;
            }

            const figure = button.closest(
                "figure[data-rehype-pretty-code-figure]",
            );
            const code = figure?.querySelector("pre code");
            const text = code?.textContent ?? "";

            if (!text) {
                return;
            }

            const showCopied = () => {
                const previous = pendingTimers.get(button);

                if (previous !== undefined) {
                    window.clearTimeout(previous);
                }

                button.dataset.copied = "true";
                button.setAttribute("aria-label", "Copied");
                button.setAttribute("title", "Copied");

                const timer = window.setTimeout(() => {
                    pendingTimers.delete(button);
                    delete button.dataset.copied;
                    button.setAttribute("aria-label", "Copy code");
                    button.setAttribute("title", "Copy code");
                }, COPIED_RESET_DELAY);

                pendingTimers.set(button, timer);
            };

            if (navigator.clipboard?.writeText) {
                navigator.clipboard
                    .writeText(text)
                    .then(showCopied)
                    .catch(() => {
                        if (fallbackCopy(text)) {
                            showCopied();
                        }
                    });
            } else if (fallbackCopy(text)) {
                showCopied();
            }
        };

        root.addEventListener("click", handleClick);

        return () => root.removeEventListener("click", handleClick);
    }, []);

    return (
        <div
            ref={rootRef}
            className={cn("markdown-body", "text-base", className)}

            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
