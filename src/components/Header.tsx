import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

type HeaderMode = 'hero' | 'flow'

const NAV_LINKS: { to: string; label: string }[] = [
  { to: '/novinki', label: 'Новинки' },
  { to: '/tovary', label: 'Товары' },
  { to: '/skidki', label: 'Скидки' },
]

const pillBase =
  'px-[16px] pl-[10px] py-[10px] pb-[12px] text-[16px] leading-[1.3] tracking-[-0.48px] rounded-[24px] cursor-pointer transition-transform duration-200 ease-out hover:scale-110 no-underline'

const pillActive =
  'font-semibold text-white bg-[#a4a091] border border-[rgba(0,0,0,0.7)]'

const pillIdle = 'font-medium text-black'

const groupBase =
  'flex items-center rounded-[24px] border border-[rgba(0,0,0,0.55)] bg-[rgba(234,221,225,0.75)] backdrop-blur-sm'

export default function Header({ mode }: { mode: HeaderMode }) {
  const { pathname } = useLocation()
  const { count } = useCart()

  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + '/')

  const wrapperClass =
    mode === 'hero'
      ? 'absolute inset-x-0 top-0 z-30'
      : 'sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-black/5'

  return (
    <header className={wrapperClass}>
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-[40px] py-[15px]">
        <Link
          to="/"
          className="text-[20px] font-medium tracking-[-0.6px] text-black leading-[1.3] no-underline cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03]"
        >
          PERFUME-MODE
        </Link>

        <nav className={groupBase}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={pillBase + ' ' + (isActive(l.to) ? pillActive : pillIdle)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={groupBase}>
          <Link
            to="/support"
            className={pillBase + ' ' + (isActive('/support') ? pillActive : pillIdle)}
          >
            Поддержка
          </Link>
          <div className="relative">
            <Link
              to="/cart"
              className={pillBase + ' ' + (isActive('/cart') ? pillActive : pillIdle)}
            >
              Корзина
            </Link>
            {count > 0 && (
              <span className="absolute -top-[8px] -right-[6px] flex items-center justify-center min-w-[21px] h-[21px] px-[5px] rounded-[10.5px] bg-[#6c6769] text-white text-[14px] font-medium tracking-[-0.42px] leading-none pointer-events-none">
                {count}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
