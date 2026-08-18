# Gemeente Website

## Docker Compose

Start de website met Open Product:

```bash
docker compose up --build
```

De website draait daarna op `http://localhost:4321`. Open Product draait op `http://localhost:8000`.

## Voorbeeldproducten Inladen

Laad de voorbeeldonderwerpen en -producten uit `open-product/example-producttypen-response.json` in Open Product:

```bash
docker compose run --rm --no-deps \
  -e EXAMPLE_PRODUCTTYPEN_JSON=/app/example-producttypen-response.json \
  -v "$PWD/open-product/example-producttypen-response.json:/app/example-producttypen-response.json:ro" \
  -v "$PWD/open-product/import-example-producttypen.py:/app/import-example-producttypen.py:ro" \
  open-product-web \
  sh -c "cd /app/src && python manage.py shell < /app/import-example-producttypen.py"
```

Herstart daarna de websitecontainer als de pagina al open stond:

```bash
docker compose restart gemeente-website
```
