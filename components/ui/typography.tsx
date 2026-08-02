import { cn, cva } from "@/utils";
import type { VariantProps } from "@/utils";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const typographyVariants = cva("", {
    variants: {
        weight: {
            thin: "font-thin",
            extralight: "font-extralight",
            light: "font-light",
            default: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
            black: "font-black",
        },
        size: {
            xxs: "text-xxs",
            xs: "text-xs",
            sm: "text-sm",
            default: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            xxl: "text-2xl",
        },
    },
});

type TypographyProps<T extends ElementType> = Readonly<
    VariantProps<typeof typographyVariants> & {
        as?: T;
        children: ReactNode;
        className?: string;
    }
> &
    ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
    as,
    children,
    weight = "default",
    size = "default",
    className,
    ...props
}: TypographyProps<T>) {
    const Component: ElementType = as ?? "p";

    return (
        <Component
            {...props}
            className={cn(
                typographyVariants({
                    weight,
                    size,
                }),
                className,
            )}
        >
            {children}
        </Component>
    );
}
