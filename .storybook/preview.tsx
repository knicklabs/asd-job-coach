import React from 'react'

import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { themes } from '@storybook/theming'

import { darkUIStorybook, lightUIStorybook } from './themes'
import { ThemeProvider } from '../src/components/theme-provider'

import '../src/main.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // @see https://storybook.js.org/addons/storybook-dark-mode
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      dark: { ...themes.dark, ...darkUIStorybook },
      light: { ...themes.light, ...lightUIStorybook },
      current: 'light',
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', 'Examples'],
      }
    }
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider><div><Story /></div></ThemeProvider>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  })
]

export default preview
