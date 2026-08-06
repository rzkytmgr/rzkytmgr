import { describe, expect, it } from "vitest";
import { renderMarkdown } from "@/utils/server/markdown-render";

describe("renderMarkdown", () => {
    it("injects a language label with a copy button for fenced code blocks", async () => {
        const html = await renderMarkdown("```ts\nconst x = 1;\n```");

        expect(html).toContain("code-block-label");
        expect(html).toContain("code-block-label__name");
        expect(html).toContain("TypeScript");
        expect(html).toContain("data-code-block-copy");
        expect(html).toContain("code-block-label__copy");
        expect(html).toContain("<button");
    });

    it("renders GitHub-style alerts with the marker stripped", async () => {
        const html = await renderMarkdown(
            "> [!TIP]\n> Use this approach.\n\nSome text.",
        );

        expect(html).toContain("markdown-alert");
        expect(html).toContain('data-alert-type="tip"');
        expect(html).toContain(">Tip");
        expect(html).not.toContain("[!TIP]");
    });

    it("wraps tables in a scrollable container and slugs headings", async () => {
        const html = await renderMarkdown(
            "## Hello World\n\n| a | b |\n|---|---|\n| 1 | 2 |",
        );

        expect(html).toContain('id="hello-world"');
        expect(html).toContain("markdown-table-wrapper");
    });

    it("marks external links with an icon and leaves internal links alone", async () => {
        const html = await renderMarkdown(
            "[External](https://example.com) and [internal](/blog/post) and [anchor](#hello).",
        );

        expect(html).toContain("markdown-external-icon");
        expect(html).toContain('target="_blank"');
        expect(html).toContain('rel="noopener noreferrer"');

        const internal = html.match(/href="\/blog\/post">[^<]*</);
        expect(internal).not.toBeNull();
        expect(internal![0]).not.toContain("markdown-external-icon");

        const anchor = html.match(/href="#hello">[^<]*</);
        expect(anchor).not.toBeNull();
        expect(anchor![0]).not.toContain("markdown-external-icon");
    });

    it("does not add an external icon to image links", async () => {
        const html = await renderMarkdown(
            "[![alt text](https://example.com/image.png)](https://example.com)",
        );

        expect(html).toContain("<img");
        expect(html).not.toContain("markdown-external-icon");
    });

    it("renders ordered and unordered lists with the list container", async () => {
        const html = await renderMarkdown(
            "- one\n- two\n\n1. first\n2. second",
        );

        expect(html).toContain("<ul>");
        expect(html).toContain("<ol>");
        expect(html).toContain("<li>one</li>");
        expect(html).toContain("<li>first</li>");
    });
});
