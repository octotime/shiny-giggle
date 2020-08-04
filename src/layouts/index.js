import React from 'react'

import PropTypes from 'prop-types'
import Header from '../components/header'
import { Box, Text } from '@chakra-ui/core'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box mx='auto' maxWidth='1024px' px='4'>
        <Box as='main'>{children}</Box>
        <Box as='footer' mt={16} mb={8}>
          <Box textAlign='center' fontSize='xs'>
            <Text>© 2020 KuS Hamburg GmbH</Text>
            <Text>Webdesign von John Schmidt</Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
