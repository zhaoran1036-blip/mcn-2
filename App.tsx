
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AIFinder from './pages/AIFinder';
import Gallery from './pages/Gallery';
import CreatorProfile from './pages/CreatorProfile';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#fcfcfc]">
          <Navigation />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<AIFinder />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/creator/:id" element={<CreatorProfile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/method" element={<div className="pt-32 text-center serif text-3xl">Methodology Coming Soon</div>} />
              <Route path="/solutions" element={<div className="pt-32 text-center serif text-3xl">Strategic Solutions Coming Soon</div>} />
              <Route path="/insights" element={<div className="pt-32 text-center serif text-3xl">Industry Insights Coming Soon</div>} />
            </Routes>
          </main>

          <footer className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold serif mb-6">GLOBALTRAVEL <span className="text-indigo-500 italic">AI</span></h2>
                <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
                  Empowering the world's most iconic travel brands with data-driven storytelling and global influencer intelligence.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">Platform</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><a href="#/search" className="hover:text-white">AI Matchmaker</a></li>
                  <li><a href="#/gallery" className="hover:text-white">Creator Gallery</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">Company</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><a href="#/about" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
