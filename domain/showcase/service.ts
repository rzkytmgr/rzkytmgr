import { scanCollection } from "@/lib/content/scanner";
import { ShowcaseCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";

const filenames = scanCollection("showcase");

export const getAllShowcaseSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllShowcases = async () => {
    return new Map(
        await loadCollectionEntries<ShowcaseCardType>(filenames, "showcase"),
    );
};

export const getLatestShowcases = async (total = 4) => {
    return new Map(
        await loadCollectionEntries<ShowcaseCardType>(
            filenames.slice(filenames.length - total),
            "showcase",
        ),
    );
};

export const getShowcaseBySlug = async (slug: string) => {
    const showcases = await getAllShowcases();
    return showcases.get(slug);
};
