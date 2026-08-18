import { Grid, Heading, LinkList, Page, PageFooter, PageHeader, SkipLink, StandaloneLink } from '@amsterdam/design-system-react';
import { ClockIcon, FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, MastodonIcon, PhoneIcon } from '@amsterdam/design-system-react-icons';
import type { PropsWithChildren } from 'react';

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <SkipLink href="#inhoud">Direct naar inhoud</SkipLink>
      <PageHeader logoLink="/" logoLinkTitle="Ga naar de homepage van Gemeente Amsterdam" />
      {children}
      <PageFooter>
        <PageFooter.Spotlight>
          <Grid paddingVertical="x-large">
            <Grid.Cell span={4}>
              <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
                Contact
              </Heading>
              <LinkList className="ams-mb-xl">
                <LinkList.Link color="inverse" href="#" icon={<MailIcon />}>
                  Contactformulier
                </LinkList.Link>
                <LinkList.Link color="inverse" href="tel:14020" icon={<PhoneIcon />}>
                  14 020
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#" icon={<ClockIcon />}>
                  Adressen en openingstijden
                </LinkList.Link>
              </LinkList>
              <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
                Vacatures
              </Heading>
              <StandaloneLink color="inverse" href="#">
                Werken bij Amsterdam
              </StandaloneLink>
            </Grid.Cell>
            <Grid.Cell span={4}>
              <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
                Volg ons
              </Heading>
              <LinkList>
                <LinkList.Link color="inverse" href="#">
                  De Amsterdam App
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#">
                  Nieuwsbrieven
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#" icon={<FacebookIcon />}>
                  Facebook
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#" icon={<InstagramIcon />}>
                  Instagram
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#" icon={<LinkedInIcon />}>
                  LinkedIn
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#" icon={<MastodonIcon />}>
                  Mastodon
                </LinkList.Link>
              </LinkList>
            </Grid.Cell>
            <Grid.Cell span={4}>
              <Heading className="ams-mb-s" color="inverse" level={2} size="level-3">
                Doen in de stad
              </Heading>
              <LinkList>
                <LinkList.Link color="inverse" href="#">
                  Bijeenkomsten en activiteiten
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#">
                  Uit in Amsterdam
                </LinkList.Link>
                <LinkList.Link color="inverse" href="#">
                  Amsterdam 750 jaar
                </LinkList.Link>
              </LinkList>
            </Grid.Cell>
          </Grid>
        </PageFooter.Spotlight>
        <PageFooter.Menu>
          <PageFooter.MenuLink href="#">Over deze site</PageFooter.MenuLink>
          <PageFooter.MenuLink href="#">Privacy</PageFooter.MenuLink>
          <PageFooter.MenuLink href="#">Cookies op deze site</PageFooter.MenuLink>
          <PageFooter.MenuLink href="#">Webarchief</PageFooter.MenuLink>
        </PageFooter.Menu>
      </PageFooter>
    </Page>
  );
}
