const navData = [
  {
    key: "home",
    url: "/",
    children: []
  },
  {
    key: "about",
    url: "/about",
    children: []
  },
  {
    key: "Services",
    url: "/services",
    children: [
      {
        key: "Static Websites Business",
        url: "/services/static-websites-business"
      },
      {
        key: "SEO",
        url: "/services/seo"
      },
      {
        key: "Google Business Pages Management",
        url: "/services/google-business-pages-management"
      },
      {
        key: "Branding",
        url: "/services/branding"
      }
    ]
  },
  //{
  //  key: "blog",
  //  url: "/blog",
  //children: []
  //},
  {
    key: "contact",
    url: "/contact",
    children: []
  },
]
export default navData