import React from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input
} from '@chakra-ui/core'

export default function SelectQuantity ({
  hideLabel,
  isSmall,
  quantity,
  setQuantity
}) {
  const handleInput = e => {
    if (e.target.value > 50) {
      setQuantity(50)
    } else if (e.target.value <= 0) {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }
  const handleClick = add => {
    const higher = quantity + 1
    const lower = quantity - 1
    if (quantity > 0) {
      if (add && higher <= 50) {
        setQuantity(parseInt(higher))
      } else if (!add && lower > 0) {
        setQuantity(parseInt(lower))
      }
    }
  }
  return (
    <Box mt={2}>
      <FormControl>
        {!hideLabel && (
          <FormLabel fontSize='xs' color='gray.400' htmlFor='select-quantity'>
            Anzahl:
          </FormLabel>
        )}
        <Flex>
          {/* Plus */}
          <IconButton
            icon='minus'
            onClick={() => handleClick(false)}
            size={isSmall && 'sm'}
            type='dec'
          />
          {/* Show Quantity */}
          <Input
            fontSize='lg'
            fontWeight='medium'
            max={50}
            min={1}
            mx={2}
            name='select-quantity'
            onChange={handleInput}
            px={2}
            py={1}
            size={isSmall && 'sm'}
            textAlign='center'
            type='number'
            value={quantity}
            w='10'
          />
          {/* Minus */}
          <IconButton
            icon='add'
            onClick={() => handleClick(true)}
            size={isSmall && 'sm'}
          />
        </Flex>
        <FormHelperText fontSize='xs'>max. 50 Stück</FormHelperText>
      </FormControl>
    </Box>
  )
}
