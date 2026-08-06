import type { Element, Root } from "hast";
import rehypePrettyCode, {
    type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createCssVariablesTheme } from "shiki";
import { unified } from "unified";
import { getCodeLanguage } from "./code-block-labels";

type MdNode = {
    type: string;
    value?: string;
    children?: MdNode[];
    data?: Record<string, unknown>;
};

const ALERT_MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\n|\r\n|$)/;

const ALERT_TYPES: Record<string, { title: string; role: string }> = {
    NOTE: { title: "Note", role: "note" },
    TIP: { title: "Tip", role: "tip" },
    IMPORTANT: { title: "Important", role: "important" },
    WARNING: { title: "Warning", role: "warning" },
    CAUTION: { title: "Caution", role: "caution" },
};

function remarkGithubAlerts() {
    return (tree: MdNode) => {
        const walk = (node: MdNode): void => {
            if (!node || typeof node !== "object") {
                return;
            }

            if (node.type === "blockquote") {
                const first = node.children?.[0];

                if (
                    first?.type === "paragraph" &&
                    typeof first.children?.[0]?.value === "string"
                ) {
                    const marker = ALERT_MARKER.exec(first.children[0].value);

                    if (marker) {
                        const type = marker[1];
                        const meta = ALERT_TYPES[type];

                        const firstText = first.children[0];
                        firstText.value = firstText.value!.slice(
                            marker[0].length,
                        );

                        if (firstText.value === "") {
                            first.children.shift();
                        }

                        const children = (node.children ?? []).filter(
                            (child) =>
                                child !== first ||
                                (first.children?.length ?? 0) > 0,
                        );

                        const icon: MdNode = {
                            type: "span",
                            data: {
                                hName: "span",
                                hProperties: {
                                    className: ["markdown-alert-icon"],
                                    ariaHidden: "true",
                                },
                            },
                            children: [],
                        };
                        const heading: MdNode = {
                            type: "paragraph",
                            data: {
                                hName: "p",
                                hProperties: {
                                    className: ["markdown-alert-title"],
                                },
                            },
                            children: [
                                icon,
                                { type: "text", value: meta.title },
                            ],
                        };

                        node.type = "container";
                        node.children = [heading, ...children];
                        node.data = {
                            hName: "div",
                            hProperties: {
                                className: ["markdown-alert"],
                                dataAlertType: type.toLowerCase(),
                                role: meta.role,
                            },
                        };
                    }
                }
            }

            node.children?.forEach(walk);
        };

        walk(tree);
    };
}

const cssVariablesTheme = createCssVariablesTheme({
    name: "css-variables",
    variablePrefix: "--shiki-",
}) as RehypePrettyCodeOptions["theme"];

const EXTERNAL_LINK_ICON: Element = {
    type: "element",
    tagName: "svg",
    properties: {
        className: ["markdown-external-icon"],
        viewBox: "0 0 24 24",
        width: "1em",
        height: "1em",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
    },
    children: [
        {
            type: "element",
            tagName: "path",
            properties: { d: "M15 3h6v6" },
            children: [],
        },
        {
            type: "element",
            tagName: "path",
            properties: { d: "M10 14 21 3" },
            children: [],
        },
        {
            type: "element",
            tagName: "path",
            properties: {
                d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
            },
            children: [],
        },
    ],
};

function rehypeExternalLinks() {
    return (tree: Root) => {
        const walk = (node: unknown): void => {
            if (!node || typeof node !== "object") {
                return;
            }

            const current = node as {
                type?: string;
                tagName?: string;
                properties?: Record<string, unknown>;
                children?: unknown[];
            };

            if (current.type === "element" && current.tagName === "a") {
                const href = current.properties?.href;

                if (typeof href === "string" && /^https?:\/\//.test(href)) {
                    current.properties = {
                        ...current.properties,
                        target: "_blank",
                        rel: "noopener noreferrer",
                    };

                    const wrapsImage = (current.children ?? []).some(
                        (child) =>
                            (child as { type?: string; tagName?: string })
                                .type === "element" &&
                            (child as { tagName?: string }).tagName === "img",
                    );

                    if (!wrapsImage) {
                        current.children = [
                            ...(current.children ?? []),
                            EXTERNAL_LINK_ICON,
                        ];
                    }
                }
            }

            current.children?.forEach(walk);
        };

        walk(tree);
    };
}

