"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { SITE_THEMES } from "@/providers/theme-provider";
import { cn } from "@/utils";

type ThemeModalProps = Readonly<{
    open: boolean;
    onClose: () => void;
}>;

const emptySubscribe = () => () => {};
const getBodySnapshot = () =>
    Boolean(typeof document !== "undefined" && document.body);

export function ThemeModal({ open, onClose }: ThemeModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        emptySubscribe,
        getBodySnapshot,
        () => false,
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
                document.getElementById("theme-toggle")?.focus();
            }
        };

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (
                modalRef.current?.contains(target) ||
                document.getElementById("theme-toggle")?.contains(target)
            ) {
                return;
            }

            onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open, onClose]);

    if (!open || !mounted) {
        return null;
    }

    const swatches: Record<
        string,
        { bg: string; surface: string; accent: string }
    > = {
        "clean-light": {
            bg: "#F8FAFC",
            surface: "#FFFFFF",
            accent: "#F38020",
        },
        charcoal: {
            bg: "#181A1B",
            surface: "#222527",
            accent: "#F38020",
        },
        kindle: {
            bg: "#EAEAEA",
            surface: "#F4F4F4",
            accent: "#D45100",
        },
        reader: {
            bg: "#121214",
            surface: "#1E1E22",
            accent: "#FA8C16",
        },
    };

    const labels: Record<string, string> = {
        "clean-light": "Clean Light",
        charcoal: "Soft Twilight Charcoal",
        kindle: "Kindle Paperwhite",
        reader: "Reader Charcoal",
    };

    return createPortal(
        <div
            className={cn(
                "fixed",
                "inset-0",
                "z-[60]",
                "flex",
                "items-center",
                "justify-center",
                "p-4",
            )}
        >
            {}
            <div
                aria-hidden="true"
                className={cn(
                    "absolute",
                    "inset-0",
                    "bg-background/70",
                    "backdrop-blur-sm",
                )}
            />

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Theme options"
                className={cn(
                    "relative",
                    "w-full",
                    "max-w-md",
                    "rounded-lg",
                    "border",
                    "border-smooth-border",
                    "bg-surface",
                    "p-5",
                    "shadow-xl",
                )}
            >
                <div
                    className={cn(
                        "mb-4",
                        "flex",
                        "items-center",
                        "justify-between",
                    )}
                >
                    <h2
                        className={cn(
                            "text-base",
                            "font-semibold",
                            "text-zinc-950",
                            "dark:text-zinc-50",
                        )}
                    >
                        Theme
                    </h2>

                    <button
                        type="button"
                        aria-label="Close theme options"
                        onClick={onClose}
                        className={cn(
                            "cursor-pointer",
                            "rounded-md",
                            "p-1.5",
                            "text-neutral-500",
                            "transition-colors",
                            "duration-100",
                            "hover:text-journal-accent-text",
                            "motion-reduce:transition-none",
                            "focus-visible:outline-2",
                            "focus-visible:outline-offset-2",
                            "focus-visible:outline-journal-accent",
                        )}
                    >
                        <X aria-hidden="true" className={cn("size-4")} />
                    </button>
                </div>

                <div className={cn("space-y-2")}>
                    {SITE_THEMES.map((siteTheme) => {
                        const isActive = theme === siteTheme;
                        const swatch = swatches[siteTheme];

                        return (
                            <button
                                key={siteTheme}
                                type="button"
                                onClick={() => setTheme(siteTheme)}
                                aria-pressed={isActive}
                                className={cn(
                                    "flex",
                                    "w-full",
                                    "cursor-pointer",
                                    "items-center",
                                    "gap-4",
                                    "rounded-md",
                                    "border",
                                    "p-3",
                                    "text-left",
                                    "transition-colors",
                                    "duration-100",
                                    "motion-reduce:transition-none",
                                    "border-smooth-border",
                                    "hover:border-journal-accent/60",
                                    "focus-visible:outline-2",
                                    "focus-visible:outline-offset-2",
                                    "focus-visible:outline-journal-accent",
                                    isActive && "border-journal-accent",
                                    isActive && "bg-journal-accent/10",
                                )}
                            >
                                {}
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "flex",
                                        "shrink-0",
                                        "items-center",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "size-5",
                                            "rounded-full",
                                            "border-2",
                                            "border-surface",
                                        )}
                                        style={{ backgroundColor: swatch.bg }}
                                    />
                                    <span
                                        className={cn(
                                            "-ml-2",
                                            "size-5",
                                            "rounded-full",
                                            "border-2",
                                            "border-surface",
                                        )}
                                        style={{
                                            backgroundColor: swatch.surface,
                                        }}
                                    />
                                    <span
                                        className={cn(
                                            "-ml-2",
                                            "size-5",
                                            "rounded-full",
                                            "border-2",
                                            "border-surface",
                                        )}
                                        style={{
                                            backgroundColor: swatch.accent,
                                        }}
                                    />
                                </span>

                                <span
                                    className={cn(
                                        "flex-1",
                                        "text-sm",
                                        "font-medium",
                                        "text-zinc-950",
                                        "dark:text-zinc-50",
                                    )}
                                >
                                    {labels[siteTheme]}
                                </span>

                                {isActive && (
                                    <Check
                                        aria-hidden="true"
                                        className={cn(
                                            "size-4",
                                            "shrink-0",
                                            "text-journal-accent-text",
                                        )}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body,
    );
}
