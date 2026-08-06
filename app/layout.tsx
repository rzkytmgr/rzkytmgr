import type { Metadata } from "next";
import { config } from "@/lib/config";
import { mono, sans, serif } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/utils/cn";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(config.url),
    title: {
        default: config.title,
        template: `%s - ${config.author.name}`,
    },
    description: config.description,
    applicationName: config.title,
    icons: {
        icon: "/favicon.ico",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: config.title,
        description: config.description,
        type: "website",
        locale: "en_US",
        siteName: config.title,
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: config.title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: config.title,
        description: config.description,
        images: ["/og.png"],
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
            className={cn(
                mono.variable,
                sans.variable,
                serif.variable,
                "scroll-smooth",
            )}
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
