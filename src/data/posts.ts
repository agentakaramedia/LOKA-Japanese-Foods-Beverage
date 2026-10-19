import data from './posts.json';

export interface Post {
  slug: string;
  /** WordPress publish date (YYYY-MM-DD) used for ordering and the list meta. */
  published: string;
  seoTitle: string;
  description: string;
  title: string;
  /** Event date and place exactly as written on the original post. */
  date: string;
  location: string;
  /** Post body HTML (paragraphs/lists) copied from the original. */
  body: string;
  /** Single featured image, or a gallery of images (one of the two). */
  image?: string;
  gallery?: string[];
  spacersBefore: number;
  spacerAfterTitle: boolean;
}

/** Genuine LOKA news posts, newest first (spam posts injected into the WordPress site are excluded). */
export const posts: Post[] = (data as Post[]).toSorted((a, b) => b.published.localeCompare(a.published));

export const formatPublished = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
