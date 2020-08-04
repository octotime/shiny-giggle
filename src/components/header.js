import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'

import CartButton from './cartButton'

import { Link } from 'gatsby'
import { Logo } from './icons'
import { Box, Grid, Flex, Text, Button } from '@chakra-ui/core'

export default function Header () {
  const [sticky, setSticky] = useState(false)
  const location = useLocation()
  function scrollFunction () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setSticky(true)
    } else setSticky(false)
  }
  useEffect(() => {
    scrollFunction()
    window.onscroll = e => {
      scrollFunction()
    }
  }, [])

  const menuItems = [
    {
      name: 'Übersicht',
      path: '/'
    },
    {
      name: 'Grillen',
      path: '/grillen'
    },
    {
      name: 'Kochen',
      path: '/kochen'
    },
    {
      name: 'Kaffee',
      path: '/kaffee'
    }
  ]

  const Nav = () =>
    menuItems.map(item => {
      const isActive = location.pathname === item.path
      return (
        <Button
          as={Link}
          to={item.path}
          size='sm'
          mr={2}
          _last={{ mr: 0 }}
          variant='ghost'
          variantColor='gray'
          isActive={isActive}
          key={item.name}
        >
          {item.name}
        </Button>
      )
    })

  return (
    <>
      <Box bg='black' color='white'>
        <Box
          mx='auto'
          maxWidth='1024px'
          px={4}
          py={1}
          bg='black'
          color='white'
          textAlign='center'
          fontSize='sm'
        >
          <Text>Kein Schnickschnack. Nur Gewürze.</Text>
        </Box>
      </Box>
      <Box
        as='header'
        pos='sticky'
        top='0'
        bg='white'
        zIndex='sticky'
        py={4}
        mb={[0, 4]}
        borderBottom='1px solid transparent'
        borderBottomColor={sticky && 'gray.100'}
        transition='border-color 200ms ease'
      >
        <Box mx='auto' maxWidth='1024px' px={4}>
          <Grid templateColumns={['repeat(2, 1fr)', null, 'repeat(3, 1fr)']}>
            <Flex as='nav' alignItems='center' display={['none', null, 'flex']}>
              <Nav />
            </Flex>
            <Flex justifyContent={[null, null, 'center']} alignItems='center'>
              <Box as={Link} to='/' title='Übersicht'>
                <Logo width={80} />
              </Box>
            </Flex>
            <Flex justifyContent='flex-end' alignItems='center'>
              <CartButton />
            </Flex>
          </Grid>
          <Box position='relative'>
            <Flex
              as='nav'
              flexWrap='nowrap'
              overflowX='scroll'
              pt={4}
              display={['flex', null, 'none']}
            >
              <Nav />
            </Flex>
            <Box
              pos='absolute'
              top={0}
              right={0}
              bottom={0}
              background='linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'
              w={4}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
