import React from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  theme
} from '@chakra-ui/core'

import ThemeToggler from './components/ThemeToggler'

import LoginForm from './pages/LoginForm'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="dark">
        <CSSReset />
        <ThemeToggler />
        <LoginForm />
      </ColorModeProvider>
    </ThemeProvider>
  )
}
