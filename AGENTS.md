# Reactive YALC — AI Agent Guide

- Scope: React component library published as `@reactive-yalc/ui`. Write everything in English.
- Keep components generic and brandable: no tenant copy, URLs, assets or business rules; style
  through `--ryl-*` CSS custom properties.
- One intent per pull request from a feature branch based on `main`; never push `main` directly.
- Before handing off: `npm run ci:checks` must pass on the current head, and user-visible changes
  carry a changeset (`npm run changeset`).
- Every pull request needs an independent approving review after the latest push; the author
  cannot satisfy it. Resolve every review conversation before merging.
- This is a public repository: no customer names, hosts, ticket numbers or local paths in code,
  pull requests or commits.
- A push to `main` runs Changesets in `npm-publish.yml`: pending changesets update the version PR;
  merging that PR publishes unpublished versions through npm OIDC with provenance, tags and GitHub
  releases. Manual runs with `publish: true` use the same process on `main`.
