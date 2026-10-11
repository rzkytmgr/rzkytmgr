export type MdNode = {
    type: string;
    value?: string;
    children?: MdNode[];
    data?: object;
};

const ALERT_MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\n|\r\n|$)/;

const ALERT_TYPES: Record<string, { title: string; role: string }> = {
    NOTE: { title: "Note", role: "note" },
    TIP: { title: "Tip", role: "tip" },
    IMPORTANT: { title: "Important", role: "important" },
    WARNING: { title: "Warning", role: "warning" },
    CAUTION: { title: "Caution", role: "caution" },
};

export function remarkGithubAlerts() {
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
