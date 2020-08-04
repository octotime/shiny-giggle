import React, { useState, forwardRef } from 'react'
import AddProduct from './addProduct'
import SelectQuantity from './selectQuantity'

import {
  Text,
  FormLabel,
  FormControl,
  Button,
  RadioButtonGroup
} from '@chakra-ui/core'
import { dotToComma } from '../utils/dotToComma'

const CustomRadio = forwardRef((props, ref) => {
  const { isChecked, isDisabled, isSmall, value, ...rest } = props
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? 'teal' : 'gray'}
      aria-checked={isChecked}
      size={isSmall ? 'sm' : 'md'}
      variant='outline'
      role='radio'
      isDisabled={isDisabled}
      _last={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      _first={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        mr: '-1px'
      }}
      _checked={{ zIndex: 'dropdown' }}
      {...rest}
    />
  )
})

export default function RadioProduct ({
  fetchedVariants,
  isFetching,
  isSmall,
  showQuantity,
  noLabel,
  variants,
  ...rest
}) {
  const [selected, setSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const handleChange = val => {
    setSelected(parseInt(val))
  }
  const available = !isFetching
    ? fetchedVariants[selected].available
    : variants[selected].availableForSale

  return (
    <FormControl {...rest}>
      <Text
        fontSize={isSmall ? '2xl' : '4xl'}
        fontWeight={isSmall ? 'medium' : 'bold'}
      >
        {dotToComma(
          quantity > 1
            ? (variants[selected].priceV2.amount * quantity).toFixed(2)
            : variants[selected].priceV2.amount
        )}{' '}
        <Text as='span' fontSize='2xl'>
          €
        </Text>
        {quantity > 1 && (
          <Text
            ml={2}
            fontSize='sm'
            as='span'
            fontWeight='normal'
            color='gray.400'
          >
            {variants[selected].priceV2.amount} € / Stück
          </Text>
        )}
      </Text>
      {!noLabel && (
        <FormLabel fontSize='xs' htmlFor='radio-variant' color='gray.400'>
          Größe auswählen:
        </FormLabel>
      )}
      <RadioButtonGroup
        name='radio-variant'
        onChange={handleChange}
        spacing={0}
        value={selected}
      >
        {variants.map((v, x) => (
          <CustomRadio key={v.id} value={x} isSmall={isSmall}>
            {v.title}
          </CustomRadio>
        ))}
      </RadioButtonGroup>
      {showQuantity && (
        <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
      )}
      <AddProduct
        mt={4}
        isAvailable={available}
        shopifyId={variants[selected].shopifyId}
        quantity={quantity}
      />
    </FormControl>
  )
}
