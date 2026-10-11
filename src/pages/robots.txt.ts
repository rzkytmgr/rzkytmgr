import type { APIRoute } from "astro";
import { config } from "../config";

export const GET: APIRoute = async () => {
    const baseUrl = config.url.replace(/\/$/, "");

    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

    return new Response(robots, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
