import fs from "node:fs";
import path from "node:path";

const CONTENT_ROOT = path.resolve("contents");

const naturalSort = (a: string, b: string) =>
    a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
    });

function scan(dir: string, root: string): string[] {
    const entries = fs
        .readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => naturalSort(a.name, b.name));

    return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return scan(fullPath, root);
        }

        if (!entry.name.endsWith(".mdx")) {
            return [];
        }

        return path.relative(root, fullPath);
    });
}

export function scanCollection(collection: string): string[] {
    const root = path.join(CONTENT_ROOT, collection);
    return scan(root, root);
}
