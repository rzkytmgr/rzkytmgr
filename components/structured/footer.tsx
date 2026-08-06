import Link from "next/link";
import type { NavbarItemType, SocialType } from "@/types/global";
import { cn } from "@/utils";
import { Typography } from "../ui/typography";

type FooterProps = Readonly<{
    value: {
        title: string;
        social: SocialType[];
        static: {
            description: string;
            copyright: string;
        };
        items: NavbarItemType[];
    };
}>;

export function Footer({ value }: FooterProps) {
    return (
        <>
            <hr className={cn("border-smooth-border/70")} />

            <footer
                className={cn(
                    "mx-auto",
                    "w-full",
                    "max-w-6xl",
                    "space-y-16",
                    "px-6",
                    "pt-16",
                )}
            >
                <section
                    className={cn(
                        "grid",
                        "grid-cols-1",
                        "gap-12",
                        "md:grid-cols-[3fr_1fr_1fr]",
                    )}
                >
                    <div className={cn("flex", "flex-col")}>
                        <Link
                            href="/"
                            className={cn(
                                "font-sans",
                                "text-sm",
                                "font-bold",
                                "tracking-tight",
                                "transition-colors",
                                "hover:text-journal-accent",
                                "focus-visible:text-journal-accent",
                            )}
                        >
                            {value.title}
                        </Link>

                        <Typography
                            as="p"
                            size="sm"
                            className={cn(
                                "mt-3",
                                "max-w-xs",
                                "text-gray-500",
                                "dark:text-neutral-500",
                            )}
                        >
                            {value.static.description}
                        </Typography>
                    </div>

                    <div className={cn("space-y-4")}>
                        <Typography
                            as="h2"
                            size="xs"
                            className={cn(
                                "font-mono",
                                "uppercase",
                                "text-neutral-500",
                            )}
                        >
                            Navigate
                        </Typography>{" "}
                        <ul
                            className={cn(
                                "space-y-3",
                                "text-sm",
                                "text-gray-700",
                                "dark:text-neutral-300",
                            )}
                        >
                            {value.items.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className={cn(
                                            "transition-colors",
                                            "hover:text-journal-accent",
                                            "focus-visible:text-journal-accent",
                                        )}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cn("space-y-4")}>
                        <Typography
                            as="h2"
                            size="xs"
                            className={cn(
                                "font-mono",
                                "uppercase",
                                "text-neutral-500",
                            )}
                        >
                            Elsewhere
                        </Typography>

                        <ul
                            className={cn(
                                "space-y-3",
                                "text-sm",
                                "text-gray-700",
                                "dark:text-neutral-300",
                            )}
                        >
                            {value.social.map(({ name, href }) => (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        className={cn(
                                            "transition-colors",
                                            "hover:text-journal-accent",
                                            "focus-visible:text-journal-accent",
                                        )}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section
                    className={cn(
                        "border-t",
                        "border-smooth-border/70",
                        "py-8",
                        "font-mono",
                        "text-center",
                        "text-xs",
                        "text-neutral-500",
                        "lg:text-left",
                    )}
                >
                    <Typography as="span" size="xs">
                        © {new Date().getFullYear()} {value.static.copyright}
                    </Typography>
                </section>
            </footer>
        </>
    );
}
