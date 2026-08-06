import path from "node:path";
import { scanCollection } from "@/lib/content/scanner";
import type { AdjacentType, WriteupsCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";

const filenames = scanCollection("writeups");

export const getAllWriteupSlug = () =>
    filenames.map((filename) => parseSlug(path.basename(filename)));

const byNewest = (
    a: [string, WriteupsCardType],
    b: [string, WriteupsCardType],
) => Date.parse(b[1].date) - Date.parse(a[1].date);

export const getAllWriteups = async () => {
    return new Map(
        (
            await loadCollectionEntries<WriteupsCardType>(filenames, "writeups")
        ).sort(byNewest),
    );
};

export const getAllWriteupContents = async () => {
    return new Map(await loadCollectionEntries(filenames, "writeups", true));
};

export const getLatestWriteups = async (total = 4) => {
    const all = await getAllWriteups();
    return new Map([...all].slice(0, total));
};

export const getWriteupBySlug = async (slug: string) => {
    return (await getAllWriteupContents()).get(slug) as GrayMatterFile<string>;
};

export const getAdjacentWriteup = async (
    slug: string,
): Promise<AdjacentType> => {
    const slugs = getAllWriteupSlug();
    const index = slugs.indexOf(slug);
    const writeups = await getAllWriteups();

    const item = (target: string) => ({
        href: `/blog/${target}`,
        title: writeups.get(target)?.title ?? "",
    });

    return {
        previous: index > 0 ? item(slugs[index - 1]) : null,
        next:
            index >= 0 && index < slugs.length - 1
                ? item(slugs[index + 1])
                : null,
    };
};
