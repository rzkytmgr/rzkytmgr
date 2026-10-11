import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, {
    type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { createCssVariablesTheme } from "shiki";
import { defineConfig } from "astro/config";

import { config } from "./src/config";
import { remarkGithubAlerts } from "./src/markdown/remark-github-alerts";
import {
    rehypeCodeBlockLabels,
    rehypeExternalLinks,
    rehypeWrapTables,
} from "./src/markdown/rehype-plugins";

const cssVariablesTheme = createCssVariablesTheme({
    name: "css-variables",
    variablePrefix: "--shiki-",
}) as RehypePrettyCodeOptions["theme"];

export default defineConfig({
    site: config.url,
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        syntaxHighlight: false,
        processor: unified({
            gfm: true,
            smartypants: false,
            remarkPlugins: [remarkGithubAlerts],
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypePrettyCode,
                    {
                        theme: cssVariablesTheme,
                        keepBackground: false,
                    },
                ],
                rehypeCodeBlockLabels,
                rehypeWrapTables,
                rehypeExternalLinks,
            ],
        }),
    },
});
