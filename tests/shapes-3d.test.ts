import { describe, expect, it } from "vitest";
import {
    computeSafeZoom,
    computeShapeFit,
    generateFlaskScene,
    generateShapeScene,
    projectShapeScene,
} from "@/lib/shapes-3d";

describe("generateShapeScene", () => {
    it("is deterministic for the same seed", () => {
        expect(generateShapeScene("devnotes-knowledge-base")).toEqual(
            generateShapeScene("devnotes-knowledge-base"),
        );
    });

    it("produces different scenes for different seeds", () => {
        const a = generateShapeScene("devnotes-knowledge-base");
        const b = generateShapeScene("personal-portfolio-v2");

        expect(a.mesh.vertices).not.toEqual(b.mesh.vertices);
    });

    it("yields a valid mesh with in-range topology indices", () => {
        const scene = generateShapeScene("taskflow");
        const count = scene.mesh.vertices.length;

        expect(count).toBeGreaterThan(4);

        for (const [a, b] of scene.mesh.edges) {
            expect(a).toBeGreaterThanOrEqual(0);
            expect(a).toBeLessThan(count);
            expect(b).toBeGreaterThanOrEqual(0);
            expect(b).toBeLessThan(count);
        }

        for (const face of scene.mesh.faces) {
            for (const vertex of face) {
                expect(vertex).toBeGreaterThanOrEqual(0);
                expect(vertex).toBeLessThan(count);
            }
        }

        expect(
            scene.mesh.vertices.every((v) =>
                [v.x, v.y, v.z].every(Number.isFinite),
            ),
        ).toBe(true);
    });

    it("assigns a finite idle spin with at least one rotating axis", () => {
        for (const seed of [
            "devnotes-knowledge-base",
            "personal-portfolio-v2",
            "taskflow-project-management-dashboard",
            "fintrack-expense-tracker",
            "building-scalable-rest-api-with-nestjs",
        ]) {
            const { spin } = generateShapeScene(seed);

            expect([spin.rx, spin.ry, spin.rz].every(Number.isFinite)).toBe(
                true,
            );
            expect(
                Math.abs(spin.rx) + Math.abs(spin.ry) + Math.abs(spin.rz),
            ).toBeGreaterThan(0);
        }
    });
});

describe("generateFlaskScene", () => {
    it("is deterministic for the same seed", () => {
        expect(
            generateFlaskScene("building-scalable-rest-api-with-nestjs"),
        ).toEqual(generateFlaskScene("building-scalable-rest-api-with-nestjs"));
    });

    it("yields a valid flask mesh with in-range topology indices", () => {
        const scene = generateFlaskScene(
            "building-scalable-rest-api-with-nestjs",
        );
        const count = scene.mesh.vertices.length;

        expect(scene.mesh.faces.length).toBeGreaterThan(0);
        expect(count).toBeGreaterThan(4);

        for (const [a, b] of scene.mesh.edges) {
            expect(a).toBeGreaterThanOrEqual(0);
            expect(a).toBeLessThan(count);
            expect(b).toBeGreaterThanOrEqual(0);
            expect(b).toBeLessThan(count);
        }

        for (const face of scene.mesh.faces) {
            for (const vertex of face) {
                expect(vertex).toBeGreaterThanOrEqual(0);
                expect(vertex).toBeLessThan(count);
            }
        }

        expect(
            scene.mesh.vertices.every((v) =>
                [v.x, v.y, v.z].every(Number.isFinite),
            ),
        ).toBe(true);

        expect(scene.spin).toEqual({ rx: 0, ry: expect.any(Number), rz: 0 });
    });
});

