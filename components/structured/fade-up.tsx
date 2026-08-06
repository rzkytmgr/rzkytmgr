"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/utils";

type FadeUpProps = Readonly<{
    children: ReactNode;
    className?: string;

    delay?: number;

    duration?: number;
}>;

export function FadeUp({
    children,
    className,
    delay = 0,
    duration = 0.7,
}: FadeUpProps) {
    const reduceMotion = useReducedMotion();
    const [settled, setSettled] = useState(false);

    const hidden = reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 24, filter: "blur(8px)" };
    const visible = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0, filter: "blur(0px)" };

    return (
        <motion.div
            initial={hidden}
            animate={visible}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => setSettled(true)}

            style={settled ? { filter: "none", transform: "none" } : undefined}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
