import { describe, expect, it } from "vitest";
import {
    estimateReadingTime,
    extractHeadings,
    type MarkdownHeading,
} from "@/src/utils/markdown";

describe("extractHeadings", () => {
    it("extracts h2-h4 headings and skips h1", () => {
        const markdown = [
            "# Title",
            "",
            "## Introduction",
            "",
            "Some text.",
            "",
            "### Deep dive",
            "",
            "More text.",
            "",
            "#### Notes",
            "",
            "## Conclusion",
        ].join("\n");

        expect(extractHeadings(markdown)).toEqual<MarkdownHeading[]>([
            { level: 2, text: "Introduction", id: "introduction" },
            { level: 3, text: "Deep dive", id: "deep-dive" },
            { level: 4, text: "Notes", id: "notes" },
            { level: 2, text: "Conclusion", id: "conclusion" },
        ]);
    });

    it("works with CRLF line endings", () => {
        const markdown = "## First\r\n\r\nText.\r\n\r\n## Second\r\n";

        expect(extractHeadings(markdown)).toEqual<MarkdownHeading[]>([
            { level: 2, text: "First", id: "first" },
            { level: 2, text: "Second", id: "second" },
        ]);
    });

    it("strips inline markdown from heading text", () => {
        const markdown = "## Getting **started** with `zustand`";

        expect(extractHeadings(markdown)).toEqual<MarkdownHeading[]>([
            {
                level: 2,
                text: "Getting started with zustand",
                id: "getting-started-with-zustand",
            },
        ]);
    });

    it("ignores heading-like lines inside fenced code blocks", () => {
        const markdown = [
            "## Setup",
            "",
            "```bash",
            "# comment inside a code fence",
            "## another commented heading",
            "### pseudo heading in fence",
            "```",
            "",
            "~~~bash",
            "# tilde fence comment",
            "~~~",
            "",
            "## Usage",
        ].join("\n");

        expect(extractHeadings(markdown)).toEqual<MarkdownHeading[]>([
            { level: 2, text: "Setup", id: "setup" },
            { level: 2, text: "Usage", id: "usage" },
        ]);
    });

    it("dedupes identical heading slugs like rehype-slug", () => {
        const markdown = ["## Setup", "", "## Setup"].join("\n");

        expect(extractHeadings(markdown)).toEqual<MarkdownHeading[]>([
            { level: 2, text: "Setup", id: "setup" },
            { level: 2, text: "Setup", id: "setup-1" },
        ]);
    });

    it("returns an empty array when there are no headings", () => {
        expect(extractHeadings("Just a paragraph.\n\nAnother one.")).toEqual(
            [],
        );
        expect(extractHeadings("")).toEqual([]);
    });
});

describe("estimateReadingTime", () => {
    it("returns a minimum of 1 minute for short content", () => {
        expect(estimateReadingTime("Hello world.")).toBe("1 min read");
    });

    it("ignores code blocks when counting words", () => {
        const markdown = [
            "A paragraph with some words.",
            "",
            "```ts",
            "const a = 1;",
            "const b = 2;",
            "const c = 3;",
            "const d = 4;",
            "const e = 5;",
            "const f = 6;",
            "```",
        ].join("\n");

        expect(estimateReadingTime(markdown)).toBe("1 min read");
    });

    it("scales with word count", () => {
        const markdown = Array.from({ length: 400 }, () => "word").join(" ");
        expect(estimateReadingTime(markdown)).toBe("2 min read");
    });
});
