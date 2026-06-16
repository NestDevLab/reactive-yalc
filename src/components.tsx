import type {
  ActionLink,
  CampaignLandingContent,
  LocaleOption,
  MarketingLandingContent,
} from './types';

const linkTargetProps = (action: ActionLink) =>
  action.external
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

function ActionAnchor({
  action,
  className,
}: {
  action: ActionLink;
  className: string;
}) {
  return (
    <a className={className} href={action.href} {...linkTargetProps(action)}>
      <span>{action.label}</span>
    </a>
  );
}

export function LocaleSwitcher({ options }: { options: LocaleOption[] }) {
  return (
    <nav className="ryl-locale-switcher" aria-label="Language">
      {options.map((option) => (
        <a
          aria-current={option.active ? 'page' : undefined}
          className="ryl-locale-link"
          href={option.href}
          key={option.code}
        >
          {option.label}
        </a>
      ))}
    </nav>
  );
}

export function SiteHeader({
  brandName,
  logoAlt,
  logoSrc,
  localeOptions,
}: {
  brandName: string;
  logoAlt: string;
  logoSrc: string;
  localeOptions: LocaleOption[];
}) {
  return (
    <header className="ryl-site-header">
      <a className="ryl-logo-link" href="/" aria-label={brandName}>
        <img className="ryl-logo" src={logoSrc} alt={logoAlt} />
      </a>
      <LocaleSwitcher options={localeOptions} />
    </header>
  );
}

export function MarketingLanding({ content }: { content: MarketingLandingContent }) {
  return (
    <main className="ryl-shell">
      <SiteHeader
        brandName={content.brandName}
        logoAlt={content.logoAlt}
        logoSrc={content.logoSrc}
        localeOptions={content.localeOptions}
      />

      <section className="ryl-hero ryl-hero-marketing">
        <div className="ryl-hero-copy">
          <p className="ryl-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="ryl-lede">{content.description}</p>
          <div className="ryl-action-row">
            <ActionAnchor action={content.primaryAction} className="ryl-button ryl-button-primary" />
            {content.secondaryAction ? (
              <ActionAnchor action={content.secondaryAction} className="ryl-button ryl-button-secondary" />
            ) : null}
          </div>
        </div>
        <figure className="ryl-hero-media">
          <img src={content.heroImage.src} alt={content.heroImage.alt} />
        </figure>
      </section>

      <section className="ryl-feature-grid" aria-label="Highlights">
        {content.features.map((feature) => (
          <article className="ryl-feature" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      {content.footer ? <footer className="ryl-footer">{content.footer}</footer> : null}
    </main>
  );
}

export function CampaignLanding({ content }: { content: CampaignLandingContent }) {
  return (
    <main className="ryl-shell">
      <SiteHeader
        brandName={content.brandName}
        logoAlt={content.logoAlt}
        logoSrc={content.logoSrc}
        localeOptions={content.localeOptions}
      />

      <section className="ryl-hero ryl-hero-campaign">
        <div className="ryl-hero-copy">
          <p className="ryl-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="ryl-lede">{content.description}</p>
        </div>
        <figure className="ryl-hero-media">
          <img src={content.heroImage.src} alt={content.heroImage.alt} />
        </figure>
      </section>

      <section className="ryl-action-grid" aria-label="Campaign actions">
        {content.actions.map((action) => (
          <a className="ryl-action-card" href={action.href} key={action.id} {...linkTargetProps(action)}>
            <span className="ryl-action-title">{action.label}</span>
            <span className="ryl-action-description">{action.description}</span>
          </a>
        ))}
      </section>

      <section className="ryl-reward-panel" aria-label={content.reward.title}>
        <div>
          <p className="ryl-eyebrow">Reward</p>
          <h2>{content.reward.title}</h2>
          <p>{content.reward.description}</p>
          {content.reward.helperText ? <p className="ryl-helper">{content.reward.helperText}</p> : null}
        </div>
        <ActionAnchor action={content.reward.action} className="ryl-button ryl-button-primary" />
      </section>

      {content.backLink ? (
        <p className="ryl-back-row">
          <a href={content.backLink.href}>{content.backLink.label}</a>
        </p>
      ) : null}
    </main>
  );
}
