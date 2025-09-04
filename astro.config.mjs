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
				}
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
