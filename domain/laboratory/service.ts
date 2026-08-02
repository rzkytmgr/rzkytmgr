import { parseSlug } from "@/utils";
import { contentMapping } from "@/utils/server/content";
import fs from "node:fs";
import path from "node:path";

const experimentContentPath = path.resolve("contents", "laboratory");
const filenames = fs
    .readdirSync(experimentContentPath)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export const getAllExperimentSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllExperiments = async () => {
    return new Map<string, unknown>(
        await contentMapping(filenames, "laboratory"),
    );
};

export const getLatestExperiments = async (total = 4) => {
    return new Map<string, unknown>(
        await contentMapping(
            filenames.slice(filenames.length - total),
            "laboratory",
        ),
    );
};

export const getExperimentBySlug = async (slug: string) => {
    const experiments = await getAllExperiments();
    return experiments.get(slug);
};
