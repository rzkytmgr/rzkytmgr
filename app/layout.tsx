import type { Metadata } from "next";
import { config } from "@/lib/config";
import { mono, sans } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/utils/cn";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: config.title,
        template: `%s | ${config.title}`,
    },
    description:
        "A personal portfolio featuring software projects, technical experiments, and engineering write-ups.",
    applicationName: config.title,
    robots: {
        index: true,
        follow: true,
    },
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={cn(mono.variable, sans.variable, "scroll-smooth")}
            suppressHydrationWarning
        >
            <body
                className={cn(
                    "min-h-screen",
                    "overflow-x-hidden",
                    "bg-background",
                    "text-foreground",
                    "font-sans",
                    "antialiased",
                    "transition-colors",
                    "duration-200",
                    "selection:bg-neutral-200",
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
