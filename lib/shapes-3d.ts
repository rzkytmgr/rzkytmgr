export type Vec3 = {
    x: number;
    y: number;
    z: number;
};

export type Mesh3D = {
    vertices: Vec3[];
    edges: Array<[number, number]>;

    faces: Array<[number, number, number] | [number, number, number, number]>;
};

export type ShapeScene = {
    mesh: Mesh3D;
    rx: number;
    ry: number;
    rz: number;
    fov: number;

    spin: ShapeSpin;
};

export type ProjectedVertex = {
    x: number;
    y: number;
    depth: number;

    wx: number;
    wy: number;
    wz: number;
};

export type ShapeFit = {
    scale: number;
    centerX: number;
    centerY: number;
};

export type ShapeSpin = {
    rx: number;
    ry: number;
    rz: number;
};

function hashString(input: string): number {
    let hash = 0x811c9dc5;

    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
    }

    return hash >>> 0;
}

function mulberry32(seed: number): () => number {
    let state = seed >>> 0;

    return () => {
        state = (state + 0x6d2b79f5) >>> 0;

        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function buildMesh(vertices: Vec3[], faces: Mesh3D["faces"]): Mesh3D {
    const seen = new Set<string>();
    const edges: Array<[number, number]> = [];

    for (const face of faces) {
        for (let index = 0; index < face.length; index += 1) {
            const a = face[index];
            const b = face[(index + 1) % face.length];
            const key = a < b ? `${a}-${b}` : `${b}-${a}`;

            if (!seen.has(key)) {
                seen.add(key);
                edges.push([a, b]);
            }
        }
    }

    return { vertices, edges, faces };
}

function cube(prng: () => number): Mesh3D {
    const s = 0.85 + prng() * 0.5;
    const vertices: Vec3[] = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
    ];
    const faces: Mesh3D["faces"] = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [0, 1, 5, 4],
        [1, 2, 6, 5],
        [2, 3, 7, 6],
        [3, 0, 4, 7],
    ];

    return buildMesh(vertices, faces);
}

function octahedron(prng: () => number): Mesh3D {
    const s = 0.95 + prng() * 0.45;
    const vertices: Vec3[] = [
        { x: s, y: 0, z: 0 },
        { x: -s, y: 0, z: 0 },
        { x: 0, y: s, z: 0 },
        { x: 0, y: -s, z: 0 },
        { x: 0, y: 0, z: s },
        { x: 0, y: 0, z: -s },
    ];
    const faces: Mesh3D["faces"] = [
        [0, 2, 4],
        [2, 1, 4],
        [1, 3, 4],
        [3, 0, 4],
        [0, 2, 5],
        [2, 1, 5],
        [1, 3, 5],
        [3, 0, 5],
    ];

    return buildMesh(vertices, faces);
}

function icosahedron(prng: () => number): Mesh3D {
    const radius = 0.95 + prng() * 0.4;
    const t = (1 + Math.sqrt(5)) / 2;
    const raw: Vec3[] = [
        { x: -1, y: t, z: 0 },
        { x: 1, y: t, z: 0 },
        { x: -1, y: -t, z: 0 },
        { x: 1, y: -t, z: 0 },
        { x: 0, y: -1, z: t },
        { x: 0, y: 1, z: t },
        { x: 0, y: -1, z: -t },
        { x: 0, y: 1, z: -t },
        { x: t, y: 0, z: -1 },
        { x: t, y: 0, z: 1 },
        { x: -t, y: 0, z: -1 },
        { x: -t, y: 0, z: 1 },
    ];
    const vertices = raw.map((v) => {
        const len = Math.hypot(v.x, v.y, v.z) || 1;
        return {
            x: (v.x / len) * radius,
            y: (v.y / len) * radius,
            z: (v.z / len) * radius,
        };
    });
    const faces: Mesh3D["faces"] = [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1],
    ];

    return buildMesh(vertices, faces);
}

