export type ParsedContentFilename = {
    filename: string;
    order: number;
    slug: string;
};

export const parseContentFilename = (
    filename: string,
): ParsedContentFilename => {
    const name = filename.replace(/\.mdx$/, "");

    const [order, ...slug] = name.split("_");

    return {
        filename: name,
        order: Number(order),
        slug: slug.join("_"),
    };
};

export const parseFilename = (filename: string) =>
    parseContentFilename(filename).filename;

export const parseSlug = (filename: string) =>
    parseContentFilename(filename).slug;
