import React, { useState } from 'react'
import Img from 'gatsby-image'

import {
  useRemoveItemFromCart,
  useUpdateItemQuantity
} from 'gatsby-theme-shopify-manager'

import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  useToast,
  AspectRatioBox,
  Spinner
} from '@chakra-ui/core'

import { FiTrash2 } from 'react-icons/fi'
import { dotToComma } from '../utils/dotToComma'

function ListItem ({ data, staticVariants }) {
  // Hooks & State
  const updateQuantity = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const toast = useToast()
  const [quantity, setQuantity] = useState(data.quantity)
  const [removing, setRemoving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(null)
  // Handlers
  const handleRemove = () => {
    setRemoving(true)
    removeItem(data.variant.id).then(() => {
      setRemoving(false)
    })
  }
  const handleChange = n => {
    clearTimeout(wait)
    setLoading(true)
    setQuantity(n)
    setWait(
      setTimeout(() => {
        if (n > 50) {
          updateQuantity(data.variant.id, 50).then(setLoading(false))
          setQuantity(50)
          toast({
            title: 'Maximale Bestellmenge erreicht',
            description:
              'Die Bestellung von mehr als 50 Stück pro Artikel ist über unseren Onlineshop nicht möglich.',
            status: 'warning',
            duration: 5000,
            isClosable: true
          })
        } else if (n < 1) {
          updateQuantity(data.variant.id, 1).then(setLoading(false))
          setQuantity(1)
        } else {
          updateQuantity(data.variant.id, n).then(setLoading(false))
        }
      }, 2000)
    )
  }
  // Get Static Variant Image
  const getStaticData = (() => {
    const v = staticVariants.find(v => v.node.shopifyId === data.variant.id)
    return {
      handle: v.node.handle,
      image: v.node.image.localFile.childImageSharp.fixed
    }
  })()
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Flex alignItems='center'>
        <AspectRatioBox display={['none', 'flex']} maxW='100px' ratio={1}>
          <Img fixed={getStaticData.image} />
        </AspectRatioBox>
        <Box>
          <Heading as='h4' fontSize='sm'>
            {data.title}
          </Heading>
          <Text fontSize='xs' color='gray.600'>
            <Text as='span'>{data.variant.title}</Text>
            <br />
            <Text as='span'>Preis: {dotToComma(data.variant.price)} €</Text>
          </Text>
        </Box>
      </Flex>
      <FormControl>
        <FormLabel htmlFor='number' fontSize='xs'>
          Anzahl:
        </FormLabel>
        {loading && <Spinner size='xs' />}
        <Flex alignItems='center'>
          <NumberInput
            size='sm'
            maxW={16}
            min={1}
            max={50}
            value={quantity}
            onChange={handleChange}
          >
            <NumberInputField type='number' name='number' />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <IconButton
            icon={FiTrash2}
            title='Artikel entfernen'
            variantColor='red'
            size='sm'
            ml={2}
            onClick={handleRemove}
            variant='ghost'
            isLoading={removing}
          />
        </Flex>
      </FormControl>
    </Flex>
  )
}

export default function ProductList ({ products, staticVariants }) {
  return (
    <Box>
      <Heading as='h3' fontSize='xl' mb={4}>
        Artikel
      </Heading>
      <Stack>
        {products.map((item, index) => (
          <Box key={item.variant.id}>
            <ListItem data={item} staticVariants={staticVariants} />
            {index < products.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
