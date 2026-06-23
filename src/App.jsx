import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import ChatBot from './components/ChatBot'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const AdCreator = lazy(() => import('./pages/AdCreator'))
const SeoGenerator = lazy(() => import('./pages/SeoGenerator'))
const NicheAnalyzer = lazy(() => import('./pages/NicheAnalyzer'))
const Branding = lazy(() => import('./pages/Branding'))
const LaunchPlan = lazy(() => import('./pages/LaunchPlan'))
const EmailSequence = lazy(() => import('./pages/EmailSequence'))
const SalesPage = lazy(() => import('./pages/SalesPage'))
const SocialCalendar = lazy(() => import('./pages/SocialCalendar'))
const PricingStrategy = lazy(() => import('./pages/PricingStrategy'))
const CompetitorAnalysis = lazy(() => import('./pages/CompetitorAnalysis'))
const YouTubeScript = lazy(() => import('./pages/YouTubeScript'))
const ReelsScript = lazy(() => import('./pages/ReelsScript'))
const SocialBio = lazy(() => import('./pages/SocialBio'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ads" element={<AdCreator />} />
          <Route path="/seo" element={<SeoGenerator />} />
          <Route path="/nicho" element={<NicheAnalyzer />} />
          <Route path="/branding" element={<Branding />} />
          <Route path="/lanzamiento" element={<LaunchPlan />} />
          <Route path="/email" element={<EmailSequence />} />
          <Route path="/ventas" element={<SalesPage />} />
          <Route path="/contenido" element={<SocialCalendar />} />
          <Route path="/precios" element={<PricingStrategy />} />
          <Route path="/competencia" element={<CompetitorAnalysis />} />
          <Route path="/youtube" element={<YouTubeScript />} />
          <Route path="/reels" element={<ReelsScript />} />
          <Route path="/bio" element={<SocialBio />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <>
      <ChatBot />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <AnimatedRoutes />
      </Suspense>
    </>
  )
}

export default App
