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
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminNewsListPage from './pages/admin/AdminNewsListPage'
import AdminNewsEditorPage from './pages/admin/AdminNewsEditorPage'
import RequireAuth from './components/admin/RequireAuth'
import FacebookPixelPageViews from './components/FacebookPixelPageViews'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
          <Route path="/admin/dang-nhap" element={<AdminLoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin/tin-tuc" element={<AdminNewsListPage />} />
            <Route path="/admin/tin-tuc/:id" element={<AdminNewsEditorPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
