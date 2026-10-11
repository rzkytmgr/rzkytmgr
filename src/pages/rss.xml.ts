import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { config } from "../config";

const escapeXml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const toRfc822Date = (date: string): string => {
    const match = /^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/.exec(date);

    if (!match) {
        return "";
    }

    const month = MONTH_NAMES.indexOf(match[1]);

    if (month === -1) {
        return "";
    }

    const day = Number(match[2]);
    const year = Number(match[3]);

    if (day < 1 || day > 31) {
        return "";
    }

    return new Date(Date.UTC(year, month, day)).toUTCString();
};

export const GET: APIRoute = async () => {
    const baseUrl = config.url.replace(/\/$/, "");
    const posts = await getCollection("writeups");

    const items = [...posts].sort(
        (a, b) => Date.parse(b.data.date) - Date.parse(a.data.date),
    );

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(config.description)}</description>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
        .map((post) => {
            const pubDate = toRfc822Date(post.data.date);

            return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${baseUrl}/blog/${post.data.slug}</link>
      <guid>${baseUrl}/blog/${post.data.slug}</guid>
      <description>${escapeXml(post.data.description)}</description>${pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
        })
        .join("\n")}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
};
