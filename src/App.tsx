import { Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import AccountLayout from './components/account/AccountLayout'
import Home from './pages/Home'
import About from './pages/About'
import Business from './pages/Business'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Team from './pages/Team'
import Reviews from './pages/Reviews'
import Partners from './pages/Partners'
import BecomePartner from './pages/BecomePartner'
import AFIAPLearn from './pages/AFIAPLearn'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import NotFound from './pages/NotFound'
import AccountServices from './pages/account/AccountServices'
import AccountLearn from './pages/account/AccountLearn'
import AccountLearnCourse from './pages/account/AccountLearnCourse'
import AccountContact from './pages/account/AccountContact'
import AccountAI from './pages/account/AccountAI'
import AccountSettings from './pages/account/AccountSettings'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-blue-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/become-a-partner" element={<BecomePartner />} />
          <Route path="/afiap-learn" element={<AFIAPLearn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route
            path="/account"
            element={(
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            )}
          >
            <Route index element={<Navigate to="services" replace />} />
            <Route path="services" element={<AccountServices />} />
            <Route path="learn" element={<AccountLearn />} />
            <Route path="learn/:courseSlug" element={<AccountLearnCourse />} />
            <Route path="contact" element={<AccountContact />} />
            <Route path="ai" element={<AccountAI />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

