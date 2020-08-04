require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'ACME Store',
    description:
      'Boilerplate project for Shopify Storefront development with GatsbyJS.',
    author: '@derjohnschmidt'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-theme-shopify-manager',
      options: {
        shopName: process.env.SHOPIFY_URL,
        accessToken: process.env.SHOPIFY_API_TOKEN,
        shouldIncludeSourcePlugin: true
      }
    },
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        isUsingColorMode: false
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'acme-store',
        short_name: 'acme',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/acme-icon.png'
      }
    }
  ]
}
