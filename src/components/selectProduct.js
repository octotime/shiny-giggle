import React, { useState } from 'react'
import {
  Select,
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel
} from '@chakra-ui/core'

import AddProduct from './addProduct'
import { dotToComma } from '../utils/dotToComma'

export default function SelectProduct ({
  variants,
  quantity = 1,
  fetching,
  fetchedVariants,
  isSmall,
  ...rest
}) {
  // Initialize state
  const [selected, setSelected] = useState(variants.length - 1)
  const available = fetching
    ? variants[selected].availableForSale
    : fetchedVariants[selected].available
  // Handle events
  const handleChange = e => {
    setSelected(e.target.value)
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <Box maxW='sm' {...rest}>
      <FormControl>
        <FormLabel fontSize='xs' htmlFor='select-variant'>
          Variante auswählen:
        </FormLabel>
        <Select
          name='select-variant'
          size={isSmall ? 'sm' : 'md'}
          value={selected}
          onChange={handleChange}
        >
          {variants.map((variant, index) => (
            <option key={variant.id} value={index}>
              {variant.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent='space-between' alignItems='center' mt='2'>
        <Box>
          <Text as='span' fontSize='xl' fontWeight='medium'>
            {price}
          </Text>
          <Text as='span' ml='1'>
            €
          </Text>
        </Box>
        <AddProduct
          shopifyId={variants[selected].shopifyId}
          quantity={quantity}
          isSmall={isSmall}
          isAvailable={available}
        />
      </Flex>
    </Box>
  )
}
