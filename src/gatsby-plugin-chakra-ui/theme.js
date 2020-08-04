import baseTheme from '@chakra-ui/core/dist/theme'
export default {
  ...baseTheme,
  fonts: {
    ...baseTheme.fonts,
    body: 'Inter,' + baseTheme.fonts.body,
    heading: 'Inter,' + baseTheme.fonts.heading
  }
}
