"use client";

import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    useEffect,
    useMemo,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from "react";
import {
    buildDotGlobe,
    computeSafeZoom,
    computeShapeFit,
    generateFlaskScene,
    generateShapeScene,
    generateTestTubeScene,
    projectShapeScene,
    type DotGlobe,
    type ProjectedVertex,
    type ShapeFit,
    type ShapeScene,
} from "@/lib/shapes-3d";
import { cn } from "@/utils";

type Shape3DProps = Readonly<{
    seed: string;
    className?: string;

    label?: string;

    variant?: "auto" | "flask" | "test-tube" | "globe";
}>;

type Rotation = {
    rx: number;
    ry: number;
    rz: number;
};

type Layout = {
    width: number;
    height: number;
    dpr: number;
    fit: ShapeFit;
};

type DragState = {
    pointerId: number;
    startX: number;
    startY: number;
    baseRx: number;
    baseRy: number;
};

const DRAG_SENSITIVITY = 0.01;

const MIN_ZOOM = 0.5;

const MAX_ZOOM = 2;

export function Shape3D({
    seed,
    className,
    label,
    variant = "auto",
}: Shape3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduceMotion = useReducedMotion();
    const { resolvedTheme } = useTheme();

    const scene = useMemo<ShapeScene | null>(() => {
        if (variant === "flask") {
            return generateFlaskScene(seed);
        }

        if (variant === "test-tube") {
            return generateTestTubeScene(seed);
        }

        if (variant === "globe") {
            return null;
        }

        return generateShapeScene(seed);
    }, [seed, variant]);

    const globe = useMemo(
        () =>
            variant === "globe" ? buildDotGlobe(GLOBE_DOT_COUNT, seed) : null,
        [seed, variant],
    );

    const rotationRef = useRef<Rotation>({
        rx: scene?.rx ?? 0,
        ry: scene?.ry ?? 0,
        rz: scene?.rz ?? 0,
    });
    const zoomRef = useRef(1);
    const dragRef = useRef<DragState | null>(null);
    const pointersRef = useRef(new Map<number, { x: number; y: number }>());
    const pinchRef = useRef<{
        startDistance: number;
        startZoom: number;
    } | null>(null);
    const layoutRef = useRef<Layout | null>(null);
    const colorRgbRef = useRef("100,116,139");
    const animTimeRef = useRef(0);
    const dirtyRef = useRef(true);
    const visibleRef = useRef(true);

    useEffect(() => {
        rotationRef.current = {
            rx: scene?.rx ?? 0,
            ry: scene?.ry ?? 0,
            rz: scene?.rz ?? 0,
        };
        zoomRef.current = 1;
        dirtyRef.current = true;
    }, [scene]);

    useEffect(() => {
        const readColor = () => {
            const hex =
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--neutral-500")
                    .trim() || "#64748b";

            colorRgbRef.current = hexToRgb(hex);
        };

        readColor();
    }, [resolvedTheme]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) {
            return;
        }

        const resize = () => {
            const rect = container.getBoundingClientRect();

            if (rect.width === 0 || rect.height === 0) {
                return;
            }

            const dpr = window.devicePixelRatio || 1;
            const width = rect.width;
            const height = rect.height;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const projected = scene
                ? projectShapeScene(scene, scene.rx, scene.ry, scene.rz)
                : [];

            layoutRef.current = {
                width,
                height,
                dpr,
                fit: scene
                    ? computeShapeFit(projected, width, height)
                    : { scale: 1, centerX: 0, centerY: 0 },
            };
            dirtyRef.current = true;
        };

        const observer = new ResizeObserver(resize);
        observer.observe(container);
        resize();

        return () => observer.disconnect();
    }, [scene]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
            dirtyRef.current = true;
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();

            const factor = Math.exp(
                -event.deltaY * (event.ctrlKey ? 0.003 : 0.0012),
            );
            zoomRef.current = clamp(
                zoomRef.current * factor,
                MIN_ZOOM,
                MAX_ZOOM,
            );
            dirtyRef.current = true;
        };

        canvas.addEventListener("wheel", onWheel, { passive: false });

        return () => canvas.removeEventListener("wheel", onWheel);
    }, []);

    useEffect(() => {
        let raf = 0;
        let last = performance.now();

        const loop = (time: number) => {
            raf = requestAnimationFrame(loop);

            const delta = Math.min((time - last) / 1000, 0.1);
            last = time;
            animTimeRef.current += delta;

            const canvas = canvasRef.current;
            const layout = layoutRef.current;

            if (!canvas || !layout) {
                return;
            }

            if (variant === "globe" && globe) {
                dirtyRef.current = true;

                if (visibleRef.current) {
                    drawDotGlobe(
                        canvas,
                        globe,
                        layout,
                        animTimeRef.current,
                        rotationRef.current,
                        zoomRef.current,
                        colorRgbRef.current,
                    );
                }

                return;
            }

            if (!scene) {
                return;
            }

            if (
                !dragRef.current &&
                !pinchRef.current &&
                !reduceMotion &&
                visibleRef.current
            ) {
                const { rx, ry, rz } = scene.spin;
                rotationRef.current.rx += rx * delta;
                rotationRef.current.ry += ry * delta;
                rotationRef.current.rz += rz * delta;
                dirtyRef.current = true;
            }

            if (!dirtyRef.current) {
                return;
            }

            dirtyRef.current = false;

            const projected = projectShapeScene(
                scene,
                rotationRef.current.rx,
                rotationRef.current.ry,
                rotationRef.current.rz,
            );

            zoomRef.current = clamp(
                zoomRef.current,
                MIN_ZOOM,
                Math.max(
                    MIN_ZOOM,
                    Math.min(
                        MAX_ZOOM,
                        computeSafeZoom(
                            projected,
                            layout.width,
                            layout.height,
                            layout.fit,
                        ),
                    ),
                ),
            );

            drawScene(
                canvas,
                scene,
                projected,
                layout,
                zoomRef.current,
                colorRgbRef.current,
            );
        };

        raf = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(raf);
    }, [reduceMotion, scene, globe, variant]);

    const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        pointersRef.current.set(event.pointerId, {
            x: event.clientX,
            y: event.clientY,
        });

        if (pointersRef.current.size === 2) {
            dragRef.current = null;
            const [a, b] = [...pointersRef.current.values()];
            pinchRef.current = {
                startDistance: Math.hypot(a.x - b.x, a.y - b.y),
                startZoom: zoomRef.current,
            };
            return;
        }

        const { rx, ry } = rotationRef.current;
        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            baseRx: rx,
            baseRy: ry,
        };
        dirtyRef.current = true;
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        const tracked = pointersRef.current.get(event.pointerId);

        if (tracked) {
            tracked.x = event.clientX;
            tracked.y = event.clientY;
        }

        if (pinchRef.current && pointersRef.current.size >= 2) {
            const [a, b] = [...pointersRef.current.values()];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            const ratio =
                distance / Math.max(pinchRef.current.startDistance, 1);

            zoomRef.current = clamp(
                pinchRef.current.startZoom * ratio,
                MIN_ZOOM,
                MAX_ZOOM,
            );
            dirtyRef.current = true;
            return;
        }

        const drag = dragRef.current;

        if (!drag || drag.pointerId !== event.pointerId) {
            return;
        }

        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;

        rotationRef.current.rx = drag.baseRx + dy * DRAG_SENSITIVITY;
        rotationRef.current.ry = drag.baseRy + dx * DRAG_SENSITIVITY;
        dirtyRef.current = true;
    };

    const handlePointerEnd = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        const wasPinching = pinchRef.current !== null;
        pointersRef.current.delete(event.pointerId);

        if (pointersRef.current.size < 2) {
            pinchRef.current = null;
        }

        if (dragRef.current?.pointerId === event.pointerId) {
            dragRef.current = null;
        }

        if (wasPinching && pointersRef.current.size === 1) {
            const [pointerId, point] = [...pointersRef.current.entries()][0];
            const { rx, ry } = rotationRef.current;
            dragRef.current = {
                pointerId,
                startX: point.x,
                startY: point.y,
                baseRx: rx,
                baseRy: ry,
            };
            dirtyRef.current = true;
        }
    };

    const handleDoubleClick = () => {
        zoomRef.current = 1;
        rotationRef.current = {
            rx: scene?.rx ?? 0,
            ry: scene?.ry ?? 0,
            rz: scene?.rz ?? 0,
        };
        dirtyRef.current = true;
    };

    return (
        <div
            ref={containerRef}
            role={label ? "img" : undefined}
            aria-label={label}
            className={cn(
                "relative",
                "h-full",
                "w-full",
                "select-none",
                className,
            )}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onDoubleClick={handleDoubleClick}
                className={cn(
                    "absolute",
                    "inset-0",
                    "h-full",
                    "w-full",
                    "touch-none",
                    "cursor-grab",
                    "active:cursor-grabbing",
                )}
            />
        </div>
    );
}

