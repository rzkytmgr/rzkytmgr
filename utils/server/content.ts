import path from "node:path";
import type { GrayMatterFile } from "gray-matter";
import { parseContentFilename } from "../string";
import { getContent, getContentMetadata } from "@/lib/content/loader";

export function loadCollectionEntries<T>(
    filenames: string[],
    dir: string,
): Promise<[string, T][]>;

export function loadCollectionEntries(
    filenames: string[],
    dir: string,
    includeContent: true,
): Promise<[string, GrayMatterFile<string>][]>;

export async function loadCollectionEntries<T>(
    filenames: string[],
    dir: string,
    includeContent = false,
) {
    return Promise.all(
        filenames.map(async (relativePath) => {
            const { slug } = parseContentFilename(path.basename(relativePath));

            if (includeContent) {
                return [
                    slug,
                    await getContent(path.join(dir, relativePath)),
                ] as const;
            }

            return [
                slug,
                await getContentMetadata<T>(path.join(dir, relativePath)),
            ] as const;
        }),
    );
}
