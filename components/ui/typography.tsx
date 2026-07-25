import { cn, cva, VariantProps } from "@/utils";
import { ComponentPropsWithoutRef, ElementType } from "react";

const tvariants = cva([], {
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

type TypographyProps<T extends ElementType> = VariantProps<typeof tvariants> & {
    as?: T;
    className?: string;
    children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends ElementType = "p">({
    as,
    children,
    weight = "default",
    size = "default",
    className,
    ...props
}: TypographyProps<T>) {
    const Component = as || "p";
    return (
        <Component
            {...props}
            className={cn(
                tvariants({
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
