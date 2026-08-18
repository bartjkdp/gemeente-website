export type NewsItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export async function getNewsItems(fallback: NewsItem[] = []): Promise<NewsItem[]> {
  return fallback;
}
