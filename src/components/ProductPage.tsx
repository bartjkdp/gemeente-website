import {
  Breadcrumb,
  CallToActionLink,
  Grid,
  Heading,
  Link,
  OrderedList,
  Paragraph,
  UnorderedList,
} from '@amsterdam/design-system-react';
import { getThemeSlug } from '../lib/openProduct';
import type { OpenProductProductType } from '../lib/openProduct';
import SiteLayout from './SiteLayout';

type ProductPageProps = {
  producttype: OpenProductProductType;
};

const cleanMarkdownText = (value?: string) =>
  (value || '')
    .replace(/^#\s+/gm, '')
    .replace(/\\,/g, ',')
    .replace(/\\\./g, '.')
    .trim();

const formatCurrency = (value: string) =>
  new Intl.NumberFormat('nl-NL', { currency: 'EUR', style: 'currency' }).format(Number(value));

export default function ProductPage({ producttype }: ProductPageProps) {
  const summary = cleanMarkdownText(producttype.samenvatting);
  const themeNames = producttype.themas?.map((theme) => theme.naam).filter(Boolean) || [];
  const firstContact = producttype.contacten?.[0];
  const firstLocation = producttype.locaties?.[0];

  return (
    <SiteLayout>
      <Grid paddingTop="large">
        <Grid.Cell span={{ narrow: 4, medium: 7, wide: 9 }} start={{ narrow: 1, medium: 1, wide: 2 }}>
          <Breadcrumb>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
            {producttype.themas?.[0]?.naam ? (
              <Breadcrumb.Link href={`/${getThemeSlug(producttype)}`}>{producttype.themas[0].naam}</Breadcrumb.Link>
            ) : null}
            <Breadcrumb.Link href="#">{producttype.naam}</Breadcrumb.Link>
          </Breadcrumb>
        </Grid.Cell>
      </Grid>

      <Grid as="main" id="inhoud" paddingBottom="x-large">
        <Grid.Cell span={{ narrow: 4, medium: 7, wide: 9 }} start={{ narrow: 1, medium: 1, wide: 2 }}>
          <Heading className="ams-mb-xl" level={1}>
            {producttype.naam}
          </Heading>
          <Paragraph size="large">{summary}</Paragraph>
        </Grid.Cell>

        <Grid.Cell span={{ narrow: 4, medium: 6, wide: 7 }} start={{ narrow: 1, medium: 2, wide: 3 }}>
          <Heading className="ams-mb-s" level={2}>
            Productinformatie
          </Heading>
          <UnorderedList className="ams-mb-xl">
            {producttype.code ? <UnorderedList.Item>Productcode: {producttype.code}</UnorderedList.Item> : null}
            {producttype.uniforme_product_naam ? (
              <UnorderedList.Item>Uniforme productnaam: {producttype.uniforme_product_naam}</UnorderedList.Item>
            ) : null}
            {themeNames.length > 0 ? <UnorderedList.Item>Thema: {themeNames.join(', ')}</UnorderedList.Item> : null}
            {producttype.keywords?.length ? (
              <UnorderedList.Item>Zoekwoorden: {producttype.keywords.join(', ')}</UnorderedList.Item>
            ) : null}
            {producttype.parameters?.map((parameter) => (
              <UnorderedList.Item key={parameter.naam}>
                {parameter.naam}: {parameter.waarde}
              </UnorderedList.Item>
            ))}
          </UnorderedList>

          <Heading className="ams-mb-s" level={2}>
            Aanvragen
          </Heading>
          {producttype.acties?.length ? (
            <>
              <Paragraph className="ams-mb-m">Voor dit product zijn de volgende acties beschikbaar.</Paragraph>
              <OrderedList className="ams-mb-xl">
                {producttype.acties.map((actie) => (
                  <OrderedList.Item key={actie.naam}>{actie.naam}</OrderedList.Item>
                ))}
              </OrderedList>
              <CallToActionLink className="ams-mb-xl" href={producttype.acties[0].url || '#'}>
                {producttype.acties[0].naam}
              </CallToActionLink>
            </>
          ) : (
            <Paragraph className="ams-mb-xl">Neem contact op met de gemeente om dit product aan te vragen.</Paragraph>
          )}

          <Heading className="ams-mb-s" level={2}>
            Kosten
          </Heading>
          {producttype.prijzen?.length ? (
            <UnorderedList className="ams-mb-xl">
              {producttype.prijzen.flatMap((prijs) => [
                ...(prijs.prijsopties || []).map((optie) => (
                  <UnorderedList.Item key={`${prijs.actief_vanaf}-${optie.beschrijving}-${optie.bedrag}`}>
                    {optie.beschrijving || 'Prijs'}: {formatCurrency(optie.bedrag)}
                  </UnorderedList.Item>
                )),
                ...(prijs.prijsregels || []).map((regel) => (
                  <UnorderedList.Item key={`${prijs.actief_vanaf}-${regel.url}`}>
                    {regel.beschrijving || 'Prijs wordt berekend met een regel'}
                  </UnorderedList.Item>
                )),
              ])}
            </UnorderedList>
          ) : (
            <Paragraph className="ams-mb-xl">Er zijn geen kosten bekend.</Paragraph>
          )}

          <Heading className="ams-mb-s" level={2}>
            Meer informatie
          </Heading>
          {producttype.links?.length ? (
            <UnorderedList className="ams-mb-xl">
              {producttype.links.map((link) => (
                <UnorderedList.Item key={link.url || link.naam}>
                  <Link href={link.url || '#'}>{link.naam}</Link>
                </UnorderedList.Item>
              ))}
            </UnorderedList>
          ) : (
            <Paragraph className="ams-mb-xl">Er zijn geen extra links beschikbaar.</Paragraph>
          )}

          <Heading className="ams-mb-s" level={2}>
            Contact
          </Heading>
          {firstContact ? (
            <Paragraph className="ams-mb-xl">
              {firstContact.naam}
              {firstContact.rol ? ` (${firstContact.rol})` : ''}
              {firstContact.email ? (
                <>
                  , <Link href={`mailto:${firstContact.email}`}>{firstContact.email}</Link>
                </>
              ) : null}
              {firstContact.telefoonnummer ? `, ${firstContact.telefoonnummer}` : ''}.
            </Paragraph>
          ) : (
            <Paragraph className="ams-mb-xl">Bel 14 020 voor vragen over dit product.</Paragraph>
          )}

          {firstLocation ? (
            <>
              <Heading className="ams-mb-s" level={2}>
                Locatie
              </Heading>
              <Paragraph>
                {firstLocation.naam}, {firstLocation.straat} {firstLocation.huisnummer}, {firstLocation.postcode}{' '}
                {firstLocation.stad}
              </Paragraph>
            </>
          ) : null}
        </Grid.Cell>
      </Grid>
    </SiteLayout>
  );
}
