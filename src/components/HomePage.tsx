import {
  Card,
  Grid,
  Heading,
  Image,
  Overlap,
  Paragraph,
  SearchField,
  StandaloneLink,
} from '@amsterdam/design-system-react';
import { getProductSlug } from '../lib/openProduct';
import type { OpenProductProductType } from '../lib/openProduct';
import SiteLayout from './SiteLayout';

type Theme = {
  name: string;
  slug: string;
  producttypes: OpenProductProductType[];
};

type HomePageProps = {
  themes: Theme[];
  newsItems: NewsItem[];
};

type NewsItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type AmsterdamCardProps = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

const cleanMarkdownText = (value?: string) =>
  (value || '')
    .replace(/^#\s+/gm, '')
    .replace(/\\,/g, ',')
    .replace(/\\\./g, '.')
    .trim();

function AmsterdamCard({ description, href, image, title }: AmsterdamCardProps) {
  return (
    <Card>
      {image && <Card.Image alt="" src={image} />}
      <Card.Heading level={3}>
        <Card.Link href={href}>{title}</Card.Link>
      </Card.Heading>
      <Paragraph>{description}</Paragraph>
    </Card>
  );
}

export default function HomePage({ newsItems, themes }: HomePageProps) {
  const products = themes.flatMap((theme) => theme.producttypes.map((producttype) => ({ producttype, theme })));
  const topProducts = products.slice(0, 2);

  return (
    <SiteLayout>
      <main id="inhoud">
        <h1 className="ams-visually-hidden">Homepage van de gemeente Amsterdam</h1>
        <Overlap>
          <Image
            alt=""
            aspectRatio="16:5"
            sizes="(max-width: 37.5rem) 640px, (max-width: 72.5rem) 1280px, 1440px"
            src="/images/jordaan-centrum-mei-2025.jpg"
          />
          <Grid style={{ alignSelf: 'center' }}>
            <Grid.Cell span={{ narrow: 4, medium: 6, wide: 8 }} start={{ narrow: 1, medium: 2, wide: 3 }}>
              <SearchField onSubmit={(event) => event.preventDefault()}>
                <SearchField.Input label="Zoeken" name="zoek" placeholder="Wat kunnen we voor u vinden?" />
                <SearchField.Button />
              </SearchField>
            </Grid.Cell>
          </Grid>
        </Overlap>

        <Grid gapVertical="large" paddingVertical="x-large">
          <Grid.Cell span="all">
            <Heading level={2} size="level-1">
              Direct naar
            </Heading>
          </Grid.Cell>
          {topProducts.map(({ producttype, theme }) => (
            <Grid.Cell key={`${theme.slug}-${producttype.naam}`} span={{ narrow: 4, medium: 4, wide: 6 }}>
              <AmsterdamCard
                description={cleanMarkdownText(producttype.samenvatting).slice(0, 160)}
                href={`/${theme.slug}/${getProductSlug(producttype)}`}
                title={producttype.naam}
              />
            </Grid.Cell>
          ))}
          <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
            <StandaloneLink href="/alle-onderwerpen">Naar alle onderwerpen</StandaloneLink>
          </Grid.Cell>
        </Grid>

        <Grid gapVertical="large" paddingVertical="x-large">
          <Grid.Cell span="all">
            <Heading level={2} size="level-1">
              Nieuws
            </Heading>
          </Grid.Cell>
          {newsItems.map((item) => (
            <Grid.Cell key={item.title} span={{ narrow: 4, medium: 4, wide: 4 }}>
              <AmsterdamCard description={item.description} href={item.href} image={item.image} title={item.title} />
            </Grid.Cell>
          ))}
        </Grid>
      </main>
    </SiteLayout>
  );
}
