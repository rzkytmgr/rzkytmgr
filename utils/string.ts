export const parseFilename = (filename: string) => {
    return filename.slice(0, -4);
};

export const parseSlug = (filename: string) => {
    return filename.slice(0, -4).split("_")[1];
};
