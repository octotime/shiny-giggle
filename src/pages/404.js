import React from 'react'
import Seo from '../components/seo'
import {
  Box,
  Text,
  Button,
  Image,
  Link as ChakraLink,
  Heading
} from '@chakra-ui/core'
import notFound from '../images/404.svg'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <>
    <Seo title='404: Not found' />
    <Box textAlign='center'>
      <Heading fontWeight='black' mb={[4, 8]}>
        Nichts gefunden
      </Heading>
      <Text mb={4}>
        Leider scheint es diese Seite bei uns nicht zu geben. Vielleicht nur ein
        Tippfehler?
        <br />
        <ChakraLink color='teal.500'>
          Falls nicht, schreib uns was passiert ist!
        </ChakraLink>
      </Text>
      <Button as={Link} to='/' rightIcon='arrow-forward' variantColor='teal'>
        Startseite
      </Button>
      <Image width={56} src={notFound} mx='auto' mt={12} />
    </Box>
  </>
)

export default NotFoundPage
