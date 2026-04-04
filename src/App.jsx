import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Public pages
import Home      from './pages/Home'
import Services  from './pages/Services'
import Portfolio from './pages/Portfolio'
import About     from './pages/About'
import Contact   from './pages/Contact'

// ── Layout: public pages (with Navbar + Footer) ───────────────────
function PublicLayout({ children }) {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1614',
            color: '#e2eeec',
            border: '1px solid rgba(0,150,136,0.3)',
            borderRadius: '14px',
            fontFamily: 'Satoshi, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#009688', secondary: '#000' } },
        }}
      />
      <Routes>
        <Route path="/"          element={<PublicLayout><Home      /></PublicLayout>} />
        <Route path="/services"  element={<PublicLayout><Services  /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/about"     element={<PublicLayout><About     /></PublicLayout>} />
        <Route path="/contact"   element={<PublicLayout><Contact   /></PublicLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return <AppRoutes />
}
