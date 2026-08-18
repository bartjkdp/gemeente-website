import json
import os
from datetime import date

from django.db import transaction

from openproduct.producttypen.models import Actie, Link, Parameter, Prijs, PrijsOptie, ProductType, Thema

fixture_path = os.environ.get("EXAMPLE_PRODUCTTYPEN_JSON", "/app/example-producttypen-response.json")


def parse_date(value):
    return date.fromisoformat(value) if value else date.today()


with open(fixture_path) as fixture_file:
    data = json.load(fixture_file)

created = 0
updated = 0

with transaction.atomic():
    for item in data["results"]:
        producttype, was_created = ProductType.objects.get_or_create(
            code=item["code"],
            defaults={
                "doelgroep": "burgers",
                "keywords": item.get("keywords", []),
                "publicatie_start_datum": date.today(),
            },
        )

        producttype.keywords = item.get("keywords", [])
        producttype.publicatie_start_datum = producttype.publicatie_start_datum or date.today()
        producttype.set_current_language("nl")
        producttype.naam = item["naam"]
        producttype.samenvatting = item.get("samenvatting", "")
        producttype.save()

        themes = []
        for theme_data in item.get("themas", []):
            theme, _ = Thema.objects.update_or_create(
                naam=theme_data["naam"],
                defaults={
                    "beschrijving": f"Voorbeeldthema: {theme_data['naam']}",
                    "gepubliceerd": True,
                },
            )
            themes.append(theme)
        producttype.themas.set(themes)

        Parameter.objects.filter(producttype=producttype).delete()
        for parameter in item.get("parameters", []):
            Parameter.objects.create(
                producttype=producttype,
                naam=parameter["naam"],
                waarde=parameter.get("waarde", ""),
            )

        Link.objects.filter(producttype=producttype).delete()
        for link in item.get("links", []):
            if link.get("url"):
                Link.objects.create(producttype=producttype, naam=link["naam"], url=link["url"])

        Actie.objects.filter(producttype=producttype).delete()
        for action in item.get("acties", []):
            Actie.objects.create(producttype=producttype, naam=action["naam"], direct_url=action.get("url", ""))

        Prijs.objects.filter(producttype=producttype).delete()
        for price_data in item.get("prijzen", []):
            price = Prijs.objects.create(producttype=producttype, actief_vanaf=parse_date(price_data.get("actief_vanaf")))
            for option in price_data.get("prijsopties", []):
                PrijsOptie.objects.create(
                    prijs=price,
                    bedrag=option["bedrag"],
                    beschrijving=option.get("beschrijving", "Prijs"),
                )

        created += int(was_created)
        updated += int(not was_created)

print(f"Imported {created} new and updated {updated} existing product types.")
