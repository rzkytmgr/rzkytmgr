"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

type ReadingProgressProps = Readonly<{
    className?: string;
}>;

export function ReadingProgress({ className }: ReadingProgressProps) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame: number | null = null;

        const update = () => {
            frame = null;

            const bar = barRef.current;

            if (!bar) {
                return;
            }

            const root = document.documentElement;
            const scrollable = root.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

            bar.style.transform = `scaleX(${progress})`;
        };

        const onScroll = () => {
            if (frame === null) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);

            if (frame !== null) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className={cn(
                "fixed",
                "inset-x-0",
                "top-0",
                "z-[60]",
                "h-0.5",
                "pointer-events-none",
                className,
            )}
        >
            <div
                ref={barRef}
                className={cn(
                    "h-full",
                    "w-full",
                    "origin-left",
                    "bg-journal-accent",
                    "transform-gpu",
                )}
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
}