function sphere(prng: () => number): Mesh3D {
    const radius = 0.95 + prng() * 0.35;
    const rings = 12;
    const segments = 24;
    const vertices: Vec3[] = [];

    for (let ring = 0; ring < rings; ring += 1) {
        const theta = (ring / (rings - 1)) * Math.PI;

        for (let seg = 0; seg < segments; seg += 1) {
            const phi = (seg / segments) * Math.PI * 2;
            vertices.push({
                x: radius * Math.sin(theta) * Math.cos(phi),
                y: radius * Math.cos(theta),
                z: radius * Math.sin(theta) * Math.sin(phi),
            });
        }
    }

    const faces: Mesh3D["faces"] = [];

    for (let ring = 0; ring < rings - 1; ring += 1) {
        for (let seg = 0; seg < segments; seg += 1) {
            const next = (seg + 1) % segments;
            const a = ring * segments + seg;
            const b = ring * segments + next;
            const c = (ring + 1) * segments + next;
            const d = (ring + 1) * segments + seg;
            faces.push([a, b, c, d]);
        }
    }

    return buildMesh(vertices, faces);
}

function torus(prng: () => number): Mesh3D {
    const R = 0.8 + prng() * 0.3;
    const r = 0.32 + prng() * 0.14;
    const major = 28;
    const minor = 12;
    const vertices: Vec3[] = [];

    for (let u = 0; u < major; u += 1) {
        const tu = (u / major) * Math.PI * 2;

        for (let v = 0; v < minor; v += 1) {
            const tv = (v / minor) * Math.PI * 2;
            vertices.push({
                x: (R + r * Math.cos(tv)) * Math.cos(tu),
                y: r * Math.sin(tv),
                z: (R + r * Math.cos(tv)) * Math.sin(tu),
            });
        }
    }

    const faces: Mesh3D["faces"] = [];

    for (let u = 0; u < major; u += 1) {
        const nextU = (u + 1) % major;

        for (let v = 0; v < minor; v += 1) {
            const nextV = (v + 1) % minor;
            const a = u * minor + v;
            const b = u * minor + nextV;
            const c = nextU * minor + nextV;
            const d = nextU * minor + v;
            faces.push([a, b, c, d]);
        }
    }

    return buildMesh(vertices, faces);
}

function helix(prng: () => number): Mesh3D {
    const radius = 0.7 + prng() * 0.3;
    const height = 1.6 + prng() * 0.5;
    const turns = 2.5 + prng() * 2;
    const steps = 140;
    const vertices: Vec3[] = [];

    for (let index = 0; index <= steps; index += 1) {
        const t = index / steps;
        const angle = t * Math.PI * 2 * turns;
        vertices.push({
            x: radius * Math.cos(angle),
            y: (t - 0.5) * height,
            z: radius * Math.sin(angle),
        });
    }

    const edges: Array<[number, number]> = [];

    for (let index = 0; index < vertices.length - 1; index += 1) {
        edges.push([index, index + 1]);
    }

    return { vertices, edges, faces: [] };
}

function assembly(prng: () => number): Mesh3D {
    const a = pickShape(prng);
    const b = pickShape(prng);

    const shiftedA = {
        vertices: a.vertices.map((p) => ({
            x: p.x * 0.85,
            y: p.y * 0.85 - 0.55,
            z: p.z * 0.85,
        })),
        edges: a.edges,
        faces: a.faces,
    };
    const shiftedB = {
        vertices: b.vertices.map((p) => ({
            x: p.x * 0.7,
            y: p.y * 0.7 + 0.75,
            z: p.z * 0.7,
        })),
        edges: b.edges,
        faces: b.faces,
    };

    const offset = shiftedA.vertices.length;
    const vertices = [...shiftedA.vertices, ...shiftedB.vertices];
    const edges: Array<[number, number]> = [
        ...shiftedA.edges,
        ...shiftedB.edges.map(
            ([i, j]) => [i + offset, j + offset] as [number, number],
        ),
    ];
    const faces: Mesh3D["faces"] = [
        ...shiftedA.faces,
        ...shiftedB.faces.map((face) => {
            const shifted = face.map((i) => i + offset);
            return shifted.length === 4
                ? (shifted as [number, number, number, number])
                : (shifted as [number, number, number]);
        }),
    ];

    return { vertices, edges, faces };
}

