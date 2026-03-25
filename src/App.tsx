import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Pages
import Home from './pages/Home.tsx';
import BlogList from './pages/BlogList.tsx';
import SingleBlog from './pages/SingleBlog.tsx';
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import CreateEditPost from './pages/CreateEditPost.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfService from './pages/TermsOfService.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* PUBLIC ROUTES - No authentication required */}
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/post/:slug" element={<SingleBlog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />

              {/* PROTECTED ADMIN ROUTES - Authentication required */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/create" element={<CreateEditPost />} />
                <Route path="/admin/edit/:id" element={<CreateEditPost />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
