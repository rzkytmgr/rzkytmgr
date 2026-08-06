import { describe, expect, it } from "vitest";
import { getCodeLanguage } from "@/utils/server/code-block-labels";

describe("getCodeLanguage", () => {
    it("maps known language identifiers to display names with icons", () => {
        const cases: Array<[string, string]> = [
            ["typescript", "TypeScript"],
            ["ts", "TypeScript"],
            ["tsx", "TSX"],
            ["javascript", "JavaScript"],
            ["js", "JavaScript"],
            ["jsx", "JSX"],
            ["python", "Python"],
            ["py", "Python"],
            ["bash", "Bash"],
            ["sh", "Shell"],
            ["sql", "SQL"],
            ["sqlite", "SQLite"],
            ["json", "JSON"],
            ["yaml", "YAML"],
            ["yml", "YAML"],
        ];

        for (const [identifier, name] of cases) {
            const meta = getCodeLanguage(identifier);
            expect(meta.name, identifier).toBe(name);
            expect(meta.icon, `${identifier} should have an icon`).toBeTruthy();
        }
    });

    it("is case-insensitive and trims whitespace", () => {
        const meta = getCodeLanguage("  TypeScript  ");
        expect(meta.name).toBe("TypeScript");
        expect(meta.icon).toBeTruthy();
    });

    it("falls back to a capitalized label without an icon for unknown languages", () => {
        const meta = getCodeLanguage("haskell");
        expect(meta.name).toBe("Haskell");
        expect(meta.icon).toBeUndefined();
    });

    it("returns an empty label for undefined languages", () => {
        expect(getCodeLanguage(undefined).name).toBe("");
        expect(getCodeLanguage("").name).toBe("");
    });
});
