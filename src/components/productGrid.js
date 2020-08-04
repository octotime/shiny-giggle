import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import { Grid, Heading, Box } from '@chakra-ui/core'

import { Link } from 'gatsby'
import { useClientUnsafe } from 'gatsby-theme-shopify-manager'
import RadioProduct from './radioProduct'

export default function ProductGrid ({ products }) {
  // Hooks
  const shopify = useClientUnsafe()
  // State
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  const productIds = products.map(p => p.shopifyId)
  // Update availability on runtime
  useEffect(() => {
    shopify.product
      .fetchMultiple(productIds)
      .then(products => {
        // Returning an array with the same index as the static product array, inside of this array another array with the variants and their availability
        const data = products.map(product => {
          return product.variants.map(variant => {
            return {
              available: variant.available
            }
          })
        })
        setData(data)
        setFetching(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
      gap='8'
    >
      {products.map((item, index) => {
        return (
          <Box key={item.id}>
            <Box
              as={Link}
              display='block'
              mb={1}
              textAlign='center'
              to={`/${item.handle}`}
            >
              <Img fluid={item.images[0].localFile.childImageSharp.fluid} />
              <Heading size='lg' fontWeight='bold' mb={2}>
                {item.title}
              </Heading>
            </Box>
            <RadioProduct
              fetchedVariants={data[index]}
              isFetching={fetching}
              variants={item.variants}
              display='flex'
              flexDir='column'
              alignItems='center'
              isSmall
            />
          </Box>
        )
      })}
    </Grid>
  )
}
