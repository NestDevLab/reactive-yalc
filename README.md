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

Releases use changesets: merging to `main` opens a version PR, and a GitHub release (or a manual
publish workflow run) publishes to npm with provenance.

## License

AGPL-3.0-only.
