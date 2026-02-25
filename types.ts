export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StrategyItem {
  title: string;
  description: string;
  features: string[];
  linkText: string;
}

export interface PortfolioItem {
  name: string;
  description: string;
  type: 'Anchor Investor' | 'Investor' | 'Acquisition';
  year: string;
  image?: string; // Optional image URL
}