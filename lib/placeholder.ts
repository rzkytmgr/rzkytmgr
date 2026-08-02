import { Style, Avatar } from "@dicebear/core";
import glass from "@dicebear/styles/glass.json" with { type: "json" };

export function getPlaceholderImage(seed: string, color: string) {
    const style = new Style(glass);
    const avatar = new Avatar(style, {
        seed,
        backgroundColor: `#${color}`,
        size: 100,
    });
    return avatar.toDataUri();
}
