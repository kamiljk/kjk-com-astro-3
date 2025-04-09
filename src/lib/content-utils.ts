// 📄 File: src/lib/content-utils.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  type: string;
  scale?: string;
  maturity?: string;
  status?: string;
  last_tended?: string;
  tags?: string[];
  content: string;
};

const contentDir = path.resolve('./src/content');

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(contentDir);

  return files
    .filter((f: string) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((filename: string) => {
      const raw = fs.readFileSync(path.join(contentDir, filename), 'utf-8');
      const { data, content } = matter(raw);

      return {
        slug: filename.replace(/\.mdx?$/, ''),
        content,
        ...data,
      } as Post;
    });
}