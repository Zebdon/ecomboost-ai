import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import WaitlistModal from '../components/WaitlistModal'
import StatsBar from '../components/StatsBar'
import HeroDemo from '../components/HeroDemo'
import { useLang } from '../contexts/LangContext'
import heroPhoto from '../assets/hero-photo-new.jpg'
import testimonial1 from '../assets/testimonial-1.jpg'
import testimonial2 from '../assets/testimonial-2.jpg'
import testimonial3 from '../assets/testimonial-3.jpg'

const TOOL_STYLES = [
  { path: '/ads',         bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', iconColor: 'text-[#9c3c14]', btn: 'bg-[#E8642A]' },
  { path: '/seo',         bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]', iconColor: 'text-[#1e5f96]', btn: 'bg-[#2f7fc4]' },
  { path: '/nicho',       bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', iconColor: 'text-[#2d7a42]', btn: 'bg-[#3f9c58]' },
  { path: '/branding',    bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', iconColor: 'text-[#6938b5]', btn: 'bg-[#7e4fd1]' },
  { path: '/lanzamiento', bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]', iconColor: 'text-[#9c6d0e]', btn: 'bg-[#d4970f]' },
  { path: '/email',       bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]', iconColor: 'text-[#1e5f96]', btn: 'bg-[#2f7fc4]' },
  { path: '/ventas',      bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', iconColor: 'text-[#9c3c14]', btn: 'bg-[#E8642A]' },
  { path: '/contenido',   bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', iconColor: 'text-[#2d7a42]', btn: 'bg-[#3f9c58]' },
  { path: '/precios',     bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]', iconColor: 'text-[#9c6d0e]', btn: 'bg-[#d4970f]' },
  { path: '/competencia', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', iconColor: 'text-[#6938b5]', btn: 'bg-[#7e4fd1]' },
  { path: '/youtube',     bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', iconColor: 'text-[#9c3c14]', btn: 'bg-[#E8642A]' },
  { path: '/reels',       bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', iconColor: 'text-[#6938b5]', btn: 'bg-[#7e4fd1]' },
  { path: '/bio',         bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', iconColor: 'text-[#2d7a42]', btn: 'bg-[#3f9c58]' },
]

const FAQ_STYLES = [
  { bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', accent: '#E8642A' },
  { bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]', accent: '#2f7fc4' },
  { bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', accent: '#3f9c58' },
  { bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', accent: '#7e4fd1' },
  { bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]', accent: '#d4970f' },
  { bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', accent: '#9c3c14' },
]

const TESTIMONIAL_PHOTOS = [testimonial1, testimonial2, testimonial3]

function FaqItem({ question, answer, bg, border, accent }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      className={`${bg} border ${border} rounded-2xl px-5 py-4 cursor-pointer select-none transition-shadow hover:shadow-md`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <span className="text-sm font-semibold text-gray-900 leading-snug">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: accent }}
          className="text-xl font-bold shrink-0 inline-block w-6 text-center"
        >+</motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-600 leading-relaxed mt-3 pr-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToTools = () => document.getElementById('herramientas')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Barra de anuncio */}
      <a
        href="https://cyntiaze.gumroad.com/l/uapcse"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#E8642A] text-white text-center text-xs font-semibold py-2 px-4 hover:bg-[#d6551e] transition-colors"
        dangerouslySetInnerHTML={{ __html: t.banner }}
      />
      <Navbar />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      {/* Hero */}
      <section
        className="px-5 lg:px-12 pt-10 lg:pt-20 pb-16 lg:pb-24 relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle, #e2c5b3 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="inline-block text-[10px] font-semibold tracking-widest text-[#9c3c14] bg-[#FBE9E0] border border-[#E8642A]/25 px-3 py-1 rounded-full mb-5 uppercase"
              >
                {t.hero.badge}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-3"
              >
                {t.hero.title}{' '}
                <em className="not-italic text-[#E8642A]">{t.hero.accent}</em>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
                className="text-sm lg:text-lg text-gray-600 leading-relaxed mb-7"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3 }}
                className="flex gap-3 flex-wrap mb-4"
              >
                <a href="https://cyntiaze.gumroad.com/l/npbjqy" target="_blank" rel="noopener noreferrer"
                  className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
                >
                  {t.hero.ctaPrimary}
                </a>
                <button onClick={scrollToTools}
                  className="bg-[#2f7fc4] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#256aa6] transition-all hover:scale-105 active:scale-95"
                >
                  {t.hero.ctaSecondary}
                </button>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.45 }}
                className="text-xs text-gray-500 mb-10 lg:mb-0"
              >
                {t.hero.trust}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 lg:mb-0"
            >
              <img src={heroPhoto} alt="Digital business" loading="eager" fetchPriority="high" width="600" height="420"
                className="w-full rounded-2xl object-cover h-56 sm:h-72 lg:h-full lg:max-h-[420px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <StatsBar />
      <HeroDemo />

      {/* Herramientas */}
      <section className="px-5 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div id="herramientas" className="mb-8 lg:mb-10 scroll-mt-20 mt-12 lg:mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">{t.toolsSection.label}</p>
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">{t.toolsSection.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-24">
            {t.tools.map((tool, i) => {
              const style = TOOL_STYLES[i]
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`${style.bg} border ${style.border} rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer`}
                >
                  <div className="flex gap-3 items-start mb-3">
                    <div className="w-10 h-10 min-w-10 rounded-xl bg-white flex items-center justify-center text-lg">{tool.icon}</div>
                    <div>
                      <div className="text-sm font-bold mb-1">{tool.title}</div>
                      <div className="text-xs text-gray-600 leading-relaxed">{tool.desc}</div>
                      {tool.tags.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {tool.tags.map((tag, j) => (
                            <span key={j} className={`text-[9px] font-semibold ${style.iconColor} bg-white px-2 py-0.5 rounded-full`}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Link to={style.path}
                    className={`${style.btn} text-white text-xs font-bold px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 inline-block`}
                  >
                    {t.toolsSection.try}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="px-5 lg:px-12 py-12 lg:py-16 bg-[#1C1A17]">
        <div className="max-w-6xl mx-auto">
          <div id="testimonios" className="mb-8 lg:mb-10 scroll-mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#E8642A] uppercase mb-2">{t.testimonialsSection.label}</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-8">{t.testimonialsSection.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {t.testimonials.map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 hover:bg-white/10 transition-colors"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={TESTIMONIAL_PHOTOS[i]} alt={testimonial.name} loading="lazy" className="w-9 h-9 min-w-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-white">{testimonial.name}</div>
                    <div className="text-[11px] text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="text-[#E8642A] text-lg mb-1">★★★★★</div>
                <p className="text-xs text-gray-300 leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-5 lg:px-12 py-12 lg:py-16 bg-[#111009]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-semibold tracking-widest text-[#E8642A] uppercase mb-2">{t.howItWorks.label}</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">{t.howItWorks.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            {t.howItWorks.steps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8642A]/15 border border-[#E8642A]/30 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                <span className="text-[10px] font-bold tracking-widest text-[#E8642A] mb-1">{item.step}</span>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="bg-[#FBE9E0] pt-10 pb-10 lg:pt-16 lg:pb-16 px-5 lg:px-12 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">{t.pricing.label}</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{t.pricing.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{t.pricing.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {/* Plan Mensual */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="inline-block bg-[#FBE9E0] text-[#9c3c14] border border-[#f0c5ab] text-[10px] font-bold px-3 py-1 rounded-full">{t.pricing.monthly.badge}</span>
                <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-3 py-1 rounded-full">{t.pricing.monthly.guarantee}</span>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold tracking-tighter">{t.pricing.monthly.price}</span>
                <span className="text-sm text-gray-500 mb-2">{t.pricing.monthly.period}</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">{t.pricing.monthly.sub}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {t.pricing.monthly.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><span className="text-[#E8642A]">✓</span>{perk}</li>
                ))}
              </ul>
              <a href="https://cyntiaze.gumroad.com/l/npbjqy" target="_blank" rel="noopener noreferrer"
                className="w-full bg-gray-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-black transition-all hover:scale-[1.02] active:scale-95 block text-center"
              >
                {t.pricing.monthly.cta}
              </a>
            </motion.div>

            {/* Plan Vitalicio */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl shadow-[0_20px_50px_rgba(232,100,42,0.2)] border-2 border-[#E8642A]/30"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E8642A]"></div>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="inline-block bg-[#E8642A] text-white text-[10px] font-bold px-3 py-1 rounded-full">{t.pricing.lifetime.badge}</span>
                <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-3 py-1 rounded-full">{t.pricing.lifetime.guarantee}</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-extrabold tracking-tighter">{t.pricing.lifetime.price}</span>
                <span className="text-xs text-gray-400 line-through mb-2">{t.pricing.lifetime.oldPrice}</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">{t.pricing.lifetime.sub}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {t.pricing.lifetime.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><span className="text-[#E8642A]">✓</span>{perk}</li>
                ))}
              </ul>
              <div className="mb-5">
                <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1.5">
                  <span>{t.pricing.lifetime.spotsLabel}</span>
                  <span className="text-[#E8642A]">{t.pricing.lifetime.spotsCount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div className="bg-[#E8642A] h-2 rounded-full" initial={{ width: 0 }}
                    whileInView={{ width: '13%' }} viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{t.pricing.lifetime.spotsNote}</p>
              </div>
              <a href="https://cyntiaze.gumroad.com/l/uapcse" target="_blank" rel="noopener noreferrer"
                className="w-full bg-[#E8642A] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-[1.02] active:scale-95 block text-center"
              >
                {t.pricing.lifetime.cta}
              </a>
              <p className="text-[11px] text-gray-500 text-center mt-3">{t.pricing.lifetime.risk}</p>
            </motion.div>
          </div>
          <div className="mt-5 bg-white/70 rounded-xl px-4 py-3 text-center">
            <p className="text-[11px] text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">{t.pricing.howLabel}</span><br />{t.pricing.howText}
            </p>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="px-5 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div id="comunidad" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}
            className="bg-gray-50 -mx-5 lg:-mx-12 px-5 lg:px-12 py-10 lg:py-16 mb-16 lg:mb-0 scroll-mt-20"
          >
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">{t.community.label}</p>
            <h2 className="text-xl font-extrabold tracking-tight mb-3">{t.community.title}</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">{t.community.text}</p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://www.instagram.com/cyntiazebaze" target="_blank" rel="noopener noreferrer"
                className="flex-1 min-w-[120px] bg-gradient-to-r from-[#f9437a] to-[#e8642a] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >📸 Instagram</a>
              <a href="https://www.linkedin.com/in/cyntia-zebaze-dondjio-45a679152" target="_blank" rel="noopener noreferrer"
                className="flex-1 min-w-[120px] bg-[#0a66c2] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >💼 LinkedIn</a>
              <a href="https://twitter.com/cantandoparaiso" target="_blank" rel="noopener noreferrer"
                className="flex-1 min-w-[120px] bg-[#2f7fc4] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >𝕏 Twitter</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 lg:px-12 py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">{t.faq.label}</p>
          <h2 className="text-2xl font-extrabold tracking-tight mb-8">{t.faq.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.faq.items.map((item, i) => (
              <FaqItem key={`${i}-${item.q}`} question={item.q} answer={item.a}
                bg={FAQ_STYLES[i]?.bg || 'bg-[#FBE9E0]'}
                border={FAQ_STYLES[i]?.border || 'border-[#f0c5ab]'}
                accent={FAQ_STYLES[i]?.accent || '#E8642A'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <motion.section initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-[#1C1A17] py-16 lg:py-24 px-5 text-center"
      >
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">{t.cta.title}</h2>
        <p className="text-sm lg:text-base text-gray-400 mb-8 max-w-md mx-auto">{t.cta.subtitle}</p>
        <a href="https://cyntiaze.gumroad.com/l/npbjqy" target="_blank" rel="noopener noreferrer"
          className="inline-block bg-[#E8642A] text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
        >
          {t.cta.btn}
        </a>
      </motion.section>

      {/* Footer */}
      <footer className="px-5 py-6 border-t border-black/10">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <div className="text-sm font-bold">Zebcy<span className="text-[#E8642A]">Tec</span></div>
          <div className="flex gap-4 flex-wrap">
            <a href="#herramientas" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">{t.footer.tools}</a>
            <a href="#precio" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">{t.footer.price}</a>
            <a href="#faq" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">{t.footer.faq}</a>
            <Link to="/privacy" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Terms</Link>
          </div>
        </div>
        <div className="flex gap-3 justify-center mb-4">
          <a href="https://www.instagram.com/cyntiazebaze" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm hover:bg-[#E8642A] hover:text-white transition-all">📸</a>
          <a href="https://www.linkedin.com/in/cyntia-zebaze-dondjio-45a679152" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm hover:bg-[#0a66c2] hover:text-white transition-all">💼</a>
          <a href="https://twitter.com/cantandoparaiso" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm hover:bg-[#2f7fc4] hover:text-white transition-all">𝕏</a>
        </div>
        <p className="text-[10px] text-gray-400 text-center">© {new Date().getFullYear()} ZebcyTec. {t.footer.rights}</p>
      </footer>

      {showScrollTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#E8642A] text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-[#d6551e] transition-all hover:scale-110 z-50"
          aria-label="Scroll to top"
        >↑</button>
      )}
    </div>
  )
}

export default Home
