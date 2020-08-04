import React, { useState, useEffect } from 'react'
import { Button, Box } from '@chakra-ui/core'
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'gatsby'
import { useCartCount } from 'gatsby-theme-shopify-manager'
import { useLocation } from '@reach/router'

export default function CartButton () {
  const location = useLocation()
  const count = useCartCount()
  const [empty, setEmpty] = useState(true)
  useEffect(() => {
    if (count > 0) {
      setEmpty(false)
    } else setEmpty(true)
  }, [count])
  const buttonColor =
    location.pathname === '/warenkorb' ? 'gray' : empty ? 'gray' : 'green'
  return (
    <Box position='relative'>
      <Button
        as={Link}
        to='/warenkorb'
        display='flex'
        leftIcon={FiShoppingBag}
        variant='solid'
        variantColor={buttonColor}
      >
        Warenkorb
      </Button>
      <Box
        position='absolute'
        top='0'
        right='0'
        mt={-2}
        mr={-2}
        fontSize='xs'
        rounded='full'
        bg='red.500'
        color='white'
        minW={5}
        h={5}
        display='flex'
        alignItems='center'
        justifyContent='center'
        px={1}
        opacity={empty ? 0 : 1}
      >
        <span>{count}</span>
      </Box>
    </Box>
  )
}
