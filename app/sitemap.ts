import type { MetadataRoute } from "next";
import { getAllExperimentSlug } from "@/domain/laboratory/service";
import { getAllShowcaseSlug } from "@/domain/showcase/service";
import { getAllWriteupSlug } from "@/domain/writeups/service";
import { config } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.url.replace(/\/$/, "");
    const entries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/showcase`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/writeups`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/lab`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    for (const slug of getAllWriteupSlug()) {
        entries.push({
            url: `${baseUrl}/blog/${slug}`,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    for (const slug of getAllShowcaseSlug()) {
        entries.push({
            url: `${baseUrl}/showcase/${slug}`,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    for (const slug of getAllExperimentSlug()) {
        entries.push({
            url: `${baseUrl}/lab/${slug}`,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    return entries;
}
