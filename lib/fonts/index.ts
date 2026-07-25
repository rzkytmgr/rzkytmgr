import {
    IBM_Plex_Sans,
    Inter,
    JetBrains_Mono,
    Montserrat,
    Plus_Jakarta_Sans,
} from "next/font/google";

export const sansJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta-sans",
});

export const monoJetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "400", "500", "600", "700", "800"],
    variable: "--font-jetbrains-mono",
});

export const sansInter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sans-inter",
});

export const sansMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sans-inter",
});

export const sansIBMPlex = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "400", "500", "600", "700"],
    variable: "--font-sans-inter",
});
