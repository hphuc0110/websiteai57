import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import ThankYouPage from './pages/ThankYouPage'
import RoadmapPage from './pages/RoadmapPage'
import WorkshopDetailPage from './pages/WorkshopDetailPage'
import FAQPage from './pages/FAQPage'
import HLEPage from './pages/HLEPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import FacebookPixelPageViews from './components/FacebookPixelPageViews'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FacebookPixelPageViews />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cam-on" element={<ThankYouPage />} />
        <Route path="/lo-trinh" element={<RoadmapPage />} />
        <Route
          path="/lo-trinh/module/:moduleId/workshop/:wsCode"
          element={<WorkshopDetailPage />}
        />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/hle" element={<HLEPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
