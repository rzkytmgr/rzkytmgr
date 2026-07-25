import type { NavbarItemType, SocialType } from "@/types/global";
import { cn } from "@/utils";
import Link from "next/link";
import { Typography } from "../ui/typography";

type FooterProps = {
    value: {
        title: string;
        social: SocialType[];
        static: {
            description: string;
            copyright: string;
        };
        items: NavbarItemType[];
    };
};

export function Footer({ value }: FooterProps) {
    return (
        <>
            <hr className="border-smooth-border/70" />
            <footer className="max-w-6xl w-full m-auto px-6 pt-16 space-y-16">
                <section className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-12">
                    <div className="flex-inline flex-col">
                        <Link
                            href={"#"}
                            className={cn(
                                "font-sans text-sm font-bold tracking-tight",
                                "hover:text-journal-accent transition-colors",
                            )}
                            aria-label="Home"
                        >
                            {value.title}
                        </Link>

                        <Typography
                            as="p"
                            size="sm"
                            className="text-gray-500 mt-3 max-w-xs"
                        >
                            {value.static.description}
                        </Typography>
                    </div>
                    <div className="space-y-4">
                        <Typography
                            as="h4"
                            size="xs"
                            className="uppercase font-mono text-neutral-500"
                        >
                            Navigate
                        </Typography>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {value.items.map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <Typography
                            as="h4"
                            size="xs"
                            className="uppercase font-mono text-neutral-500"
                        >
                            Elsewhere
                        </Typography>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {value.social.map(({ name, href }) => (
                                <li key={name}>
                                    <Link href={href}>{name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="border-t border-smooth-border/70 font-mono text-xs py-8 text-neutral-500 text-center lg:text-left">
                    <Typography as="span" size="xs">
                        © {new Date().getFullYear()} {value.static.copyright}
                    </Typography>
                </section>
            </footer>
        </>
    );
}
