import Header from '../components/Header'
import Catalog from '../components/Catalog'
import PageTransition from '../components/PageTransition'
import { getProductsByCategory } from '../data/products'

export default function SkidkiPage() {
  return (
    <PageTransition>
      <Header mode="flow" />
      <Catalog
        title="Скидки"
        subtitle="Ароматы по уменьшенной цене — пока есть в наличии."
        products={getProductsByCategory('skidki')}
      />
    </PageTransition>
  )
}
