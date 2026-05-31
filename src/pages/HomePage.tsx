import { useEffect } from 'react'
import Hero from '../components/Hero'
import PageTransition from '../components/PageTransition'

export default function HomePage() {
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const apply = (isDesktop: boolean) => {
      if (isDesktop) document.body.classList.add('home-locked')
      else document.body.classList.remove('home-locked')
    }
    apply(mql.matches)
    const onChange = (e: MediaQueryListEvent) => apply(e.matches)
    mql.addEventListener('change', onChange)
    return () => {
      mql.removeEventListener('change', onChange)
      document.body.classList.remove('home-locked')
    }
  }, [])

  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  )
}
