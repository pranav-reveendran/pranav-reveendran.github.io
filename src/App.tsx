/**
 * Main App component that sets up routing and service worker registration
 * for the portfolio website.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ServiceWorkerRegistration />
      </Router>
    </ErrorBoundary>
  )
}

export default App
