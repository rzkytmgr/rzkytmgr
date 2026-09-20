"use client";

import Image from "next/image";
import type { ComponentProps, ComponentPropsWithRef } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

type ImageProps = Omit<
    ComponentProps<typeof Image>,
    "onLoad" | "onError" | "ref"
>;

type BlurUpImageProps = ImageProps &
    Required<Pick<ComponentPropsWithRef<"img">, "alt">>;

export function BlurUpImage({ className, alt, ...props }: BlurUpImageProps) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
            setLoaded(true);
        }
    }, []);

    return (
        <Image
            {...props}
            ref={imgRef}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className={cn(
                "transition-[filter,opacity,transform]",
                "duration-700",
                "ease-out",
                "motion-reduce:transition-none",
                loaded
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-105 opacity-60 blur-xl",
                className,
            )}
        />
    );
}
