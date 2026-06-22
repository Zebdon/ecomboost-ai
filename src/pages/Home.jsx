import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import WaitlistModal from '../components/WaitlistModal'
import heroPhoto from '../assets/hero-photo-new.jpg'
import pricingPhoto from '../assets/hero-photo.jpg'
import testimonial1 from '../assets/testimonial-1.jpg'
import testimonial2 from '../assets/testimonial-2.jpg'
import testimonial3 from '../assets/testimonial-3.jpg'

const tools = [
  {
    icon: '📣',
    title: 'Creador de Ads Multi-canal',
    path: '/ads',
    desc: 'Copy para Facebook, Instagram y TikTok que detiene el scroll. Genera variaciones optimizadas para conversión.',
    tags: ['High-CTR', 'A/B Testing'],
    bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', iconColor: 'text-[#9c3c14]', btn: 'bg-[#E8642A]',
  },
  {
    icon: '🔍',
    title: 'Generador SEO',
    path: '/seo',
    desc: 'Descripciones que venden y posicionan en Google. Olvida el contenido genérico.',
    tags: [],
    bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]', iconColor: 'text-[#1e5f96]', btn: 'bg-[#2f7fc4]',
  },
  {
    icon: '📊',
    title: 'Analizador de Nicho',
    path: '/nicho',
    desc: 'Descubre si tu producto es rentable antes de invertir un euro. Datos reales, no intuiciones.',
    tags: [],
    bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', iconColor: 'text-[#2d7a42]', btn: 'bg-[#3f9c58]',
  },
  {
    icon: '🎨',
    title: 'Branding Instantáneo',
    path: '/branding',
    desc: 'Nombres y slogans potentes para tu marca. Identidad visual lista para lanzar.',
    tags: [],
    bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', iconColor: 'text-[#6938b5]', btn: 'bg-[#7e4fd1]',
  },
  {
    icon: '🚀',
    title: 'Plan de Lanzamiento',
    path: '/lanzamiento',
    desc: 'Tu checklist personalizado paso a paso para no saltarte ningún detalle crítico.',
    tags: [],
    bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]', iconColor: 'text-[#9c6d0e]', btn: 'bg-[#d4970f]',
  },
]

const testimonials = [
  {
    photo: testimonial1,
    name: 'Marta R.',
    role: 'Tienda de cosmética natural',
    text: 'En menos de una semana validé mi nicho y lancé mis primeros anuncios. El generador de ads me ahorró horas de trabajo.',
  },
  {
    photo: testimonial2,
    name: 'Javier D.',
    role: 'eCommerce de accesorios',
    text: 'El analizador de nicho me evitó invertir en un producto que no era rentable. Solo eso ya vale los €29.',
  },
  {
    photo: testimonial3,
    name: 'Laura P.',
    role: 'Tienda de decoración',
    text: 'El branding instantáneo me dio el nombre y el slogan de mi marca en minutos. Antes llevaba semanas pensándolo.',
  },
]

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToTools = () => {
    document.getElementById('herramientas')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Barra de anuncio */}
      <a
        href="https://cyntiaze.gumroad.com/l/uapcse"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#E8642A] text-white text-center text-xs font-semibold py-2 px-4 hover:bg-[#d6551e] transition-colors"
      >
        🔥 Early Bird: solo quedan <strong>13 plazas</strong> a €29 — El precio sube a €79 →
      </a>
      <Navbar />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      {/* Hero — fondo de puntos solo en esta sección */}
      <section
        className="px-5 lg:px-12 pt-10 lg:pt-20 pb-16 lg:pb-24 relative overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2c5b3 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="inline-block text-[10px] font-semibold tracking-widest text-[#9c3c14] bg-[#FBE9E0] border border-[#E8642A]/25 px-3 py-1 rounded-full mb-5 uppercase"
              >
                Poder de IA para eCommerce
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-3"
              >
                Escala tu tienda con{' '}
                <em className="not-italic text-[#E8642A]">Inteligencia Artificial</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="text-sm lg:text-lg text-gray-600 leading-relaxed mb-7"
              >
                5 herramientas de alta velocidad para validar tu idea, crear tus ads y lanzar tu tienda en minutos.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="flex gap-3 flex-wrap mb-4"
              >
                <a
                  href="https://cyntiaze.gumroad.com/l/uapcse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
                >
                  Acceso Anticipado — €29
                </a>
                <button
                  onClick={scrollToTools}
                  className="bg-[#2f7fc4] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#256aa6] transition-all hover:scale-105 active:scale-95"
                >
                  Ver Demo
                </button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="text-xs text-gray-500 mb-10 lg:mb-0"
              >
                🔒 Pago único · Acceso web inmediato · Sin suscripción
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 lg:mb-0"
            >
              <img
                src={pricingPhoto}
                alt="Emprendedora gestionando su tienda online"
                loading="eager"
                fetchPriority="high"
                width="600"
                height="420"
                className="w-full rounded-2xl object-cover h-56 sm:h-72 lg:h-full lg:max-h-[420px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Herramientas + Testimonios */}
      <section className="px-5 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">

          <div id="herramientas" className="mb-8 lg:mb-10 scroll-mt-20 mt-12 lg:mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Herramientas</p>
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Todo lo que necesitas para dominar</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-24">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${tool.bg} border ${tool.border} rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer`}
              >
                <div className="flex gap-3 items-start mb-3">
                  <div className="w-10 h-10 min-w-10 rounded-xl bg-white flex items-center justify-center text-lg">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1">{tool.title}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{tool.desc}</div>
                    {tool.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {tool.tags.map((tag, j) => (
                          <span key={j} className={`text-[9px] font-semibold ${tool.iconColor} bg-white px-2 py-0.5 rounded-full`}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  to={tool.path}
                  className={`${tool.btn} text-white text-xs font-bold px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 inline-block`}
                >
                  Probar ahora
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonios — fondo oscuro */}
      <section className="px-5 lg:px-12 py-12 lg:py-16 bg-[#1C1A17]">
        <div className="max-w-6xl mx-auto">
          <div id="testimonios" className="mb-8 lg:mb-10 scroll-mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#E8642A] uppercase mb-2">Testimonios</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-8">Emprendedores que ya están escalando</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 hover:bg-white/10 transition-colors"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    className="w-9 h-9 min-w-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-gray-400">{t.role}</div>
                  </div>
                </div>
                <div className="text-[#E8642A] text-lg mb-1">★★★★★</div>
                <p className="text-xs text-gray-300 leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona — fondo oscuro con patrón */}
      <section className="px-5 lg:px-12 py-12 lg:py-16 bg-[#111009]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-semibold tracking-widest text-[#E8642A] uppercase mb-2">Simple y rápido</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Cómo funciona</h2>
            <p className="text-sm text-gray-400 mt-2">Sin curva de aprendizaje. En menos de 60 segundos tienes tu resultado.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            {[
              { step: '01', icon: '✍️', title: 'Describe tu producto o nicho', desc: 'Escribe en lenguaje natural lo que vendes o quieres analizar. No necesitas conocimientos técnicos.' },
              { step: '02', icon: '⚡', title: 'La IA genera el resultado', desc: 'Nuestro modelo analiza tu descripción y crea contenido único optimizado para conversión en segundos.' },
              { step: '03', icon: '🚀', title: 'Copia y usa directamente', desc: 'El resultado está listo para pegar en Shopify, Meta Ads, TikTok o donde lo necesites. Sin editar.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8642A]/15 border border-[#E8642A]/30 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#E8642A] mb-1">{item.step}</span>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="bg-[#FBE9E0] pt-6 pb-6 lg:pt-8 lg:pb-8 px-5 lg:px-12 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 text-center lg:text-left">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Precio</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Valida tu idea hoy mismo.</h2>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl shadow-[0_20px_50px_rgba(232,100,42,0.25)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E8642A]"></div>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="inline-block bg-[#E8642A] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  ⚡ Early Bird Plan
                </span>
                <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-3 py-1 rounded-full">
                  🛡️ 30 días de garantía
                </span>
              </div>
              <div className="text-5xl font-extrabold tracking-tighter mb-1">€29</div>
              <p className="text-xs text-gray-600 mb-5">Pago único · <span className="text-[#E8642A] font-semibold">Precio sube a €79 en el lanzamiento</span></p>
              <ul className="flex flex-col gap-2 mb-6">
                {[
                  'Acceso web instantáneo — usas las herramientas en tu navegador',
                  'Las 5 herramientas IA desbloqueadas desde el primer día',
                  'Actualizaciones semanales de modelos',
                  'Soporte prioritario 24/7',
                  'Usos ilimitados para siempre',
                ].map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-[#E8642A]">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Barra de plazas */}
              <div className="mb-5">
                <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1.5">
                  <span>Plazas disponibles</span>
                  <span className="text-[#E8642A]">87 de 100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-[#E8642A] h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '13%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Solo quedan 13 plazas a este precio</p>
              </div>

              <a
                href="https://cyntiaze.gumroad.com/l/uapcse"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E8642A] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-[1.02] active:scale-95 block text-center"
              >
                Comprar ahora — €29
              </a>
              <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-600 leading-relaxed text-center">
                  <span className="font-semibold text-gray-800">¿Cómo funciona el acceso?</span><br />
                  Pagas en Gumroad → recibes un email con el link → entras a la app y usas las 5 herramientas desde tu navegador.
                </p>
              </div>
              <p className="text-[11px] text-gray-500 text-center mt-2">🔒 Sin riesgo · Si no te convence, te devolvemos el dinero</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex"
            >
              <img
                src={heroPhoto}
                alt="Resultados de tu tienda online"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-full shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Build in Public */}
          <motion.div
            id="comunidad"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 -mx-5 lg:-mx-12 px-5 lg:px-12 py-10 lg:py-16 mb-16 lg:mb-0 scroll-mt-20"
          >
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Comunidad</p>
            <h2 className="text-xl font-extrabold tracking-tight mb-3">Build in Public</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Compartimos nuestro roadmap, mejoras y procesos de desarrollo con nuestra comunidad. EcomBoost AI no es solo una herramienta, es un ecosistema impulsado por sus propios usuarios.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/cantandoparaiso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2f7fc4] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >
                𝕏 Twitter
              </a>
              <a
                href="https://discord.gg/6xxCantnK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#7e4fd1] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >
                💬 Discord
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 lg:px-12 py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">FAQ</p>
          <h2 className="text-2xl font-extrabold tracking-tight mb-8">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { q: '¿Necesito experiencia técnica para usarlo?', a: 'No. Solo describes tu producto en un campo de texto y la IA genera el resultado en segundos. Sin configuración ni conocimientos previos.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', accent: '#E8642A' },
              { q: '¿Los resultados son únicos o genéricos?', a: 'Cada generación es única y personalizada. El modelo analiza tu descripción y crea contenido específico para tu producto, no plantillas copiadas.', bg: 'bg-[#E9F1FA]', border: 'border-[#c2dbf0]', accent: '#2f7fc4' },
              { q: '¿Qué pasa si no me convence?', a: 'Tienes 30 días de garantía total. Si no ves valor en las herramientas, te devolvemos el dinero sin preguntas.', bg: 'bg-[#EAF5EC]', border: 'border-[#c2e2c9]', accent: '#3f9c58' },
              { q: '¿Para qué tipo de tienda funciona?', a: 'Para cualquier eCommerce: dropshipping, marca propia, infoproductos o servicios digitales. Si vendes algo online, EcomBoost AI te ayuda a hacerlo mejor.', bg: 'bg-[#F0EBFA]', border: 'border-[#d9cdf0]', accent: '#7e4fd1' },
              { q: '¿Cuántas veces puedo usar las herramientas?', a: 'Usos ilimitados. No hay créditos ni límites mensuales. Paga una vez y úsalo siempre, con todas las actualizaciones incluidas.', bg: 'bg-[#FBF1DF]', border: 'border-[#f0dba8]', accent: '#d4970f' },
              { q: '¿Qué incluye el pago único de €29?', a: 'Acceso completo a las 5 herramientas (Ads, SEO, Nicho, Branding y Plan de Lanzamiento), actualizaciones del modelo de IA y soporte prioritario. Sin suscripción mensual.', bg: 'bg-[#FBE9E0]', border: 'border-[#f0c5ab]', accent: '#9c3c14' },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} bg={item.bg} border={item.border} accent={item.accent} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final oscuro */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-[#1C1A17] py-16 lg:py-24 px-5 text-center"
      >
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
          ¿Listo para escalar tu tienda?
        </h2>
        <p className="text-sm lg:text-base text-gray-400 mb-8 max-w-md mx-auto">
          Únete a los emprendedores que ya están usando IA para vender más, sin perder tiempo ni dinero.
        </p>
        <a
          href="https://cyntiaze.gumroad.com/l/uapcse"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#E8642A] text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
        >
          Empezar ahora — €29
        </a>
      </motion.section>

      {/* Footer */}
      <footer className="px-5 py-6 border-t border-black/10">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
          <div className="text-sm font-bold">
            Ecom<span className="text-[#E8642A]">Boost</span> AI
          </div>
          <div className="flex gap-4">
            <a href="#herramientas" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Features</a>
            <a href="#precio" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Pricing</a>
            <a href="#faq" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">FAQ</a>
            <Link to="/privacy" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Terms</Link>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center">© {new Date().getFullYear()} EcomBoost AI. All Rights Reserved.</p>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#E8642A] text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-[#d6551e] transition-all hover:scale-110 z-50"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default Home
