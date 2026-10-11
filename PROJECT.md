# 🧪 rzkytmgr

A personal website and portfolio built with Astro — home to long-form
engineering writeups, selected projects, explorations, and laboratory
experiments.

> This repository intentionally does not use `README.md`. Because the repo is
> named `rzkytmgr/rzkytmgr`, a `README.md` at the root would render on the
> GitHub profile instead of on the repository. This file is the project's
> documentation.

## Features

- **MDX content pipeline** — unified/remark/rehype with Shiki syntax
  highlighting, GitHub-style alerts, code block labels, and copy buttons
- **Article experience** — table of contents and adjacent article pager
- **Comments** — Giscus integration on every article
- **Theme** — dark/light mode with a hand-tuned theme registry
- **SEO** — RSS feed, sitemap, and robots.txt
- **Writeups archive** — articles grouped by year
- **Quality gates** — Husky hooks (lint-staged, typecheck, tests) and a GitHub
  Actions CI pipeline

## Tech stack

| Layer     | Technology                                                     |
| --------- | -------------------------------------------------------------- |
| Framework | Astro 7 (static output)                                        |
| UI        | Astro components, TypeScript, Tailwind CSS v4                  |
| Content   | MDX + unified/remark/rehype, Shiki                             |
| Comments  | Giscus                                                         |
| Tooling   | pnpm, Husky, lint-staged, commitlint, ESLint, Prettier, Vitest |

## Getting started

### Prerequisites

- **Node.js 24+** — pinned in `.nvmrc` (`nvm use`)
- **pnpm 10** — the exact version is pinned in the `packageManager` field of
  `package.json`

### Setup

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321`.

### Scripts

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Start the development server             |
| `pnpm build`        | Production build                         |
| `pnpm preview`      | Serve the production build               |
| `pnpm lint`         | Run ESLint                               |
| `pnpm format`       | Format all files with Prettier           |
| `pnpm format:check` | Verify formatting without changing files |
| `pnpm typecheck`    | Type-check the project                   |
| `pnpm test`         | Run the Vitest test suite                |

## Project structure

```text
src/          Pages, layouts, components, scripts, and styles
contents/     All site content as MDX files with frontmatter
tests/        Vitest test files
public/       Static assets
```

## Content

All site content lives under `contents/` as MDX files with YAML frontmatter,
split into four collections:

| Collection     | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| `writeups/`    | Long-form engineering articles (nested by year/month) |
| `showcase/`    | Selected projects and their writeups                  |
| `exploration/` | Links and notes worth exploring                       |
| `laboratory/`  | Experiments and small projects                        |

The content is written solely by the owner. See
[CONTRIBUTING.md](CONTRIBUTING.md) for what contributions are welcome.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions, quality gates,
and commit rules. Bug reports and feature requests use the issue templates in
`.github/ISSUE_TEMPLATE/`.

## Security

To report a vulnerability, please follow the process described in
[SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 Rizky Aulia Tumangger
