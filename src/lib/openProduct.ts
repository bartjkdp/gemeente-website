export type OpenProductProductType = {
  naam: string;
  code?: string;
  samenvatting?: string;
  uniforme_product_naam?: string;
  themas?: Array<{ naam: string }>;
  prijzen?: Array<{
    actief_vanaf?: string;
    prijsopties?: Array<{ bedrag: string; beschrijving?: string }>;
    prijsregels?: Array<{ beschrijving?: string; url?: string }>;
  }>;
  links?: Array<{ naam: string; waarde?: string; code?: string; url?: string }>;
  acties?: Array<{ naam: string; waarde?: string; code?: string; url?: string }>;
  contacten?: Array<{ naam: string; email?: string; telefoonnummer?: string; rol?: string }>;
  locaties?: Array<{ naam: string; straat?: string; huisnummer?: string; postcode?: string; stad?: string }>;
  parameters?: Array<{ naam: string; waarde?: string; code?: string; url?: string }>;
  keywords?: string[];
};

type ProductTypeListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: OpenProductProductType[];
};

const openProductBaseUrl = import.meta.env.OPEN_PRODUCT_API_URL || 'http://localhost:8000/producttypen/api/v1';
const openProductToken = import.meta.env.OPEN_PRODUCT_API_TOKEN || '465b0c3790199bab55b3639ba32df0470baabeb2';

const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Token ${openProductToken}`,
});

export const getProductSlug = (producttype: OpenProductProductType) =>
  producttype.naam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getProductTheme = (producttype: OpenProductProductType) => producttype.themas?.[0]?.naam || 'Overig';

export const getThemeSlug = (producttype: OpenProductProductType) => slugify(getProductTheme(producttype));

export async function getProductTypes() {
  const response = await fetch(`${openProductBaseUrl}/producttypen?page_size=500`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Open Product producttypen ophalen mislukt: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as ProductTypeListResponse;
  return data.results;
}

export async function getProductTypeByCode(code: string) {
  const response = await fetch(`${openProductBaseUrl}/producttypen?code=${encodeURIComponent(code)}&page_size=1`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Open Product producttype ophalen mislukt: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as ProductTypeListResponse;
  return data.results[0];
}

export async function getProductTypeBySlug(slug: string) {
  const producttypes = await getProductTypes();
  return producttypes.find((producttype) => getProductSlug(producttype) === slug);
}

export async function getProductTypeByThemeAndSlug(themeSlug: string, productSlug: string) {
  const producttypes = await getProductTypes();
  return producttypes.find(
    (producttype) => getThemeSlug(producttype) === themeSlug && getProductSlug(producttype) === productSlug,
  );
}

export async function getThemes() {
  const producttypes = await getProductTypes();
  const themes = new Map<string, { name: string; slug: string; producttypes: OpenProductProductType[] }>();

  for (const producttype of producttypes) {
    const name = getProductTheme(producttype);
    const slug = slugify(name);
    const theme = themes.get(slug) || { name, producttypes: [], slug };
    theme.producttypes.push(producttype);
    themes.set(slug, theme);
  }

  return Array.from(themes.values()).sort((a, b) => a.name.localeCompare(b.name, 'nl'));
}
