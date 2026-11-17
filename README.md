# Reactive YALC

Generic, brandable React components shared across apps: layout, actions, i18n presentation,
campaign and marketing surfaces, and the app building blocks (counters, forms, ...) that more
than one app needs.

Apps sit on top of this package: they provide brand tokens, content, locale routing, images and
business rules. This package never contains tenant-specific copy, URLs, assets or rules.

## Install

```bash
npm install @reactive-yalc/ui react
```

```tsx
import { SiteHeader } from '@reactive-yalc/ui';
import '@reactive-yalc/ui/styles.css';
```

## Boundaries

- Put reusable components here, abstracted and generalized as much as possible.
- Keep tenant and business configuration in the consuming app.
- Style through CSS custom properties (`--ryl-*`) so each brand can map its own palette.

## Development

```bash
npm ci
npm run ci:checks   # typecheck, build to dist/, npm pack --dry-run
npm run changeset   # describe a user-visible change
```

Releases use Changesets through `.github/workflows/npm-publish.yml`. A push to `main` with
pending changesets creates or updates the version PR. Merging that PR publishes package versions
that are missing from npm, pushes their Git tags, and creates GitHub releases from the changelog.
Already published versions are skipped.

Publishing uses npm trusted publishing (OIDC) with provenance from the GitHub-hosted runner in
the `npm` environment. The npm Trusted Publisher must match this repository, the workflow filename
`npm-publish.yml`, and the `npm` environment. Node 24 supplies npm >= 11.5.1, which the workflow
checks before running Changesets.

Pull requests and manual workflow runs with `publish: false` validate the package. A manual run
with `publish: true` on `main` runs the same version-or-publish process as a push to `main`.

## License

AGPL-3.0-only.
