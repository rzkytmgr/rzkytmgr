# Contributing to rzkytmgr

Thank you for considering contributing to this project. This is a personal
website that has been made open source, so a few ground rules apply.

All content — writeups, showcases, explorations, and laboratory entries — is
written solely by the owner. The only content-related contributions that are
welcome are corrections of typos or factual/writing errors in existing
articles.

Code and documentation improvements are very welcome. Please take a moment to
read this guide so your contribution fits the conventions of the repository
and passes the automated checks.

## Ways to contribute

- **Code** — bug fixes and improvements to the site itself
- **Documentation** — fixes to this guide, PROJECT.md, or issue/PR
  descriptions
- **Content fixes** — corrections of typos or writing errors in existing
  articles under `contents/`. Please do not add new content; articles are
  written solely by the owner

For bug reports and feature requests, please use the issue templates provided
in `.github/ISSUE_TEMPLATE/`.

## Getting started

### Prerequisites

- **Node.js 24+** — pinned in `.nvmrc` (`nvm use`)
- **pnpm 10** — the exact version is pinned in the `packageManager` field of
  `package.json` (`pnpm@10.32.1`)

### Setup

```bash
git clone <repository-url>
cd <repository>
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321`.

### Useful scripts

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

## Code style and quality gates

The repository enforces a single pipeline both locally and in CI:

| Gate       | Tool          | Hook / CI                     |
| ---------- | ------------- | ----------------------------- |
| Formatting | Prettier      | pre-commit (staged files), CI |
| Linting    | ESLint        | pre-commit (staged files), CI |
| Types      | `astro check` | pre-commit, CI                |
| Tests      | Vitest        | pre-commit, CI                |
| Build      | `astro build` | CI                            |

Husky hooks run automatically on every commit:

- **pre-commit** — `lint-staged` runs `prettier --write` and `eslint --fix`
  on staged files only, then `pnpm typecheck` and `pnpm test`
- **commit-msg** — validates the commit message with commitlint

## Commit conventions

Commit messages must follow the format:

```text
type(scope): subject
```

Where `type` is one of:

| Type       | When to use                           |
| ---------- | ------------------------------------- |
| `feat`     | A new feature                         |
| `fix`      | A bug fix                             |
| `chore`    | Maintenance tasks                     |
| `refactor` | Code changes without behavior changes |
| `ci`       | CI or tooling changes                 |
| `docs`     | Documentation changes                 |
| `style`    | Formatting, whitespace, or styling    |
| `test`     | Test additions or changes             |
| `perf`     | Performance improvements              |
| `build`    | Build system or dependency changes    |
| `revert`   | Reverting a previous change           |

Rules:

- `scope` is **required** and must be lowercase — use the affected area, e.g.
  `navbar`, `markdown`, `deps`
- `subject` is a short imperative summary, e.g. "add dark mode toggle"
- The message is validated by commitlint; invalid messages are rejected

Examples:

```text
feat(navbar): add dark mode toggle
fix(markdown): render nested blockquotes correctly
docs(project): fix a typo
chore(deps): bump astro to 7.4.0
```

## Branching and pull requests

1. Create a branch from `main`, e.g. `feat/<short-description>`
2. Make your changes and commit with a valid commit message
3. Push the branch and open a pull request
4. The CI workflow runs `format:check`, `lint`, `typecheck`, `test`, and
   `build` — all must pass
5. Keep the PR focused on a single change and describe what and why

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE).
