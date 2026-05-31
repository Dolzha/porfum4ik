import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import heroBg from '../assets/hero-bg.png'
import bottle from '../assets/bottle.png'
import bottleSide from '../assets/bottle-side.png'
import bottleAngle from '../assets/bottle-angle.png'
import videoPoster from '../assets/video-poster.png'
import arrowCorner from '../assets/arrow-corner.svg'
import play from '../assets/play.svg'
import desertBreezeVideo from '../assets/desert-breeze.mp4'

const GALLERY = [
  { src: bottle, label: 'Спереди' },
  { src: bottleSide, label: 'Сбоку' },
  { src: bottleAngle, label: '3/4' },
]

export default function Hero() {
  const fitRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900) * 0.9
      setScale(s)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!isVideoOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVideoOpen])

  useEffect(() => {
    if (!isGalleryOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsGalleryOpen(false)
      if (e.key === 'ArrowRight') setGalleryIndex((i) => (i + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setGalleryIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isGalleryOpen])

  const openGallery = () => {
    setGalleryIndex(0)
    setIsGalleryOpen(true)
  }

  return (
    <>
      {/* Desktop hero (≥768px) — fit-открытка 1440×900 */}
      <div ref={fitRef} className="hero-fit hidden md:flex">
        <div className="hero-stage" style={{ transform: `scale(${scale})` }}>
          {/* Фоновое фото */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1440px] h-[830px] rounded-t-[24px] overflow-hidden">
            <img
              src={heroBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <Header mode="hero" />

          {/* Огромный заголовок Unique beauty / experience */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[40px] top-[115px] text-white text-[128px] tracking-[-7.68px] leading-[0.744] whitespace-nowrap"
          >
            <span className="font-light">Unique beauty</span>
            <br />
            <span className="italic font-normal">experience</span>
          </motion.h1>

          {/* Описание справа сверху */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[40px] top-[124px] w-[378px] text-right text-[18px] leading-[1.3] text-[rgba(255,246,246,0.95)]"
          >
            Наша линейка парфюма создана для тех, кто ценит индивидуальность.
            Каждый аромат — это гармония изысканных нот, которые подчеркнут ваш
            стиль и настроение
          </motion.p>

          {/* CTA — Перейти в каталог */}
          <motion.button
            type="button"
            onClick={() => navigate('/tovary')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2, delay: 0, ease: [0.22, 1, 0.36, 1] } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1, delay: 0 } }}
            className="absolute left-[40px] top-[380px] px-[24px] py-[16px] rounded-[64px] border border-[#cfcfcf] bg-[rgba(181,164,166,0.58)] backdrop-blur-md shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white text-[18px] font-bold leading-[1.3] tracking-[-0.18px] cursor-pointer"
          >
            Перейти в каталог
          </motion.button>

          {/* Описание слева снизу */}
          <p className="absolute left-[40px] top-[753px] w-[460px] text-[18px] font-medium leading-[1.3] text-white">
            Мы используем только натуральные ингредиенты и передовые технологии,
            чтобы создать парфюм, который остаётся с вами на весь день
          </p>

          {/* Группа карточек справа снизу: текст + флакон + видео */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[40px] top-[628px] flex items-center gap-[12px]"
          >
            {/* Текстовая карточка Desert Breeze */}
            <div className="flex flex-col justify-between items-end h-[249px] w-[282px] p-[24px] rounded-[24px] border border-white">
              <div className="flex flex-col items-end gap-[5px] w-full">
                <p className="w-full text-[36px] font-medium leading-[1.3] tracking-[-1.08px] text-white">
                  Desert Breeze
                </p>
                <p className="w-[153px] text-right text-[18px] leading-[1.3] text-[rgba(255,255,255,0.95)]">
                  это выбор тех,
                  <br />
                  кто стремится
                  <br />
                  к совершенству.
                </p>
              </div>
              <p className="w-full text-right text-[32px] leading-[1.3] tracking-[-0.96px] text-white">
                ₽ 24 490,00
              </p>
            </div>

            {/* Карточка флакона */}
            <div className="relative size-[230px] rounded-[24px] overflow-hidden bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              <img
                src={bottle}
                alt="Desert Breeze"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Открыть галерею флакона"
                onClick={openGallery}
                className="absolute top-[12px] right-[12px] w-[51px] h-[35px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-125 cursor-pointer"
              >
                <img src={arrowCorner} alt="" className="w-full h-full" />
              </button>
            </div>

            {/* Карточка видео-постер */}
            <div className="relative size-[230px] rounded-[24px] overflow-hidden bg-[#faeaca] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              <img
                src={videoPoster}
                alt="Превью видео"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Воспроизвести видео"
                onClick={() => setIsVideoOpen(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[50px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
              >
                <img src={play} alt="" className="size-[50px] rotate-90" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile hero (<768px) — вертикальная колонка */}
      <div className="md:hidden">
        <Header mode="flow" />

        {/* TOP — фото с заголовком и CTA */}
        <section className="relative overflow-hidden">
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative px-6 pt-10 pb-12 flex flex-col gap-7 text-white min-h-[560px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[52px] leading-[0.9] tracking-[-2.5px]"
            >
              <span className="font-light">Unique</span>
              <br />
              <span className="font-light">beauty</span>
              <br />
              <span className="italic font-normal">experience</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] leading-[1.45] text-white/95 max-w-[330px]"
            >
              Наша линейка парфюма создана для тех, кто ценит индивидуальность.
              Каждый аромат — это гармония изысканных нот, которые подчеркнут
              ваш стиль и настроение
            </motion.p>

            <motion.button
              type="button"
              onClick={() => navigate('/tovary')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
              className="self-start px-6 py-3.5 rounded-[64px] border border-[#cfcfcf] bg-[rgba(181,164,166,0.7)] backdrop-blur-md shadow-[0_4px_8px_rgba(0,0,0,0.25)] text-white text-[16px] font-bold tracking-[-0.16px] cursor-pointer"
            >
              Перейти в каталог
            </motion.button>
          </div>
        </section>

        {/* MID — карточка Desert Breeze, флакон, видео */}
        <section className="bg-[#1f1611] px-6 pt-9 pb-7">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="text-white text-[32px] font-medium leading-[1.1] tracking-[-0.96px]">
              Desert Breeze
            </p>
          </div>
          <p className="text-white/80 text-[15px] leading-[1.4] mb-3">
            это выбор тех, кто стремится к совершенству.
          </p>
          <p className="text-white text-[26px] font-medium tracking-[-0.78px] mb-7">
            ₽&nbsp;24&nbsp;490,00
          </p>

          <div className="flex flex-col gap-4">
            {/* Флакон */}
            <div className="relative aspect-square rounded-[24px] overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              <img
                src={bottle}
                alt="Desert Breeze"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Открыть галерею флакона"
                onClick={openGallery}
                className="absolute top-3 right-3 size-[44px] flex items-center justify-center active:scale-90 transition-transform"
              >
                <img src={arrowCorner} alt="" className="w-[40px] h-[28px]" />
              </button>
            </div>

            {/* Видео-карточка */}
            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#faeaca] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              <img
                src={videoPoster}
                alt="Превью видео"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Воспроизвести видео"
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center active:scale-95 transition-transform"
              >
                <img
                  src={play}
                  alt=""
                  className="size-[64px] rotate-90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                />
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM — нижний абзац */}
        <section className="bg-[#1f1611] px-6 pb-12">
          <p className="text-white text-[15px] leading-[1.5]">
            Мы используем только натуральные ингредиенты и передовые технологии,
            чтобы создать парфюм, который остаётся с вами на весь день
          </p>
        </section>
      </div>

      {/* Gallery modal — общий для обоих режимов */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            key="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsGalleryOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              key="gallery-frame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[640px] max-h-[90vh] bg-white rounded-[24px] overflow-hidden border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.45)] flex flex-col"
            >
              {/* Главное фото */}
              <div className="relative w-full aspect-square bg-[#f5f0e8] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryIndex}
                    src={GALLERY[galleryIndex].src}
                    alt={`Desert Breeze, ракурс «${GALLERY[galleryIndex].label}»`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Стрелки навигации */}
                <button
                  type="button"
                  aria-label="Предыдущий ракурс"
                  onClick={() =>
                    setGalleryIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-[44px] flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/10 text-black text-[20px] leading-none transition-transform duration-200 hover:scale-110 cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Следующий ракурс"
                  onClick={() =>
                    setGalleryIndex((i) => (i + 1) % GALLERY.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-[44px] flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/10 text-black text-[20px] leading-none transition-transform duration-200 hover:scale-110 cursor-pointer"
                >
                  ›
                </button>

                {/* Кнопка закрытия */}
                <button
                  type="button"
                  aria-label="Закрыть галерею"
                  onClick={() => setIsGalleryOpen(false)}
                  className="absolute top-3 right-3 size-[36px] flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.55)] bg-[rgba(234,221,225,0.85)] backdrop-blur-sm text-black text-[18px] leading-none transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Тамбнейлы + подпись */}
              <div className="px-5 py-4 flex items-center gap-3 bg-white border-t border-black/5">
                <p className="text-[14px] text-black/70 font-medium min-w-[80px]">
                  {GALLERY[galleryIndex].label}
                </p>
                <div className="flex gap-2 ml-auto">
                  {GALLERY.map((g, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      aria-label={`Показать ракурс «${g.label}»`}
                      className={`relative size-[56px] rounded-[10px] overflow-hidden border-2 transition-all ${
                        i === galleryIndex
                          ? 'border-black/70 scale-[1.05]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={g.src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal — общий для обоих режимов */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            key="video-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              key="video-frame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] rounded-[24px] overflow-hidden border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            >
              <video
                src={desertBreezeVideo}
                poster={videoPoster}
                controls
                autoPlay
                playsInline
                className="block max-w-[90vw] max-h-[85vh]"
              />
              <button
                type="button"
                aria-label="Закрыть видео"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-[12px] right-[12px] size-[36px] flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.55)] bg-[rgba(234,221,225,0.85)] backdrop-blur-sm text-black text-[18px] leading-none transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
