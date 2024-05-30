import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import type { GlobalStyleProps, Styles } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    'html, body': {
      backgroundColor: props.colorMode === 'dark' ? '#242424' : '#ffffff',
    },
    a: {
      fontWeight: 500,
      color: '#646cff',
      textDecoration: 'inherit',

      '&:hover': {
        color: props.colorMode === 'dark' ? '#535bf2' : '#747bff',
      },
    },

    button: {
      backgroundColor: props.colorMode === 'dark' ? '#1a1a1a' : '#f9f9f9',

      '&:hover': {
        borderColor: '#646cff',
      },

      '&:disabled': {
        backgroundColor: 'grey',
      },

      '&:focus, &:focus-visible': {
        outline: '4px auto -webkit-focus-ring-color',
      },
    },

    select: {
      '&:hover': {
        borderColor: '#646cff',
      },

      '&:focus, &:focus-visible': {
        outline: '4px auto -webkit-focus-ring-color',
      },
    },

    '.logo': {
      height: '6em',
      padding: '1.5em',
      'will-change': 'filter',
      transition: 'filter 300ms',
    },

    '.logo:hover': {
      filter: 'drop-shadow(0 0 2em #646cffaa)',
    },

    '.logo.react:hover': {
      filter: 'drop-shadow(0 0 2em #61dafbaa)',
    },
  }),
}

const theme = extendTheme({ config, styles })

export default theme
