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
    text: 'El analizador de nicho me evitó invertir en un producto que no era rentable. Solo eso ya vale los $29.',
  },
  {
    photo: testimonial3,
    name: 'Laura P.',
    role: 'Tienda de decoración',
    text: 'El branding instantáneo me dio el nombre y el slogan de mi marca en minutos. Antes llevaba semanas pensándolo.',
  },
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-5 py-4 cursor-pointer select-none hover:bg-white/60 transition-colors" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center gap-4">
        <span className="text-sm font-semibold text-gray-900">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#E8642A] text-lg font-bold shrink-0 inline-block"
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
            <p className="text-sm text-gray-500 leading-relaxed mt-3 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="bg-[#E8642A] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
                >
                  Acceso Anticipado — $29
                </button>
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
                🔒 Pago único · Sin suscripción · Acceso de por vida
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 lg:mb-0"
            >
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                src={pricingPhoto}
                alt="Emprendedora gestionando su tienda online"
                className="w-full rounded-2xl object-cover h-48 lg:h-full lg:max-h-[420px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Herramientas + Testimonios — fondo blanco */}
      <section className="px-5 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">

          <div id="herramientas" className="mb-8 lg:mb-10 scroll-mt-20 mt-12 lg:mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Herramientas</p>
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Todo lo que necesitas para dominar</h2>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-24">
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

          {/* Testimonios */}
          <div id="testimonios" className="mb-8 lg:mb-10 scroll-mt-20">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Testimonios</p>
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Emprendedores que ya están escalando</h2>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-24">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 lg:p-6"
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-9 h-9 min-w-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-[11px] text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="bg-[#FBE9E0] py-16 lg:py-24 px-5 lg:px-12 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Precio</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Valida tu idea hoy mismo.</h2>
          </div>

          <div className="lg:grid lg:grid-cols-5 lg:gap-10 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl shadow-[0_20px_50px_rgba(232,100,42,0.25)]"
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
              <div className="text-5xl font-extrabold tracking-tighter mb-1">$29</div>
              <p className="text-xs text-gray-600 mb-5">Pago único · <span className="text-[#E8642A] font-semibold">Precio sube a $79 en el lanzamiento</span></p>
              <ul className="flex flex-col gap-2 mb-6">
                {[
                  'Acceso completo a las 5 herramientas IA',
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

              <button
                onClick={() => setWaitlistOpen(true)}
                className="w-full bg-[#E8642A] text-white font-bold text-sm py-3.5 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-[1.02] active:scale-95"
              >
                Unirme a la lista de espera
              </button>
              <p className="text-[11px] text-gray-500 text-center mt-3">🔒 Sin riesgo · Si no te convence, te devolvemos el dinero</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block lg:col-span-3"
            >
              <img
                src={heroPhoto}
                alt="Resultados de tu tienda online"
                className="w-full rounded-2xl object-cover h-full max-h-[420px] shadow-xl"
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2f7fc4] text-white rounded-xl p-3 text-center text-xs font-semibold transition-all hover:scale-[1.03] hover:shadow-md"
              >
                𝕏 Twitter
              </a>
              <a
                href="https://discord.com"
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
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">FAQ</p>
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Preguntas frecuentes</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100"
          >
            {[
              {
                q: '¿Necesito experiencia técnica para usarlo?',
                a: 'No. Solo describes tu producto o nicho en un campo de texto y la IA genera el resultado en segundos. No hay configuración ni conocimientos previos necesarios.',
              },
              {
                q: '¿Los resultados son únicos o genéricos?',
                a: 'Cada generación es única y personalizada para tu producto. El modelo analiza la descripción que introduces y crea contenido específico, no plantillas copiadas.',
              },
              {
                q: '¿Qué pasa si no me convence?',
                a: 'Tienes 30 días de garantía total. Si no ves valor en las herramientas, te devolvemos el dinero sin preguntas.',
              },
              {
                q: '¿Para qué tipo de tienda funciona?',
                a: 'Para cualquier eCommerce: dropshipping, marca propia, infoproductos, servicios digitales. Si vendes algo online, EcomBoost AI te ayuda a hacerlo mejor.',
              },
              {
                q: '¿Cuántas veces puedo usar las herramientas?',
                a: 'Usos ilimitados. No hay créditos ni límites mensuales. Paga una vez y úsalo siempre.',
              },
              {
                q: '¿Qué incluye exactamente el pago único de $29?',
                a: 'Acceso completo a las 5 herramientas (Ads, SEO, Nicho, Branding y Plan de Lanzamiento), actualizaciones del modelo de IA y soporte prioritario. Sin suscripción mensual.',
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </motion.div>
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
        <button
          onClick={() => setWaitlistOpen(true)}
          className="bg-[#E8642A] text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-[#d6551e] transition-all hover:scale-105 active:scale-95"
        >
          Empezar ahora — $29
        </button>
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
            <a href="#" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Privacy</a>
            <a href="#" className="text-[11px] text-gray-500 hover:text-[#E8642A] transition-colors">Terms</a>
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