const GLOBE_DOT_COUNT = 512;

const GLOBE_ROTATION_SPEED = 0.45;

function drawDotGlobe(
    canvas: HTMLCanvasElement,
    globe: DotGlobe,
    layout: Layout,
    timeSeconds: number,
    tilt: Rotation,
    zoom: number,
    colorRgb: string,
) {
    const context = canvas.getContext("2d");

    if (!context) {
        return;
    }

    const { width, height, dpr } = layout;
    const centerX = width / 2;
    const centerY = height / 2;
    const globeRadius = Math.min(width, height) * 0.36 * zoom;
    const angle = timeSeconds * GLOBE_ROTATION_SPEED;

    const { rx, ry } = tilt;
    const cosTiltX = Math.cos(rx);
    const sinTiltX = Math.sin(rx);
    const cosTiltY = Math.cos(ry);
    const sinTiltY = Math.sin(ry);

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const { count, latSin, latCos, lon, radii, sizes } = globe;

    for (let index = 0; index < count; index += 1) {
        const currentLon = lon[index] + angle;

        const ux = latCos[index] * Math.sin(currentLon);
        const uy = latSin[index];
        const uz = latCos[index] * Math.cos(currentLon);

        const px = ux * cosTiltY + uz * sinTiltY;
        const pz1 = -ux * sinTiltY + uz * cosTiltY;
        const py = uy * cosTiltX - pz1 * sinTiltX;
        const pz = uy * sinTiltX + pz1 * cosTiltX;

        if (pz <= 0) {
            continue;
        }

        const dotRadius = globeRadius * radii[index];
        const x = px * dotRadius;
        const y = py * dotRadius;

        const brightness = pz ** 1.6;
        const rectSize = 2.4 * sizes[index] * zoom;

        context.fillStyle = `rgba(${colorRgb}, ${(0.1 + 0.9 * brightness).toFixed(3)})`;
        context.fillRect(
            centerX + x - rectSize / 2,
            centerY - y - rectSize / 2,
            rectSize,
            rectSize,
        );
    }
}

