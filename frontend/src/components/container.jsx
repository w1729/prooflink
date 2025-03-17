import { cn } from '@/lib/utils'

const Container = ({ children, className }) => {
  const classes = cn('container flex max-w-screen-2xl items-center', className)
  return <div className={classes}>{children}</div>
}

export default Container