describe("projectShapeScene", () => {
    it("projects every shape to finite screen coordinates", () => {
        for (const seed of [
            "cube",
            "octahedron",
            "icosahedron",
            "sphere",
            "torus",
            "helix",
            "assembly",
        ]) {
            const scene = generateShapeScene(seed);
            const projected = projectShapeScene(
                scene,
                scene.rx + 0.3,
                scene.ry,
                scene.rz,
            );

            expect(projected.length).toBe(scene.mesh.vertices.length);
            expect(
                projected.every(
                    (p) => Number.isFinite(p.x) && Number.isFinite(p.y),
                ),
            ).toBe(true);
        }
    });
});

describe("computeShapeFit", () => {
    it("fits the projected shape inside the viewport", () => {
        const scene = generateShapeScene("taskflow");
        const projected = projectShapeScene(
            scene,
            scene.rx,
            scene.ry,
            scene.rz,
        );
        const fit = computeShapeFit(projected, 600, 338);

        const maxX = Math.max(
            ...projected.map((p) => Math.abs(p.x - fit.centerX) * fit.scale),
        );
        const maxY = Math.max(
            ...projected.map((p) => Math.abs(p.y - fit.centerY) * fit.scale),
        );

        expect(maxX * 2).toBeLessThanOrEqual(600 * 0.7 + 1e-6);
        expect(maxY * 2).toBeLessThanOrEqual(338 * 0.7 + 1e-6);
        expect(fit.scale).toBeGreaterThan(0);
    });
});

describe("computeSafeZoom", () => {
    it("allows zooming in beyond the base fit without clipping", () => {
        const scene = generateShapeScene("devnotes-knowledge-base");
        const projected = projectShapeScene(
            scene,
            scene.rx,
            scene.ry,
            scene.rz,
        );
        const fit = computeShapeFit(projected, 760, 420);

        const safeZoom = computeSafeZoom(projected, 760, 420, fit);

        expect(safeZoom).toBeGreaterThan(1);
        expect(Number.isFinite(safeZoom)).toBe(true);
    });

    it("keeps the shape inside the viewport at the safe zoom", () => {
        const scene = generateShapeScene("torus");
        const projected = projectShapeScene(
            scene,
            scene.rx,
            scene.ry,
            scene.rz,
        );
        const fit = computeShapeFit(projected, 600, 338);
        const safeZoom = computeSafeZoom(projected, 600, 338, fit);

        const maxX = Math.max(
            ...projected.map(
                (p) => Math.abs(p.x - fit.centerX) * fit.scale * safeZoom,
            ),
        );
        const maxY = Math.max(
            ...projected.map(
                (p) => Math.abs(p.y - fit.centerY) * fit.scale * safeZoom,
            ),
        );

        expect(maxX * 2).toBeLessThanOrEqual(600 * 0.9 + 1e-6);
        expect(maxY * 2).toBeLessThanOrEqual(338 * 0.9 + 1e-6);
    });

    it("never lets rotation cause clipping at the safe zoom", () => {
        const scene = generateShapeScene("cube");
        const projectedBase = projectShapeScene(
            scene,
            scene.rx,
            scene.ry,
            scene.rz,
        );
        const fit = computeShapeFit(projectedBase, 600, 338);

        for (const [dx, dy] of [
            [0.3, 0.3],
            [0.8, 0],
            [0, 0.8],
            [1.2, 1.2],
        ]) {
            const projected = projectShapeScene(
                scene,
                scene.rx + dx,
                scene.ry + dy,
                scene.rz,
            );
            const safeZoom = computeSafeZoom(projected, 600, 338, fit);

            const maxX = Math.max(
                ...projected.map(
                    (p) => Math.abs(p.x - fit.centerX) * fit.scale * safeZoom,
                ),
            );
            const maxY = Math.max(
                ...projected.map(
                    (p) => Math.abs(p.y - fit.centerY) * fit.scale * safeZoom,
                ),
            );

            expect(safeZoom).toBeGreaterThan(0);
            expect(maxX * 2).toBeLessThanOrEqual(600 * 0.9 + 1e-6);
            expect(maxY * 2).toBeLessThanOrEqual(338 * 0.9 + 1e-6);
        }
    });
});
