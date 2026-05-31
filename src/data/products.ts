export type Category = 'novinki' | 'tovary' | 'skidki'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  notes: string[]
  price: number
  oldPrice?: number
  categories: Category[]
  color: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'desert-breeze',
    slug: 'desert-breeze',
    name: 'Desert Breeze',
    description:
      'Это выбор тех, кто стремится к совершенству. Тёплая дымка пустыни в матовом стекле.',
    notes: ['Уд', 'Кардамон', 'Янтарь'],
    price: 24490,
    categories: ['tovary', 'novinki'],
    color: '#a4a091',
  },
  {
    id: 'rose-noir',
    slug: 'rose-noir',
    name: 'Rose Noir',
    description:
      'Глубокий бархат болгарской розы, оттенённый чёрным перцем. Для вечеров без правил.',
    notes: ['Роза', 'Чёрный перец', 'Пачули'],
    price: 26800,
    oldPrice: 32900,
    categories: ['tovary', 'skidki'],
    color: '#6c6769',
  },
  {
    id: 'morning-silk',
    slug: 'morning-silk',
    name: 'Morning Silk',
    description:
      'Шёлковая прохлада утра — белый чай, фрезия, лёгкая мускусная вуаль на коже.',
    notes: ['Белый чай', 'Фрезия', 'Белый мускус'],
    price: 19900,
    categories: ['tovary', 'novinki'],
    color: '#eaddd1',
  },
  {
    id: 'amber-libre',
    slug: 'amber-libre',
    name: 'Amber Libre',
    description:
      'Янтарная свобода: смолы, ваниль, отголоски солнечного дерева. Парфюм, который не просит разрешения.',
    notes: ['Янтарь', 'Ваниль', 'Сандал'],
    price: 22500,
    categories: ['tovary'],
    color: '#faeaca',
  },
  {
    id: 'velvet-fig',
    slug: 'velvet-fig',
    name: 'Velvet Fig',
    description:
      'Спелый инжир с прохладным листом и сливочной древесной базой. Подходит и для лица, и для запястий.',
    notes: ['Инжир', 'Лист инжира', 'Кокос'],
    price: 21300,
    categories: ['tovary', 'novinki'],
    color: '#b5a4a6',
  },
  {
    id: 'lumen-vert',
    slug: 'lumen-vert',
    name: 'Lumen Vert',
    description:
      'Зелёное свечение — мятный базилик, лайм, мокрый камень после дождя. Гипоаллергенная формула.',
    notes: ['Базилик', 'Лайм', 'Ветивер'],
    price: 17900,
    oldPrice: 22400,
    categories: ['tovary', 'skidki'],
    color: '#cfd6c4',
  },
  {
    id: 'soft-poudre',
    slug: 'soft-poudre',
    name: 'Soft Poudre',
    description:
      'Пудровая нежность — ирис, гелиотроп, тёплая кожа. Ощущение чистого хлопка из детства.',
    notes: ['Ирис', 'Гелиотроп', 'Мускус'],
    price: 20400,
    categories: ['tovary'],
    color: '#e8d5d9',
  },
]

export const formatPrice = (rub: number): string =>
  '₽ ' + rub.toLocaleString('ru-RU') + ',00'

export const getProductsByCategory = (cat: Category): Product[] =>
  PRODUCTS.filter((p) => p.categories.includes(cat))
