import GithubSlugger from "github-slugger";

export type MarkdownHeading = {
    level: number;
    text: string;
    id: string;
};

export function extractHeadings(markdown: string): MarkdownHeading[] {
    const slugger = new GithubSlugger();
    const headings: MarkdownHeading[] = [];

    for (const line of markdown.split(/\r?\n/)) {
        const match = line.match(/^(#{2,4})\s+(.+)$/);

        if (!match) {
            continue;
        }

        const level = match[1].length;
        const text = match[2]
            .trim()
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/[*_`~]/g, "");

        headings.push({
            level,
            text,
            id: slugger.slug(text),
        });
    }

    return headings;
}

export function estimateReadingTime(markdown: string): string {
    const text = markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/[#>*_`~\-\[\]()!]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const words = text.split(" ").filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));

    return `${minutes} min read`;
}
