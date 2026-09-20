"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ComponentProps } from "react";

export const SITE_THEMES = [
    "clean-light",
    "kindle",
    "charcoal",
    "reader",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

type ThemeProviderProps = Omit<
    ComponentProps<typeof NextThemeProvider>,
    "themes" | "defaultTheme" | "attribute"
>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemeProvider
            themes={[...SITE_THEMES]}
            defaultTheme="clean-light"
            attribute="data-theme"
            {...props}
        >
            {children}
        </NextThemeProvider>
    );
}
