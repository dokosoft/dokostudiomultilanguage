import { defineConfig } from "astro/config";
import icon from "astro-icon";
import i18n from "@astrolicious/i18n";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dokostudio.com", // update me!
  integrations: [
    icon(),
    i18n({
      defaultLocale: "en",
      locales: ["de", "en", "al","gr"],
      client: {
        data: true,
        paths: true,
      },
      // used to localize the routes
      pages: {
        "/about": {
          de: "/uber-uns",
          al: "/rreth-nesh",
          gr: "/sxetika-me-emas",
        },
        "/contact": {
          de: "/kontakt",
          al: "/kontakti",
          gr: "/epikoinonia",
        },
        "/services/seo": {
          de: "/dienstleistungen/seo",
          al: "/sherbimet/seo",
          gr: "/ypiresies/seo", // optional, but nice to have
        },
        "/services/static-websites-business": {
          de: "/dienstleistungen/statische-websites-fur-unternehmen",
          al: "/sherbimet/faqe-statik-per-biznes",
          gr: "/ypiresies/statikes-istoselides-gia-epixeiriseis",
        },
        "/services/google-business-pages-management": {
          de: "/dienstleistungen/google-business-seiten-verwaltung",
          al: "/sherbimet/menaxhimi-i-faqeve-te-google-business",
          gr: "/ypiresies/dioikisi-selidon-google-business",
        },
        "/services/branding": {
          de: "/dienstleistungen/branding",
          al: "/sherbimet/branding",
          gr: "/ypiresies/branding",
        },
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `"https://www.yourwebsite.com/"` will be treated as default locale, i.e. `en`
        locales: {
          // key/value pairs of all languages supported
          en: 'en-US', // The `defaultLocale` value must be present in `locales` keys
          de: 'de-DE',
          al: 'sq-AL',
          gr: 'el-GR',
        },
      },
    }),
  ],
});
