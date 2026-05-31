import Header from '../components/Header'
import PageTransition from '../components/PageTransition'

export default function SupportPage() {
  return (
    <PageTransition>
      <Header mode="flow" />
      <section className="mx-auto max-w-[1440px] px-[40px] py-[64px]">
        <h1 className="text-[64px] font-light leading-[0.95] tracking-[-3.2px] text-black">
          Поддержка
        </h1>
        <p className="mt-[16px] max-w-[640px] text-[18px] leading-[1.4] text-black/70">
          Чат поддержки скоро здесь. Напишите нам напрямую — отвечаем за день.
        </p>
        <a
          href="mailto:hello@perfume-mode.example"
          className="inline-block mt-[24px] px-[24px] py-[14px] rounded-[64px] bg-[#a4a091] text-white text-[16px] font-semibold tracking-[-0.48px] no-underline cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
        >
          hello@perfume-mode.example
        </a>
      </section>
    </PageTransition>
  )
}
