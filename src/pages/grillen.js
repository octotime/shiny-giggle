import React from 'react'
import ProductGrid from '../components/productGrid'
import { Heading } from '@chakra-ui/core'
import { graphql } from 'gatsby'
export default function Grillen ({ data }) {
  const categoryProducts = data.allShopifyCollection.edges[0].node.products
  return (
    <>
      <Heading mb={[4, 8]} fontWeight='black'>
        Grillen
      </Heading>
      <ProductGrid products={categoryProducts} />
    </>
  )
}

export const query = graphql`
  query grillenQuery {
    allShopifyCollection(filter: { handle: { eq: "grillen" } }) {
      edges {
        node {
          id
          products {
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
    }
  }
`
