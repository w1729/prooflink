import Header from './components/nav/Header'
import { ThemeProvider } from '@/components/theme-provider'

export default function layout(props) {
  const { children } = props
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Header />
      {children}
    </ThemeProvider>
  )
}
