"use client";

import { useTheme } from "next-themes";
import type { MouseEventHandler } from "react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils";

type ActiveCell = {
    column: number;
    row: number;
    activatedAt: number;
};

type InteractiveGridProps = Readonly<{
    className?: string;
}>;

const GRID_SIZE = 56;
const CELL_OPACITY = 0.28;
const HOLD_DURATION = 350;
const FADE_DURATION = 700;

export function InteractiveGrid({ className }: InteractiveGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeCellsRef = useRef(new Map<string, ActiveCell>());
    const animationFrameRef = useRef<number | null>(null);
    const themeRef = useRef<string>("light");

    const { resolvedTheme } = useTheme();

    useEffect(() => {
        themeRef.current = resolvedTheme ?? "light";
    }, [resolvedTheme]);

    const renderCells = useCallback(() => {
        const grid = gridRef.current;
        const canvas = canvasRef.current;

        if (!grid || !canvas) {
            animationFrameRef.current = null;
            return;
        }

        const rect = grid.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;
        const width = rect.width;
        const height = rect.height;
        canvas.width = Math.round(width * devicePixelRatio);
        canvas.height = Math.round(height * devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const context = canvas.getContext("2d");

        if (!context) {
            animationFrameRef.current = null;
            return;
        }

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        const now = performance.now();

        for (const [cellId, cell] of activeCellsRef.current.entries()) {
            const elapsed = now - cell.activatedAt;
            const fadeProgress = (elapsed - HOLD_DURATION) / FADE_DURATION;

            if (fadeProgress >= 1) {
                activeCellsRef.current.delete(cellId);
                continue;
            }

            const opacity =
                fadeProgress <= 0
                    ? CELL_OPACITY
                    : CELL_OPACITY * (1 - fadeProgress);

            const x = cell.column * GRID_SIZE + 1;
            const y = cell.row * GRID_SIZE + 1;
            const isDark = themeRef.current === "dark";
            const cellColor = isDark ? "228, 228, 231" : "24, 24, 27";
            context.fillStyle = `rgba(${cellColor}, ${opacity})`;
            context.fillRect(x, y, GRID_SIZE - 1, GRID_SIZE - 1);
        }

        if (activeCellsRef.current.size > 0) {
            // eslint-disable-next-line react-hooks/immutability
            animationFrameRef.current = requestAnimationFrame(renderCells);
            return;
        }

        animationFrameRef.current = null;
    }, []);

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            const grid = gridRef.current;

            if (!grid) {
                return;
            }

            const rect = grid.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const column = Math.floor(mouseX / GRID_SIZE);
            const row = Math.floor(mouseY / GRID_SIZE);
            const cellId = `${column}:${row}`;

            if (!activeCellsRef.current.has(cellId)) {
                activeCellsRef.current.set(cellId, {
                    column,
                    row,
                    activatedAt: performance.now(),
                });
            }

            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(renderCells);
            }
        },
        [renderCells],
    );

    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={gridRef}
            aria-hidden="true"
            onMouseMove={handleMouseMove}
            className={cn(
                "pointer-events-auto",
                "absolute",
                "top-1/2",
                "right-[-1rem]",
                "z-0",
                "h-[420px]",
                "w-[min(57vw,760px)]",
                "-translate-y-1/2",
                "overflow-hidden",
                "bg-[linear-gradient(to_right,rgba(30,41,59,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.05)_1px,transparent_1px)]",
                "dark:bg-[linear-gradient(to_right,rgba(228,228,231,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.07)_1px,transparent_1px)]",
                "bg-[size:56px_56px]",
                "[mask-image:radial-gradient(ellipse_72%_68%_at_50%_50%,black_0%,black_40%,rgba(0,0,0,0.8)_58%,transparent_78%)]",
                "[-webkit-mask-image:radial-gradient(ellipse_72%_68%_at_50%_50%,black_0%,black_40%,rgba(0,0,0,0.8)_58%,transparent_78%)]",
                className,
            )}
        >
            <canvas
                ref={canvasRef}
                className={cn("pointer-events-none", "absolute", "inset-0")}
            />
        </div>
    );
}
