import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ProductGrid from '../components/productGrid'
import { Heading } from '@chakra-ui/core'

const IndexPage = ({ data }) => (
  <>
    <Seo title='Home' />
    <Heading mb={[4, 8]} fontWeight='black'>
      Bestseller
    </Heading>
    <ProductGrid products={data.allShopifyProduct.nodes} />
  </>
)

export const query = graphql`
  query indexQuery {
    allShopifyProduct(sort: { fields: createdAt, order: DESC }, limit: 6) {
      nodes {
        id
        shopifyId
        handle
        title
        description
        variants {
          availableForSale
          id
          shopifyId
          title
          weight
          priceV2 {
            amount
          }
        }
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
