"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
import { Typography } from "../ui/typography";
import type { SiteTheme } from "@/providers/theme-provider";
import { cn } from "@/utils";

type GiscusCommentsProps = Readonly<{
    config?: {
        repo: string;
        repoId: string;
        category: string;
        categoryId: string;
        mapping?: string;
        reactionsEnabled?: boolean;
        inputPosition?: "top" | "bottom";
        lang?: string;
    };
    className?: string;
}>;

const GISCUS_SCRIPT_SRC = "https://giscus.app/client.js";
const GISCUS_ORIGIN = "https://giscus.app";

type GiscusTheme = "light" | "dark" | "dark_dimmed";

const GISCUS_THEME_BY_SITE_THEME: Record<SiteTheme, GiscusTheme> = {
    "clean-light": "light",
    charcoal: "dark_dimmed",
    kindle: "light",
    reader: "dark",
};

const DEFAULT_GISCUS_THEME: GiscusTheme = "light";

function resolveGiscusTheme(siteTheme: string | undefined): GiscusTheme {
    if (siteTheme && siteTheme in GISCUS_THEME_BY_SITE_THEME) {
        return GISCUS_THEME_BY_SITE_THEME[siteTheme as SiteTheme];
    }

    return DEFAULT_GISCUS_THEME;
}

export function GiscusComments({ config, className }: GiscusCommentsProps) {
    const { resolvedTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    const themeRef = useRef<GiscusTheme>(DEFAULT_GISCUS_THEME);

    const enabled =
        Boolean(config?.repo) &&
        Boolean(config?.repoId) &&
        Boolean(config?.category) &&
        Boolean(config?.categoryId);

    const pushTheme = useCallback(() => {
        const frame = document.querySelector<HTMLIFrameElement>(
            "iframe.giscus-frame",
        );

        frame?.contentWindow?.postMessage(
            { giscus: { setConfig: { theme: themeRef.current } } },
            GISCUS_ORIGIN,
        );
    }, []);

    useEffect(() => {
        const theme = resolveGiscusTheme(resolvedTheme);
        themeRef.current = theme;

        const script = document.querySelector<HTMLScriptElement>(
            'script[data-giscus-script="true"]',
        );

        if (script) {
            script.dataset.theme = theme;
        }

        pushTheme();
    }, [resolvedTheme, pushTheme]);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== GISCUS_ORIGIN) {
                return;
            }

            const data = event.data as {
                giscus?: {
                    loaded?: boolean;
                };
            };

            if (data?.giscus?.loaded === true) {
                pushTheme();
            }
        };

        window.addEventListener("message", onMessage);

        return () => window.removeEventListener("message", onMessage);
    }, [pushTheme]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        document
            .querySelectorAll('script[data-giscus-script="true"]')
            .forEach((node) => node.remove());
        container.replaceChildren();

        const script = document.createElement("script");
        script.async = true;
        script.src = GISCUS_SCRIPT_SRC;
        script.crossOrigin = "anonymous";
        script.dataset.giscusScript = "true";
        script.dataset.repo = config?.repo ?? "";
        script.dataset.repoId = config?.repoId ?? "";
        script.dataset.category = config?.category ?? "";
        script.dataset.categoryId = config?.categoryId ?? "";
        script.dataset.mapping = config?.mapping ?? "pathname";
        script.dataset.strict = "0";
        script.dataset.reactionsEnabled = config?.reactionsEnabled ? "1" : "0";
        script.dataset.emitMetadata = "1";
        script.dataset.inputPosition = config?.inputPosition ?? "bottom";
        script.dataset.theme = themeRef.current;
        script.dataset.lang = config?.lang ?? "en";
        script.dataset.loading = "lazy";

        document.body.appendChild(script);

        return () => script.remove();
    }, [
        enabled,
        config?.repo,
        config?.repoId,
        config?.category,
        config?.categoryId,
        config?.mapping,
        config?.reactionsEnabled,
        config?.inputPosition,
        config?.lang,
    ]);

    if (!enabled) {
        return null;
    }

    return (
        <section
            id="comments"
            aria-label="Comments"
            className={cn(
                "mt-16",
                "w-full",
                "scroll-mt-24",
                "border-t",
                "border-smooth-border",
                "pt-8",
                className,
            )}
        >
            <Typography
                as="h2"
                size="xs"
                className={cn(
                    "mb-5",
                    "font-mono",
                    "uppercase",
                    "tracking-wider",
                    "text-neutral-500",
                )}
            >
                Comments
            </Typography>

            <div ref={containerRef} className="giscus" />
        </section>
    );
}