function rehypeCodeBlockLabels() {
    return (tree: Root) => {
        const walk = (node: Element): void => {
            if (
                node.tagName === "figure" &&
                "data-rehype-pretty-code-figure" in (node.properties ?? {})
            ) {
                const pre = (node.children ?? []).find(
                    (child): child is Element =>
                        (child as { type?: string }).type === "element" &&
                        (child as Element).tagName === "pre",
                );
                const code = pre?.children?.find(
                    (child): child is Element =>
                        (child as { type?: string }).type === "element" &&
                        (child as Element).tagName === "code",
                );

                const rawLanguage =
                    typeof code?.properties?.["data-language"] === "string"
                        ? code.properties["data-language"]
                        : undefined;
                const meta = getCodeLanguage(rawLanguage);

                if (meta.name) {
                    const children: Element[] = [];

                    if (meta.icon) {
                        children.push({
                            type: "element",
                            tagName: "svg",
                            properties: {
                                className: ["code-block-label__icon"],
                                viewBox: "0 0 24 24",
                                width: "1em",
                                height: "1em",
                                "aria-hidden": "true",
                            },
                            children: [
                                {
                                    type: "element",
                                    tagName: "path",
                                    properties: { d: meta.icon },
                                    children: [],
                                },
                            ],
                        });
                    }

                    children.push({
                        type: "element",
                        tagName: "span",
                        properties: { className: ["code-block-label__name"] },
                        children: [{ type: "text", value: meta.name }],
                    });

                    children.push({
                        type: "element",
                        tagName: "button",
                        properties: {
                            type: "button",
                            className: ["code-block-label__copy"],
                            dataCodeBlockCopy: "",
                            ariaLabel: "Copy code",
                            title: "Copy code",
                        },
                        children: [
                            {
                                type: "element",
                                tagName: "svg",
                                properties: {
                                    className: ["copy-icon"],
                                    viewBox: "0 0 24 24",
                                    width: "1em",
                                    height: "1em",
                                    "aria-hidden": "true",
                                },
                                children: [
                                    {
                                        type: "element",
                                        tagName: "rect",
                                        properties: {
                                            x: "9",
                                            y: "9",
                                            width: "10",
                                            height: "10",
                                            rx: "1.5",
                                        },
                                        children: [],
                                    },
                                    {
                                        type: "element",
                                        tagName: "rect",
                                        properties: {
                                            x: "5",
                                            y: "5",
                                            width: "10",
                                            height: "10",
                                            rx: "1.5",
                                            opacity: "0.45",
                                        },
                                        children: [],
                                    },
                                ],
                            },
                            {
                                type: "element",
                                tagName: "svg",
                                properties: {
                                    className: ["check-icon"],
                                    viewBox: "0 0 24 24",
                                    width: "1em",
                                    height: "1em",
                                    "aria-hidden": "true",
                                },
                                children: [
                                    {
                                        type: "element",
                                        tagName: "path",
                                        properties: { d: "M4 12.5l5 5L20 6.5" },
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    });

                    const header: Element = {
                        type: "element",
                        tagName: "div",
                        properties: {
                            className: ["code-block-label"],
                            dataLanguageLabel: rawLanguage ?? "",
                        },
                        children,
                    };

                    node.children = [header, ...node.children];
                }
            }

            (node.children ?? []).forEach((child) => {
                if ((child as { type?: string }).type === "element") {
                    walk(child as Element);
                }
            });
        };

        (tree.children ?? []).forEach((child) => {
            if ((child as { type?: string }).type === "element") {
                walk(child as Element);
            }
        });
    };
}

function rehypeWrapTables() {
    return (tree: Root) => {
        const walk = (node: Element): void => {
            const children = node.children ?? [];

            for (let index = 0; index < children.length; index += 1) {
                const child = children[index] as unknown;

                if (
                    child &&
                    typeof child === "object" &&
                    (child as { type?: string }).type === "element"
                ) {
                    const element = child as Element;

                    if (element.tagName === "table") {
                        children[index] = {
                            type: "element",
                            tagName: "div",
                            properties: {
                                className: ["markdown-table-wrapper"],
                            },
                            children: [element],
                        } as unknown as Element;
                    } else {
                        walk(element);
                    }
                }
            }
        };

        walk(tree as unknown as Element);
    };
}

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGithubAlerts as never)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
        theme: cssVariablesTheme,
        keepBackground: false,
    })
    .use(rehypeCodeBlockLabels)
    .use(rehypeWrapTables)
    .use(rehypeExternalLinks)
    .use(rehypeStringify);

export async function renderMarkdown(markdown: string): Promise<string> {
    const file = await processor.process(markdown);
    return String(file);
}
