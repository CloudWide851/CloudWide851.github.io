export interface BlogFrontMatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  author?: string;
  cover?: string;
  series?: string; // Optional: can be defined in frontmatter
}

export interface BlogPost {
  slug: string;
  series?: string; // Derived from folder or frontmatter
  frontMatter: BlogFrontMatter;
  content: string;
}
