import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const AdCreator = lazy(() => import('./pages/AdCreator'))
const SeoGenerator = lazy(() => import('./pages/SeoGenerator'))
const NicheAnalyzer = lazy(() => import('./pages/NicheAnalyzer'))
const Branding = lazy(() => import('./pages/Branding'))
const LaunchPlan = lazy(() => import('./pages/LaunchPlan'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ads" element={<AdCreator />} />
        <Route path="/seo" element={<SeoGenerator />} />
        <Route path="/nicho" element={<NicheAnalyzer />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/lanzamiento" element={<LaunchPlan />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App