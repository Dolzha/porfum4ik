import Header from '../components/Header'
import Catalog from '../components/Catalog'
import PageTransition from '../components/PageTransition'
import { getProductsByCategory } from '../data/products'

export default function TovaryPage() {
  return (
    <PageTransition>
      <Header mode="flow" />
      <Catalog
        title="Товары"
        subtitle="Вся линейка PERFUME-MODE — гибридные ароматы с уходовой формулой."
        products={getProductsByCategory('tovary')}
      />
    </PageTransition>
  )
}
