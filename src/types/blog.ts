export interface BlogFrontMatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  author?: string;
  cover?: string;
}

export interface BlogPost {
  slug: string;
  frontMatter: BlogFrontMatter;
  content: string;
}
