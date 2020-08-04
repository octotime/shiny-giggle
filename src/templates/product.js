import React, { useEffect, useState } from 'react'
import Img from 'gatsby-image'
import RadioProduct from '../components/radioProduct'

import Seo from '../components/seo'

import { graphql } from 'gatsby'
import { useClientUnsafe } from 'gatsby-theme-shopify-manager'
import { Grid, Box, Heading, Divider } from '@chakra-ui/core'
import styles from './markdown.module.css'

export default function ({ data }) {
  // Destructuring
  const {
    descriptionHtml,
    images,
    shopifyId,
    title,
    variants
  } = data.shopifyProduct
  // Hooks and State
  const shopify = useClientUnsafe()
  const [fetching, setFetching] = useState(true)
  const [fetchedData, setFetched] = useState([])
  useEffect(() => {
    shopify.product.fetch(shopifyId).then(product => {
      const d = product.variants.map(variant => {
        return {
          available: variant.available
        }
      })
      setFetched(d)
      setFetching(false)
    })
  }, [])
  const moreImages = images.slice(1)
  return (
    <>
      <Seo title={title} />
      <Grid templateColumns={[null, null, '1fr 2fr', null]} gap={4} mb={8}>
        <Box gridRow={[3, 3, 1]}>
          <Img fluid={images[0].localFile.childImageSharp.fluid} />
        </Box>
        <Box>
          <Heading fontWeight='black' mb={[4, 8]}>
            {title}
          </Heading>
          <Box
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <Box
            alignItems='flex-start'
            flexDir={[null, 'row-reverse']}
            justifyContent={[null, 'flex-end']}
            display={[null, 'flex']}
            mt={[4, 8]}
          >
            <RadioProduct
              mt={[4, 0]}
              mr={[0, 4]}
              variants={variants}
              isFetching={fetching}
              fetchedVariants={fetchedData}
              showQuantity
            />
          </Box>
        </Box>
      </Grid>
      <Divider />
      <Heading mt={8} fontWeight='black' fontSize='2xl'>
        Mehr Bilder
      </Heading>
      <Grid templateColumns={[null, 'repeat(2, 1fr)']}>
        {moreImages.map(image => (
          <Img fluid={image.localFile.childImageSharp.fluid} key={image.id} />
        ))}
      </Grid>
    </>
  )
}

export const query = graphql`
  query Product($id: String) {
    shopifyProduct(id: { eq: $id }) {
      id
      shopifyId
      handle
      title
      descriptionHtml
      variants {
        availableForSale
        id
        shopifyId
        title
        priceV2 {
          amount
        }
      }
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
