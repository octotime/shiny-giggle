import React from 'react'

import { useCart } from 'gatsby-theme-shopify-manager'
import { dotToComma } from '../utils/dotToComma'

import {
  Box,
  Heading,
  Flex,
  Link,
  Text,
  Stack,
  Divider,
  Button
} from '@chakra-ui/core'

import { FiLock } from 'react-icons/fi'

export default function CartSummary () {
  // Hooks
  const cart = useCart()
  // Calculations
  const subtotal = parseFloat(cart?.subtotalPrice)
  const subtotalString = dotToComma(subtotal.toFixed(2))
  const shipping = subtotal > 50 ? 0 : 3.99
  const shippingString = dotToComma(shipping.toFixed(2))
  const total = subtotal + shipping
  const totalString = dotToComma(total.toFixed(2))
  // Render
  return (
    <Box>
      <Box
        p={6}
        borderRadius={4}
        shadow='lg'
        borderColor='gray.100'
        borderWidth={1}
      >
        <Heading as='h3' fontSize='xl' mb={4}>
          Zusammenfassung
        </Heading>
        <Stack spacing={4}>
          <Box>
            <Flex justifyContent='space-between'>
              <Text color='gray.600'>Zwischensumme:</Text>
              <Text>{subtotalString} €</Text>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text color='gray.600'>Versandkosten:</Text>
              <Text>
                {shipping === 0 ? 'Kostenfrei' : shippingString + ' €'}
              </Text>
            </Flex>
            <Link color='teal.500' fontSize='xs'>
              Hinweise zu den Versandkosten
            </Link>
          </Box>
          <Divider />
          <Stack spacing={4}>
            <Box>
              <Flex justifyContent='space-between'>
                <Text fontWeight='bold'>Gesamt:</Text>
                <Text>{totalString} €</Text>
              </Flex>
              <Text fontSize='xs'>Alle Preise inklusive MwSt.</Text>
              <Text fontSize='xs' color='gray.600' mt={2}>
                Versandkosten und Steuern sind geschätzt und werden während des
                Bestellvorgangs aktualisiert, basierend auf deinen Rechnungs-
                und Versandinformationen.
              </Text>
            </Box>
            <Link href={cart.webUrl} target='_blank'>
              <Button
                size='lg'
                variantColor='green'
                rightIcon='arrow-forward'
                isFullWidth
              >
                Zur Kasse
              </Button>
            </Link>
            <Flex alignItems='flex-start' color='green.600'>
              <FiLock />
              <Text fontSize='xs' ml={2}>
                Alle Zahlungen sind verschlüsselt.
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