function pickShape(prng: () => number): Mesh3D {
    const subSeed = Math.floor(prng() * 0xffffffff);
    const random = mulberry32(subSeed);

    switch (Math.floor(random() * 5)) {
        case 0:
            return cube(random);
        case 1:
            return octahedron(random);
        case 2:
            return icosahedron(random);
        case 3:
            return sphere(random);
        default:
            return torus(random);
    }
}

function transform(p: Vec3, rx: number, ry: number, rz: number) {
    const { x, y, z } = p;

    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const cz = Math.cos(rz);
    const sz = Math.sin(rz);

    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;

    const y2 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;

    const x3 = x1 * cz - y2 * sz;
    const y3 = x1 * sz + y2 * cz;

    return { x: x3, y: y3, z: z2, depth: z2 + 2.6 };
}

const IDLE_SPEED = 0.2;

function generateShapeSpin(prng: () => number): ShapeSpin {
    const speed = IDLE_SPEED * (0.7 + prng() * 0.6);
    const direction = () => (prng() < 0.5 ? -1 : 1);

    switch (Math.floor(prng() * 4)) {
        case 0:
            return { rx: speed * direction(), ry: 0, rz: 0 };
        case 1:
            return { rx: 0, ry: speed * direction(), rz: 0 };
        case 2:
            return {
                rx: speed * 0.8 * direction(),
                ry: speed * direction(),
                rz: 0,
            };
        default:
            return {
                rx: speed * 0.6 * direction(),
                ry: speed * direction(),
                rz: speed * 0.35 * direction(),
            };
    }
}

function flask(prng: () => number): Mesh3D {
    const segments = 14;
    const scale = 0.95 + prng() * 0.15;

    const profile: Array<[number, number]> = [
        [-1.0, 0.24],
        [-0.86, 0.19],
        [-0.5, 0.19],
        [-0.1, 0.36],
        [0.35, 0.66],
        [0.7, 0.88],
        [0.98, 1.0],
    ];

    const vertices: Vec3[] = [];
    const faces: Mesh3D["faces"] = [];

    for (const [y, radius] of profile) {
        for (let seg = 0; seg < segments; seg += 1) {
            const angle = (seg / segments) * Math.PI * 2;
            vertices.push({
                x: radius * Math.cos(angle) * scale,
                y: y * scale,
                z: radius * Math.sin(angle) * scale,
            });
        }
    }

    for (let ring = 0; ring < profile.length - 1; ring += 1) {
        const row = ring * segments;

        for (let seg = 0; seg < segments; seg += 1) {
            const next = (seg + 1) % segments;
            faces.push([
                row + seg,
                row + next,
                row + segments + next,
                row + segments + seg,
            ]);
        }
    }

    const baseCenter = vertices.length;
    vertices.push({ x: 0, y: profile[profile.length - 1][0] * scale, z: 0 });

    const baseRow = (profile.length - 1) * segments;

    for (let seg = 0; seg < segments; seg += 1) {
        const next = (seg + 1) % segments;
        faces.push([baseRow + seg, baseRow + next, baseCenter]);
    }

    return buildMesh(vertices, faces);
}

function testTube(prng: () => number): Mesh3D {
    const segments = 12;
    const scale = 0.95 + prng() * 0.15;

    const profile: Array<[number, number]> = [
        [-1.05, 0.44],
        [-0.92, 0.35],
        [-0.85, 0.34],
        [0.4, 0.34],
        [0.516, 0.32],
        [0.619, 0.26],
        [0.694, 0.17],
        [0.735, 0.059],
        [0.74, 0.012],
    ];

    const vertices: Vec3[] = [];
    const faces: Mesh3D["faces"] = [];

    for (const [y, radius] of profile) {
        for (let seg = 0; seg < segments; seg += 1) {
            const angle = (seg / segments) * Math.PI * 2;
            vertices.push({
                x: radius * Math.cos(angle) * scale,
                y: y * scale,
                z: radius * Math.sin(angle) * scale,
            });
        }
    }

    for (let ring = 0; ring < profile.length - 1; ring += 1) {
        const row = ring * segments;

        for (let seg = 0; seg < segments; seg += 1) {
            const next = (seg + 1) % segments;
            faces.push([
                row + seg,
                row + next,
                row + segments + next,
                row + segments + seg,
            ]);
        }
    }

    return buildMesh(vertices, faces);
}

