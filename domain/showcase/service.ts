import { scanCollection } from "@/lib/content/scanner";
import type { AdjacentType, ShowcaseCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";

const filenames = scanCollection("showcase");

export const getAllShowcaseSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

const byNewest = (
    a: [string, ShowcaseCardType],
    b: [string, ShowcaseCardType],
) => Date.parse(b[1].date) - Date.parse(a[1].date);

export const getAllShowcases = async () => {
    return new Map(
        (
            await loadCollectionEntries<ShowcaseCardType>(filenames, "showcase")
        ).sort(byNewest),
    );
};

export const getLatestShowcases = async (total = 4) => {
    const all = await getAllShowcases();
    return new Map([...all].slice(0, total));
};

export const getAllShowcaseContents = async () => {
    return new Map(await loadCollectionEntries(filenames, "showcase", true));
};

export const getShowcaseBySlug = async (slug: string) => {
    const showcases = await getAllShowcases();
    return showcases.get(slug);
};

export const getShowcaseContentBySlug = async (slug: string) => {
    return (await getAllShowcaseContents()).get(slug) as GrayMatterFile<string>;
};

export const getAdjacentShowcase = async (
    slug: string,
): Promise<AdjacentType> => {
    const slugs = getAllShowcaseSlug();
    const index = slugs.indexOf(slug);
    const showcases = await getAllShowcases();

    const item = (target: string) => ({
        href: `/showcase/${target}`,
        title: showcases.get(target)?.title ?? "",
    });

    return {
        previous: index > 0 ? item(slugs[index - 1]) : null,
        next:
            index >= 0 && index < slugs.length - 1
                ? item(slugs[index + 1])
                : null,
    };
};
