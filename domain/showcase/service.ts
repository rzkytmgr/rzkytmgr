import { parseSlug } from "@/utils";
import { contentMapping } from "@/utils/server/content";
import fs from "node:fs";
import path from "node:path";

const showcaseContentPath = path.resolve("contents", "showcase");
const filenames = fs
    .readdirSync(showcaseContentPath)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export const getAllShowcaseSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllShowcases = async () => {
    return new Map<string, unknown>(
        await contentMapping(filenames, "showcase"),
    );
};

export const getLatestShowcases = async (total = 4) => {
    return new Map<string, unknown>(
        await contentMapping(
            filenames.slice(filenames.length - total),
            "showcase",
        ),
    );
};

export const getShowcaseBySlug = async (slug: string) => {
    const showcases = await getAllShowcases();
    return showcases.get(slug);
};
