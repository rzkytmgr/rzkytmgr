import { parseSlug } from "@/utils";
import { contentMapping } from "@/utils/server/content";
import fs from "node:fs";
import path from "node:path";

const explorationContentPath = path.resolve("contents", "exploration");
const filenames = fs
    .readdirSync(explorationContentPath)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export const getAllExplorationSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllExplorations = async () => {
    return new Map<string, unknown>(
        await contentMapping(filenames, "exploration"),
    );
};

export const getLatestExplorations = async (total = 4) => {
    return new Map<string, unknown>(
        await contentMapping(
            filenames.slice(filenames.length - total),
            "exploration",
        ),
    );
};

export const getExplorationBySlug = async (slug: string) => {
    const explorations = await getAllExplorations();
    return explorations.get(slug);
};