export function generateShapeScene(seed: string): ShapeScene {
    const prng = mulberry32(hashString(seed));
    const shapeType = Math.floor(prng() * 8);

    let mesh: Mesh3D;

    switch (shapeType) {
        case 0:
            mesh = cube(prng);
            break;
        case 1:
            mesh = octahedron(prng);
            break;
        case 2:
            mesh = icosahedron(prng);
            break;
        case 3:
            mesh = sphere(prng);
            break;
        case 4:
            mesh = torus(prng);
            break;
        case 5:
            mesh = helix(prng);
            break;
        case 6:
            mesh = assembly(prng);
            break;
        default:
            mesh = flask(prng);
            break;
    }

    return {
        mesh,
        rx: prng() * Math.PI * 2,
        ry: prng() * Math.PI * 2,
        rz: prng() * Math.PI * 0.5,
        fov: 3.2,
        spin: generateShapeSpin(prng),
    };
}

export function generateFlaskScene(seed: string): ShapeScene {
    const prng = mulberry32(hashString(seed));

    return {
        mesh: flask(prng),
        rx: 0.12,
        ry: 0.65,
        rz: 0,
        fov: 3.2,
        spin: { rx: 0, ry: 0, rz: 0 },
    };
}

export function generateTestTubeScene(seed: string): ShapeScene {
    const prng = mulberry32(hashString(seed));

    return {
        mesh: testTube(prng),
        rx: 0.1,
        ry: 0.7,
        rz: 0,
        fov: 3.2,
        spin: { rx: 0, ry: 0.18, rz: 0 },
    };
}

export function projectShapeScene(
    scene: ShapeScene,
    rx: number,
    ry: number,
    rz: number,
): ProjectedVertex[] {
    return scene.mesh.vertices.map((point) => {
        const t = transform(point, rx, ry, rz);
        const persp = scene.fov / (scene.fov + t.depth);
        return {
            x: t.x * persp,
            y: t.y * persp,
            depth: t.depth,
            wx: t.x,
            wy: t.y,
            wz: t.z,
        };
    });
}

export function computeShapeFit(
    projected: ProjectedVertex[],
    width: number,
    height: number,
): ShapeFit {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const p of projected) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }

    const spanX = Math.max(maxX - minX, 1e-6);
    const spanY = Math.max(maxY - minY, 1e-6);

    return {
        scale: Math.min((width * 0.7) / spanX, (height * 0.7) / spanY),
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
    };
}

const MAX_VIEWPORT_FRACTION = 0.9;

export type DotGlobe = Readonly<{
    count: number;

    latSin: Float32Array;
    latCos: Float32Array;
    lon: Float32Array;
    radii: Float32Array;
    sizes: Float32Array;
}>;

export function buildDotGlobe(count: number, seed: string): DotGlobe {
    const random = mulberry32(hashString(seed));
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const latSin = new Float32Array(count);
    const latCos = new Float32Array(count);
    const lon = new Float32Array(count);
    const radii = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
        const y = 1 - (2 * (index + 0.5)) / count;

        latSin[index] = y;
        latCos[index] = Math.sqrt(Math.max(0, 1 - y * y));
        lon[index] = index * goldenAngle;
        radii[index] = 0.97 + random() * 0.06;
        sizes[index] = 0.85 + random() * 0.6;
    }

    return { count, latSin, latCos, lon, radii, sizes };
}

export function computeSafeZoom(
    projected: ProjectedVertex[],
    width: number,
    height: number,
    fit: ShapeFit,
): number {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const p of projected) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }

    const extentX = Math.max(
        Math.abs(minX - fit.centerX),
        Math.abs(maxX - fit.centerX),
    );
    const extentY = Math.max(
        Math.abs(minY - fit.centerY),
        Math.abs(maxY - fit.centerY),
    );

    const maxZoomX =
        extentX > 0
            ? (width * MAX_VIEWPORT_FRACTION) / (2 * extentX * fit.scale)
            : Infinity;
    const maxZoomY =
        extentY > 0
            ? (height * MAX_VIEWPORT_FRACTION) / (2 * extentY * fit.scale)
            : Infinity;

    return Math.min(maxZoomX, maxZoomY);
}