function drawScene(
    canvas: HTMLCanvasElement,
    scene: ShapeScene,
    projected: ProjectedVertex[],
    layout: Layout,
    zoom: number,
    colorRgb: string,
) {
    const context = canvas.getContext("2d");

    if (!context) {
        return;
    }

    const { width, height, dpr, fit } = layout;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const toX = (p: ProjectedVertex) =>
        width / 2 + (p.x - fit.centerX) * fit.scale * zoom;
    const toY = (p: ProjectedVertex) =>
        height / 2 + (p.y - fit.centerY) * fit.scale * zoom;

    const { mesh } = scene;

    if (mesh.faces.length > 0) {
        const faces = mesh.faces
            .map((face, index) => {
                const a = projected[face[0]];
                const b = projected[face[1]];
                const c = projected[face[2]];

                const ab = { x: b.wx - a.wx, y: b.wy - a.wy, z: b.wz - a.wz };
                const ac = { x: c.wx - a.wx, y: c.wy - a.wy, z: c.wz - a.wz };
                const nx = ab.y * ac.z - ab.z * ac.y;
                const ny = ab.z * ac.x - ab.x * ac.z;
                const nz = ab.x * ac.y - ab.y * ac.x;
                const len = Math.hypot(nx, ny, nz) || 1;

                const brightness = Math.max(0, nz / len);
                const avgDepth = (a.depth + b.depth + c.depth) / 3;

                return { index, brightness, avgDepth };
            })
            .sort((x, y) => y.avgDepth - x.avgDepth);

        for (const { index, brightness } of faces) {
            const face = mesh.faces[index];

            context.beginPath();
            for (let i = 0; i < face.length; i += 1) {
                const p = projected[face[i]];
                const sx = toX(p);
                const sy = toY(p);

                if (i === 0) {
                    context.moveTo(sx, sy);
                } else {
                    context.lineTo(sx, sy);
                }
            }
            context.closePath();
            context.fillStyle = `rgba(${colorRgb}, ${(0.05 + 0.16 * brightness).toFixed(3)})`;
            context.fill();
        }
    }

    const edges = mesh.edges.map(([ai, bi]) => {
        const a = projected[ai];
        const b = projected[bi];
        return { a, b, avgDepth: (a.depth + b.depth) / 2 };
    });

    let minDepth = Infinity;
    let maxDepth = -Infinity;

    for (const edge of edges) {
        minDepth = Math.min(minDepth, edge.avgDepth);
        maxDepth = Math.max(maxDepth, edge.avgDepth);
    }

    const depthSpan = Math.max(maxDepth - minDepth, 1e-6);
    edges.sort((x, y) => y.avgDepth - x.avgDepth);

    context.lineWidth = 1;
    context.lineCap = "round";
    context.lineJoin = "round";

    for (const { a, b, avgDepth } of edges) {
        const rel = (maxDepth - avgDepth) / depthSpan;
        context.strokeStyle = `rgba(${colorRgb}, ${(0.15 + 0.6 * rel).toFixed(3)})`;
        context.beginPath();
        context.moveTo(toX(a), toY(a));
        context.lineTo(toX(b), toY(b));
        context.stroke();
    }

    if (projected.length <= 60) {
        const midDepth = (minDepth + maxDepth) / 2;
        context.fillStyle = `rgba(${colorRgb}, 0.55)`;

        for (const p of projected) {
            if (p.depth <= midDepth) {
                context.fillRect(toX(p) - 1, toY(p) - 1, 2, 2);
            }
        }
    }
}

function hexToRgb(hex: string): string {
    const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());

    if (!match) {
        return "100,116,139";
    }

    const value = parseInt(match[1], 16);

    return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}
