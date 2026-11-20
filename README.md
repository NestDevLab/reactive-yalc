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

## Conversation surfaces

`ConversationSurface` provides a rounded panel with a fixed header, keyboard-scrollable
transcript and optional status, actions, composer and keyboard slots. `ConversationMessage`
provides optional metadata and actions with logical `start` / `end` alignment for RTL support.
Both accept standard HTML attributes, including `dir`, `style` and event handlers.

```tsx
import { ConversationMessage, ConversationSurface } from '@reactive-yalc/ui';
import '@reactive-yalc/ui/styles.css';

<ConversationSurface
  label="Assistant"
  transcriptLabel="Conversation history"
  header={<h1>How can we help?</h1>}
  status={<span role="status">Ready</span>}
  composer={
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Your message</label>
      <input id="message" name="message" />
      <button type="submit">Send</button>
    </form>
  }
  actions={suggestedActions}
  keyboard={virtualKeyboard}
>
  <ConversationMessage metadata="Assistant">Welcome.</ConversationMessage>
  <ConversationMessage metadata="You" alignment="end">Hello.</ConversationMessage>
</ConversationSurface>
```

All visible content is application-owned. The application supplies message identity/keys,
input state, submission, disabled controls, product actions, keyboard behavior and focus,
scroll position and a concise live region. The transcript is deliberately a named region,
not an automatic live log: streaming updates and rich interactive content should not cause
repeated announcements of the whole history. Set `busy` while transcript content is updating;
announce a useful final update through the status slot. No automatic scrolling or focus
movement is performed.

The default height is `min(48rem, 100dvh)`. Set `--ryl-conversation-height` to suit a viewport
or a bounded flex/grid parent. Large custom keyboard/composer slots must leave usable space
for the transcript; applications own responsive keyboard sizing and safe-area insets.

Brand through existing `--ryl-surface`, `--ryl-text`, `--ryl-border`, `--ryl-muted` and
`--ryl-focus` tokens, plus these optional overrides:

| Tokens | Purpose |
| --- | --- |
| `--ryl-conversation-width`, `--ryl-conversation-height` | Panel bounds |
| `--ryl-conversation-radius`, `--ryl-conversation-padding`, `--ryl-conversation-gap` | Panel shape and spacing |
| `--ryl-conversation-background`, `--ryl-font-family` | Transcript and typography |
| `--ryl-message-width`, `--ryl-message-radius`, `--ryl-message-padding` | Message bounds and spacing |
| `--ryl-message-background`, `--ryl-message-text` | Start-aligned messages |
| `--ryl-message-end-background`, `--ryl-message-end-text` | End-aligned messages |

## Boundaries

- Put reusable components here, abstracted and generalized as much as possible.
- Keep tenant and business configuration in the consuming app.
- Style through CSS custom properties (`--ryl-*`) so each brand can map its own palette.

## Development

```bash
npm ci
npm run ci:checks   # typecheck, build, component contract tests, npm pack --dry-run
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
