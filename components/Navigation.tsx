
import React, { useState, useEffect } from 'react';
import { Globe, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, t, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = '#'}>
            <Globe className={`w-8 h-8 transition-colors ${scrolled ? 'text-indigo-600' : 'text-white'}`} />
            <span className={`text-xl font-bold tracking-tight uppercase transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              GlobalTravel <span className="text-indigo-500 font-medium italic">AI</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: t.nav.method, path: '/method' },
              { name: t.nav.creators, path: '/gallery' },
              { name: t.nav.solutions, path: '/solutions' },
              { name: t.nav.insights, path: '/insights' }
            ].map((item) => (
              <a 
                key={item.name}
                href={`#${item.path}`} 
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white/70 hover:text-white'}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'cn' : 'en')}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/50 hover:text-white'}`}
            >
              {language === 'en' ? '中' : 'EN'}
            </button>
            <button 
              onClick={() => window.location.hash = '#/demo'}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all ${scrolled ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/30'}`}
            >
              {t.nav.demo}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
