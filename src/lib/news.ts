export type NewsItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type PayloadNewsResponse = {
  docs: Array<{
    title?: string;
    description?: string;
    image?: string | { url?: string; filename?: string };
    href?: string;
  }>;
};

const payloadApiUrl = import.meta.env.PAYLOAD_API_URL || 'http://localhost:3001/api';

const getImageUrl = (image: string | { url?: string; filename?: string } | undefined) => {
  if (!image) {
    return '';
  }

  if (typeof image === 'string') {
    return image;
  }

  if (image.url) {
    return image.url.startsWith('http') ? image.url : `${payloadApiUrl.replace(/\/api$/, '')}${image.url}`;
  }

  return image.filename ? `/uploads/${image.filename}` : '';
};

export async function getNewsItems(fallback: NewsItem[] = []): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${payloadApiUrl}/news?depth=1&limit=12&sort=-publishedAt`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return fallback;
    }

    const news = (await response.json()) as PayloadNewsResponse;

    if (!news.docs.length) {
      return fallback;
    }

    return news.docs
      .map((item) => ({
        description: item.description || '',
        href: item.href || '#',
        image: getImageUrl(item.image),
        title: item.title || '',
      }))
      .filter((item) => item.title && item.description && item.image && item.href);
  } catch (error) {
    console.warn('Payload nieuws ophalen mislukt, mockdata wordt gebruikt.', error);
    return fallback;
  }
}
