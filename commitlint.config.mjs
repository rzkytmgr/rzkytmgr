const config = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "chore",
                "refactor",
                "ci",
                "docs",
                "style",
                "test",
                "perf",
                "build",
                "revert",
            ],
        ],
        "scope-empty": [2, "never"],
        "scope-case": [2, "always", "lower-case"],
        "subject-case": [0],
    },
};

export default config;
