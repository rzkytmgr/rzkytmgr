import { WriteupsCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { contentMapping } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";
import fs from "node:fs";
import path from "node:path";

type WriteupSlug = {
    path: string;
    slug: string;
};

const writeupContentPath = path.resolve("contents", "writeups");

const sortNaturally = (a: string, b: string) =>
    a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
    });

export const getAllWriteupSlug = (filepath: string[] = []): WriteupSlug[] => {
    const currentDirectory = path.join(writeupContentPath, ...filepath);

    const entries = fs
        .readdirSync(currentDirectory, {
            withFileTypes: true,
        })
        .sort((a, b) => sortNaturally(a.name, b.name));

    return entries.flatMap((entry): WriteupSlug[] => {
        if (entry.isDirectory()) {
            return getAllWriteupSlug([...filepath, entry.name]);
        }

        if (!entry.isFile() || !entry.name.endsWith(".mdx")) {
            return [];
        }

        return [
            {
                path: path.join(currentDirectory, entry.name),
                slug: parseSlug(entry.name),
            },
        ];
    });
};

export const getAllWriteups = async (withContent = false) => {
    const writeups = getAllWriteupSlug();
    return new Map<string, unknown>(
        await contentMapping(
            writeups.map((writeup) =>
                path.relative(writeupContentPath, writeup.path),
            ),
            "writeups",
            withContent,
        ),
    ) as Map<string, WriteupsCardType | GrayMatterFile<string>>;
};

export const getLatestWriteups = async (total = 4) => {
    const writeups = getAllWriteupSlug();
    const latestWriteups = writeups.slice(Math.max(0, writeups.length - total));
    return new Map<string, unknown>(
        await contentMapping(
            latestWriteups.map((writeup) =>
                path.relative(writeupContentPath, writeup.path),
            ),
            "writeups",
        ),
    ) as Map<string, WriteupsCardType | GrayMatterFile<string>>;
};

export const getWriteupBySlug = async (slug: string, withContent = false) => {
    const writeups = await getAllWriteups(withContent);
    return writeups.get(slug);
};
