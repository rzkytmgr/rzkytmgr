import {
    IBM_Plex_Sans,
    IBM_Plex_Serif,
    JetBrains_Mono,
    Montserrat,
} from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-montserrat",
    display: "swap",
});

export const sans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sans",
    display: "swap",
});

export const serif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-serif",
    display: "swap",
});

export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-mono",
    display: "swap",
});
