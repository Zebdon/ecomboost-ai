import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AdCreator from './pages/AdCreator'
import SeoGenerator from './pages/SeoGenerator'
import NicheAnalyzer from './pages/NicheAnalyzer'
import Branding from './pages/Branding'
import LaunchPlan from './pages/LaunchPlan'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  return (
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
  )
}

export default App