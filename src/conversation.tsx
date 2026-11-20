import type { HTMLAttributes, ReactNode } from 'react';

export type ConversationSurfaceProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Accessible name for the complete conversation panel. */
  label: string;
  /** Accessible name for the keyboard-scrollable transcript. */
  transcriptLabel: string;
  header: ReactNode;
  children: ReactNode;
  composer?: ReactNode;
  actions?: ReactNode;
  status?: ReactNode;
  keyboard?: ReactNode;
  busy?: boolean;
};

/** Presentation only: the application owns input, announcements and scroll position. */
export function ConversationSurface({
  label,
  transcriptLabel,
  header,
  children,
  composer,
  actions,
  status,
  keyboard,
  busy = false,
  className,
  ...props
}: ConversationSurfaceProps) {
  return (
    <section {...props} aria-label={label} className={['ryl-conversation', className].filter(Boolean).join(' ')}>
      <header className="ryl-conversation-header">{header}</header>
      <div
        className="ryl-conversation-transcript"
        role="region"
        aria-label={transcriptLabel}
        aria-busy={busy}
        tabIndex={0}
      >
        {children}
      </div>
      {status != null ? <div className="ryl-conversation-status">{status}</div> : null}
      {actions != null ? <div className="ryl-conversation-actions">{actions}</div> : null}
      {composer != null ? <div className="ryl-conversation-composer">{composer}</div> : null}
      {keyboard != null ? <div className="ryl-conversation-keyboard">{keyboard}</div> : null}
    </section>
  );
}

export type ConversationMessageProps = HTMLAttributes<HTMLElement> & {
  alignment?: 'start' | 'end';
  metadata?: ReactNode;
  actions?: ReactNode;
};

export function ConversationMessage({
  alignment = 'start',
  metadata,
  actions,
  children,
  className,
  ...props
}: ConversationMessageProps) {
  return (
    <article
      {...props}
      className={['ryl-conversation-message', className].filter(Boolean).join(' ')}
      data-alignment={alignment}
    >
      {metadata != null ? <div className="ryl-conversation-message-metadata">{metadata}</div> : null}
      <div className="ryl-conversation-message-content">{children}</div>
      {actions != null ? <div className="ryl-conversation-message-actions">{actions}</div> : null}
    </article>
  );
}
