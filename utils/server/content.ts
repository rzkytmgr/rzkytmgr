import path from "node:path";
import { getContent, getContentMetadata } from "@/lib/content";
import { parseFilename, parseSlug } from "../string";

export const contentMapping = async (
    filenames: string[],
    dir: string,
    includeContent = false,
): Promise<[string, unknown][]> => {
    const fetchContent = includeContent ? getContent : getContentMetadata;
    if (dir !== "writeups") {
        return await Promise.all(
            filenames.map(async (filename) => [
                parseSlug(filename),
                await fetchContent(parseFilename(filename), dir),
            ]),
        );
    } else {
        return await Promise.all(
            filenames.map(async (filepath) => {
                const splitPath = filepath.split(path.sep);
                const filename = splitPath.findLast((e) => e)!;
                return [
                    parseSlug(filename),
                    await fetchContent(
                        parseFilename(filename),
                        path.join(dir, ...splitPath.slice(0, -1)),
                    ),
                ];
            }),
        );
    }
};
