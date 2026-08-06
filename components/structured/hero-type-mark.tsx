"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils";

type HeroTypeMarkProps = {
    className?: string;
};

export function HeroTypeMark({ className }: HeroTypeMarkProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            aria-hidden="true"
            initial={
                reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, filter: "blur(8px)" }
            }
            animate={
                reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, filter: "blur(0px)" }
            }
            transition={{
                duration: 0.7,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "pointer-events-none",
                "absolute",
                "right-4 md:right-10",
                "top-1/2",
                "-translate-y-1/2",
                "z-1",
                "select-none",
                "[mask-image:radial-gradient(ellipse_75%_75%_at_65%_50%,black_20%,rgba(0,0,0,0.8)_58%,transparent_88%)]",
                "[-webkit-mask-image:radial-gradient(ellipse_75%_75%_at_65%_50%,black_20%,rgba(0,0,0,0.8)_58%,transparent_88%)]",
                className,
            )}
        >
            <div
                className={cn(
                    "font-serif",
                    "text-[clamp(11rem,25vw,23rem)]",
                    "leading-none",
                    "tracking-[-0.03em]",
                    "text-zinc-950/[0.045]",
                    "dark:text-zinc-50/[0.06]",
                )}
            >
                Aa
            </div>
        </motion.div>
    );
}
