export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  type: "deep" | "supporting" | "ai" | "app" | "website";
  protected?: boolean;
  image?: string;
  cardImageLight?: string;
  cardImageDark?: string;
  liveUrl?: string;
  repoUrl?: string;
  npmUrl?: string;
  caseStudyUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Article {
  title: string;
  date: string;
  categories: string[];
  summary: string;
  url: string;
}
