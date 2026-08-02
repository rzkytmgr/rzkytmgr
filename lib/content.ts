import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentPath = path.resolve("contents");

export const getConfig = () => {
    const content = fs.readFileSync(
        path.join(contentPath, "index.mdx"),
        "utf-8",
    );

    return matter(content)!.data;
};

export const getContent = async (filename: string, dir: string = "") => {
    const regex = /^[a-z0-9-_]+$/;

    if (!regex.test(filename)) {
        return null;
    }

    const filepath = dir
        ? path.join(contentPath, dir, filename + ".mdx")
        : path.join(contentPath, filename + ".mdx");

    const content = await fs.promises.readFile(filepath, "utf-8");
    return matter(content);
};

export const getContentMetadata = async (filename: string, dir?: string) => {
    const content = (await getContent(filename, dir))!;
    return content.data;
};
