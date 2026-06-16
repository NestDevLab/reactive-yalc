export type LocaleOption = {
  code: string;
  label: string;
  href: string;
  active: boolean;
};

export type ActionLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

export type LandingFeature = {
  title: string;
  description: string;
};

export type RewardContent = {
  title: string;
  description: string;
  action: ActionLink;
  helperText?: string;
};

export type MarketingLandingContent = {
  brandName: string;
  logoSrc: string;
  logoAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: ActionLink;
  secondaryAction?: ActionLink;
  heroImage: {
    src: string;
    alt: string;
  };
  features: LandingFeature[];
  localeOptions: LocaleOption[];
  footer?: string;
};

export type CampaignLandingContent = {
  brandName: string;
  logoSrc: string;
  logoAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: {
    src: string;
    alt: string;
  };
  actions: ActionLink[];
  reward: RewardContent;
  localeOptions: LocaleOption[];
  backLink?: ActionLink;
};
