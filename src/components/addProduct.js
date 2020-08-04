import React, { useState } from 'react'

import { Button, useToast } from '@chakra-ui/core'
import { useAddItemToCart, useCartItems } from 'gatsby-theme-shopify-manager'

export default function AddProduct ({
  isAvailable,
  isSmall,
  quantity = 1,
  shopifyId,
  ...rest
}) {
  // Hooks
  const addItemToCart = useAddItemToCart()
  const cartItems = useCartItems()
  const toast = useToast()
  // State
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    const isExisting = cartItems.find(i => i.variant.id === shopifyId)
    let isMax = false
    let willMax = false
    if (isExisting) {
      const addedQuantity = isExisting.quantity + quantity
      isMax = isExisting.quantity >= 50
      willMax = addedQuantity >= 50
    }
    if (isMax || willMax) {
      toast({
        title: 'Maximale Bestellmenge erreicht',
        description:
          'Die Bestellung von mehr als 50 Stück pro Artikel ist über unseren Onlineshop nicht möglich.',
        status: 'warning',
        duration: 5000,
        isClosable: true
      })
      setLoading(false)
    } else {
      addItemToCart(shopifyId, quantity)
        .then(() => setLoading(false))
        .catch(e => {
          console.log(e)
          setLoading(false)
        })
    }
  }
  return (
    <Button
      isDisabled={!isAvailable}
      isLoading={loading}
      onClick={handleClick}
      size={isSmall ? 'sm' : 'md'}
      variantColor='teal'
      {...rest}
    >
      {isAvailable ? 'In den Warenkorb' : 'Ausverkauft'}
    </Button>
  )
}
