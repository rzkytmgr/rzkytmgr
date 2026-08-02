import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter, { GrayMatterFile } from "gray-matter";

const contentPath = path.resolve("contents");

export const getConfig = () => {
    const content = fs.readFileSync(
        path.join(contentPath, "index.mdx"),
        "utf8",
    );

    return matter(content).data;
};

export const getContent = async <T = Record<string, unknown>>(
    relativePath: string,
): Promise<GrayMatterFile<string> & { data: T }> => {
    const filepath = path.join(contentPath, relativePath);
    const content = await fs.promises.readFile(filepath, "utf8");

    return matter(content) as GrayMatterFile<string> & { data: T };
};

export const getContentMetadata = async <T>(
    relativePath: string,
): Promise<T> => {
    return (await getContent<T>(relativePath)).data;
};
