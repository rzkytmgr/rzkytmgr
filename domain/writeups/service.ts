import { scanCollection } from "@/lib/content/scanner";
import { WriteupsCardType } from "@/types/global";
import { loadCollectionEntries } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";

const filenames = scanCollection("writeups");

export const getAllWriteupSlug = () =>
    filenames.map((filename) => filename.split("/").pop()!.slice(3, -4));

export const getAllWriteups = async () => {
    return new Map(
        await loadCollectionEntries<WriteupsCardType>(filenames, "writeups"),
    );
};

export const getAllWriteupContents = async () => {
    return new Map(await loadCollectionEntries(filenames, "writeups", true));
};

export const getLatestWriteups = async (total = 4) => {
    return new Map(
        await loadCollectionEntries<WriteupsCardType>(
            filenames.slice(-total),
            "writeups",
        ),
    );
};

export const getWriteupBySlug = async (slug: string) => {
    return (await getAllWriteupContents()).get(slug) as GrayMatterFile<string>;
};
