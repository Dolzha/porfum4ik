import Header from '../components/Header'
import Catalog from '../components/Catalog'
import PageTransition from '../components/PageTransition'
import { getProductsByCategory } from '../data/products'

export default function NovinkiPage() {
  return (
    <PageTransition>
      <Header mode="flow" />
      <Catalog
        title="Новинки"
        subtitle="Свежие релизы PERFUME-MODE — лимитированные ароматы, которые мы сами сейчас носим."
        products={getProductsByCategory('novinki')}
      />
    </PageTransition>
  )
}
