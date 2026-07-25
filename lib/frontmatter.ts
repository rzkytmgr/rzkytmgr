import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentPath = path.resolve("contents");

export const getContent = (filename: string, dir: string = "") => {
    const regex = /^[a-z0-9-]+$/;

    if (!regex.test(filename) || (dir && !regex.test(dir))) {
        return null;
    }

    const filepath = dir
        ? path.join(contentPath, dir, filename + ".mdx")
        : path.join(contentPath, filename + ".mdx");

    const content = fs.readFileSync(filepath, "utf-8");

    return matter(content);
};
