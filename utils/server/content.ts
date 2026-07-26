import { getContent } from "@/lib/content";
import { parseFilename, parseSlug } from "../string";

export const contentMapping = async (
    filenames: string[],
    dir: string,
): Promise<[string, unknown][]> => {
    return await Promise.all(
        filenames.map(async (filename) => [
            parseSlug(filename),
            (await getContent(parseFilename(filename), dir))!.data,
        ]),
    );
};
