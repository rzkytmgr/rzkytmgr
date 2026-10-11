export const SITE_THEMES = ["clean-light", "charcoal"] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];
