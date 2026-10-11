import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const writeups = defineCollection({
    loader: glob({
        base: "./contents/writeups",
        pattern: "*.mdx",
        generateId: ({ entry }) =>
            entry
                .replace(/\.mdx$/, "")
                .replace(/^\d{8}_/, "")
                .replace(/^\d+_/, ""),
    }),
    schema: z.object({
        id: z.string(),
        tag: z.string(),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        date: z.string(),
        reading_time: z.string(),
    }),
});

const showcase = defineCollection({
    loader: glob({
        base: "./contents/showcase",
        pattern: "*.mdx",
        generateId: ({ entry }) =>
            entry.replace(/\.mdx$/, "").replace(/^\d{8}_/, ""),
    }),
    schema: z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        category: z.string(),
        tech_stack: z.array(z.string()),
        date: z.string(),
        reading_time: z.string(),
        is_archive: z.boolean(),
        link: z
            .object({
                repository: z.string().optional(),
                preview: z.string().optional(),
            })
            .optional(),
    }),
});

const laboratory = defineCollection({
    loader: glob({
        base: "./contents/laboratory",
        pattern: "*.mdx",
        generateId: ({ entry }) =>
            entry.replace(/\.mdx$/, "").replace(/^\d{8}_/, ""),
    }),
    schema: z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        category: z.string(),
        stack: z.array(z.string()),
        date: z.string(),
        reading_time: z.string(),
        is_archive: z.boolean(),
        links: z
            .array(
                z.object({
                    label: z.string(),
                    url: z.string().url(),
                }),
            )
            .optional(),
    }),
});

const exploration = defineCollection({
    loader: glob({
        base: "./contents/exploration",
        pattern: "*.mdx",
        generateId: ({ entry }) =>
            entry.replace(/\.mdx$/, "").replace(/^\d{8}_/, ""),
    }),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        link: z.string(),
        date: z.string(),
    }),
});

export const collections = {
    writeups,
    showcase,
    laboratory,
    exploration,
};
