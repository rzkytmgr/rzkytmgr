import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import { configs as astroConfigs } from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
    astroConfigs.recommended,

    {
        files: ["**/*.ts", "**/*.mts"],
        languageOptions: {
            parser: tsParser,
        },
    },

    globalIgnores([".astro/**", "dist/**"]),

    prettier,
]);

export default eslintConfig;
