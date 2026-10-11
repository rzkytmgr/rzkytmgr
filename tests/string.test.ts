import { describe, expect, it } from "vitest";
import {
    parseContentFilename,
    parseFilename,
    parseSlug,
} from "@/src/utils/string";

describe("parseContentFilename", () => {
    it("parses order, slug and filename from an mdx filename", () => {
        expect(parseContentFilename("01_devnotes-knowledge-base.mdx")).toEqual({
            filename: "01_devnotes-knowledge-base",
            order: 1,
            slug: "devnotes-knowledge-base",
        });
    });

    it("keeps underscores that are part of the slug", () => {
        expect(
            parseContentFilename(
                "03_launched-a-developer-portfolio-template.mdx",
            ).slug,
        ).toBe("launched-a-developer-portfolio-template");
    });

    it("handles a single word filename", () => {
        expect(parseContentFilename("42_hello.mdx")).toEqual({
            filename: "42_hello",
            order: 42,
            slug: "hello",
        });
    });
});

describe("parseSlug", () => {
    it("returns only the slug part", () => {
        expect(parseSlug("04_started-a-new-role.mdx")).toBe(
            "started-a-new-role",
        );
    });
});

describe("parseFilename", () => {
    it("returns the filename without the .mdx extension", () => {
        expect(parseFilename("04_started-a-new-role.mdx")).toBe(
            "04_started-a-new-role",
        );
    });
});
