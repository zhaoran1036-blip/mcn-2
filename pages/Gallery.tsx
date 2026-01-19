
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CREATORS } from '../constants';
import { Sparkles, X, Play, UserPlus, BarChart3, Loader2, CheckCircle, ArrowRight, Zap, Instagram, Youtube, Send, BarChart2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Creator, AISearchResult } from '../types';
import { findCreatorsWithAI } from '../services/gemini';
import CreatorRadarChart from '../components/CreatorRadarChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [typedExample, setTypedExample] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [scannedCount, setScannedCount] = useState(218000);
  
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AISearchResult | null>(null);
  const [searchSteps, setSearchSteps] = useState<string[]>([]);
  const [displayCreators, setDisplayCreators] = useState<Creator[]>(MOCK_CREATORS);

  const inputRef = useRef<HTMLInputElement>(null);

  const examplePrompts = language === 'en' ? [
    "Cinematic vloggers for Kyoto luxury...",
    "Z-Gen explorers for Swiss ski season...",
    "Bilingual storytellers for UAE luxury hotels..."
  ] : [
    "寻找适合京都奢华酒店的电影感博主...",
    "为瑞士滑雪季寻找 Z 世代户外探险家...",
    "寻找能用双语讲述东方文化的创作者..."
  ];

  const smartChips = language === 'en' 
    ? ["Cinematic", "High-Net-Worth", "Bilingual", "Solo", "Aesthetic", "Aerial"]
    : ["电影感", "高净值", "双语", "独行", "极简", "航拍"];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: any;

    const type = () => {
      const fullText = examplePrompts[currentIdx];
      setTypedExample(isDeleting ? fullText.substring(0, charIdx - 1) : fullText.substring(0, charIdx + 1));
      charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

      if (!isDeleting && charIdx === fullText.length) {
        isDeleting = true;
        timeout = setTimeout(type, 3000);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % examplePrompts.length;
        timeout = setTimeout(type, 500);
      } else {
        timeout = setTimeout(type, isDeleting ? 30 : 60);
      }
    };

    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => setScannedCount(p => p + Math.floor(Math.random() * 5)), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAISearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchSteps([]);
    setSearchResult(null);

    const messages = language === 'en' ? [
      "Scanning global asset database...",
      "Analyzing visual narrative patterns...",
      "Calculating VIT Index & Resonance...",
      "Finalizing AI Matching Report..."
    ] : [
      "正在扫描全球资产数据库...",
      "分析视觉叙事逻辑与调色倾向...",
      "计算 VIT 指数与品牌共鸣度...",
      "生成 AI 智能匹配报告..."
    ];

    for (let i = 0; i < messages.length; i++) {
      setSearchSteps(prev => [...prev, messages[i]]);
      await new Promise(r => setTimeout(r, 800));
    }

    const aiResult = await findCreatorsWithAI(query);
    setSearchResult(aiResult);
    setDisplayCreators(aiResult.creators);
    setLoading(false);
    
    const resultsSection = document.getElementById('results-grid');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetSearch = () => {
    setSearchResult(null);
    setDisplayCreators(MOCK_CREATORS);
    setInputValue("");
  };

  return (
    <div className="pt-32 md:pt-48 pb-32 bg-white min-h-screen selection:bg-indigo-600 selection:text-white relative">
      {/* Search Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-10" />
          <div className="space-y-4 max-w-sm w-full">
            {searchSteps.map((step, idx) => (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx === searchSteps.length - 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                <CheckCircle size={16} className={idx < searchSteps.length - 1 ? 'text-green-500' : 'text-gray-300'} />
                <p className={`text-sm md:text-base font-bold tracking-tight ${idx === searchSteps.length - 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 md:mb-40 gap-12 md:gap-16 reveal active">
           <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className={`font-black serif tracking-tighter text-black leading-[1.1] md:leading-[0.8] ${
                language === 'en' ? 'text-6xl md:text-[8vw]' : 'text-5xl md:text-[6.5vw]'
              }`}>{searchResult ? (language === 'en' ? 'AI Selections.' : 'AI 匹配结果') : t.gallery.title}</h2>
              <p className="text-gray-400 font-black tracking-ultra uppercase text-[9px] md:text-[10px]">
                {searchResult ? (language === 'en' ? 'Optimized based on your unique criteria' : '基于您的特定需求深度优化的筛选结果') : t.gallery.subTitle}
              </p>
           </div>
           
           <div className="flex items-center gap-10 md:gap-16 bg-[#fcfcfc] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="text-center">
                 <p className="text-3xl md:text-5xl font-extrabold serif text-black mb-1 md:mb-2 leading-none">{scannedCount.toLocaleString()}</p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-ultra">{t.gallery.scanned}</p>
              </div>
              <div className="w-[1px] h-12 md:h-16 bg-gray-100"></div>
              <div className="text-center">
                 <p className="text-3xl md:text-5xl font-extrabold serif text-indigo-600 mb-1 md:mb-2 leading-none">
                    {searchResult ? searchResult.creators.length : '2,000'}
                 </p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-ultra">
                    {searchResult ? (language === 'en' ? 'Matches' : '匹配人数') : t.gallery.roster}
                 </p>
              </div>
           </div>
        </header>

        {/* AI Command Center */}
        <section className="max-w-4xl mx-auto mb-32 md:mb-48 reveal active">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#fcfcfc] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] rounded-[2.5rem] md:rounded-[3rem] p-3 md:p-4 flex items-center transition-all duration-700 group-hover:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.1)]">
              <div className="pl-4 md:pl-8 pr-3 md:pr-4 shrink-0">
                <Sparkles size={24} className="md:w-8 md:h-8 text-indigo-600 animate-pulse" />
              </div>
              <div className="relative flex-1 h-14 md:h-16 flex items-center">
                {!inputValue && (
                  <div className="absolute left-0 text-lg md:text-2xl font-light text-gray-300 pointer-events-none tracking-tight line-clamp-1 leading-normal">
                    {typedExample}
                  </div>
                )}
                <input 
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAISearch(inputValue)}
                  className="w-full bg-transparent text-lg md:text-2xl font-light outline-none text-black leading-normal"
                />
              </div>
              <button 
                onClick={() => handleAISearch(inputValue)}
                className="bg-black text-white px-6 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-ultra text-[9px] md:text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl whitespace-nowrap"
              >
                {t.gallery.generate}
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-12">
            {searchResult && (
              <button 
                onClick={resetSearch}
                className="px-5 md:px-8 py-2 md:py-3 rounded-full bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-ultra hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2"
              >
                <X size={12} /> {language === 'en' ? 'Reset Search' : '重置搜索'}
              </button>
            )}
            {smartChips.map(chip => (
              <button 
                key={chip}
                onClick={() => setInputValue(prev => prev + (prev ? " " : "") + chip)}
                className="px-5 md:px-8 py-2 md:py-3 rounded-full bg-white border border-gray-100 text-[9px] md:text-[10px] font-black uppercase tracking-ultra text-gray-400 hover:border-indigo-600 hover:text-indigo-600 hover:-translate-y-1 transition-all shadow-sm active:scale-90"
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section id="results-grid" className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12 mb-32">
          {displayCreators.map((creator, idx) => (
            <div 
              key={creator.id}
              onClick={() => setSelectedCreator(creator)}
              className="reveal break-inside-avoid group relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-1000 bg-white border-[0.5px] border-gray-100 shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img src={creator.avatar} className="w-full h-auto object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale group-hover:grayscale-0" alt={creator.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                {searchResult && (
                  <div className="absolute top-8 right-8 bg-indigo-600 text-white px-4 py-2 rounded-full text-[9px] font-black tracking-ultra uppercase shadow-lg">
                    {Math.floor(Math.random() * 5 + 95)}% Match
                  </div>
                )}
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white font-bold text-3xl md:text-4xl serif mb-2 tracking-tighter leading-tight">{creator.name}</p>
                <span className="text-indigo-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{creator.stats.vitIndex} VIT INDEX</span>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* 🚀 100% IMAGE MATCH: Creator Detail Drawer */}
      {selectedCreator && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-700" onClick={() => setSelectedCreator(null)}></div>
          <div className="relative w-full md:w-[45vw] lg:w-[40vw] bg-white/95 backdrop-blur-3xl h-full shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-y-auto animate-drawer-in flex flex-col no-scrollbar">
             
             {/* Header Visual */}
             <div className="relative h-[45vh] w-full overflow-hidden shrink-0">
               <img src={selectedCreator.avatar} className="w-full h-full object-cover grayscale contrast-125" />
               <button onClick={() => setSelectedCreator(null)} className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-xl rounded-full hover:bg-white transition-all text-white hover:text-black z-20">
                 <X size={20} />
               </button>
             </div>

             <div className="flex-1 p-8 md:p-14 space-y-16">
               
               {/* Identity Section (Kenzo Chen Image Reference) */}
               <section className="text-center relative -mt-32 z-10">
                  <div className="space-y-4 bg-white/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white shadow-2xl">
                    <div className="flex items-center justify-center gap-4 mb-2">
                       <div className="w-12 h-[1px] bg-indigo-600"></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Creator Profile</span>
                    </div>
                    <h3 className="text-6xl md:text-7xl font-bold serif text-gray-900 leading-none tracking-tighter">{selectedCreator.name}</h3>
                    <p className="text-2xl text-gray-400 font-light italic leading-tight">"{selectedCreator.slogan}"</p>
                    
                    {/* Performance Radar */}
                    <div className="py-8 relative">
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-gray-300 opacity-40">Performance Radar</div>
                       <CreatorRadarChart data={selectedCreator.stats} />
                       
                       <div className="flex justify-around items-center pt-8 border-t border-gray-50">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900 leading-none">{selectedCreator.followers}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Followers</p>
                          </div>
                          <div className="w-[1px] h-10 bg-gray-100"></div>
                          <div className="text-center">
                            <p className="text-3xl font-bold text-indigo-600 leading-none">{selectedCreator.engagementRate}%</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Engagement</p>
                          </div>
                       </div>
                    </div>
                  </div>
               </section>

               {/* AI Recommendation Report Section */}
               <section className="space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold serif text-gray-900 leading-none">AI Recommendation Report</h4>
                      <p className="text-xs text-gray-400 font-light italic underline decoration-indigo-200 decoration-4">Analysis by Gemini-3 Pro-Preview</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Content Style Card */}
                    <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 space-y-6">
                       <h5 className="text-base font-bold text-gray-900">Content Style</h5>
                       <div className="flex flex-wrap gap-2">
                         {selectedCreator.styles.map(s => (
                           <span key={s} className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s}</span>
                         ))}
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed font-light">
                         Highly cinematic approach with slow-pan transitions. Best suited for high-end boutique properties that prioritize aesthetics and architectural detail.
                       </p>
                    </div>

                    {/* Best Suited For Card */}
                    <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 space-y-6">
                       <h5 className="text-base font-bold text-gray-900">Best Suited For</h5>
                       <div className="flex flex-wrap gap-2">
                         {selectedCreator.scenes.map(s => (
                           <span key={s} className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s}</span>
                         ))}
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed font-light">
                         Ideal for quiet luxury resorts, destination marketing organizations, and premium luggage brands seeking long-form engagement.
                       </p>
                    </div>
                  </div>
               </section>

               {/* Signature Storytelling (Image Showcase) */}
               <section className="space-y-8">
                  <h4 className="text-3xl font-bold serif text-gray-900">Signature Storytelling</h4>
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video relative group">
                    <img src={selectedCreator.representativeWorks[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-indigo-600/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                       <Play size={48} className="text-white fill-white" />
                    </div>
                  </div>
               </section>

               {/* Audience Insights & Tags */}
               <section className="space-y-12">
                  <div className="pb-4 border-b border-gray-100">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Audience Insights</h4>
                  </div>
                  
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedCreator.audienceDemographics}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                        <Bar dataKey="value" fill="#4f46e5" radius={[12, 12, 0, 0]} barSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">AI Sentiment Tags</p>
                     <div className="flex flex-wrap gap-x-8 gap-y-4">
                       {selectedCreator.tags.map((tag, idx) => (
                         <span 
                           key={tag} 
                           className={`font-bold serif italic text-gray-900 opacity-80 ${
                             idx === 0 ? 'text-4xl' : idx === 1 ? 'text-3xl' : 'text-xl'
                           }`}
                         >
                           {tag}
                         </span>
                       ))}
                     </div>
                  </div>
               </section>

               {/* Quick Contact & Footer Branding */}
               <section className="pt-10">
                  <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap size={200} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-ultra opacity-60 mb-6">Quick Contact</p>
                     <h3 className="text-3xl font-bold mb-10 leading-tight">Interested in working with {selectedCreator.name.split(' ')[0]}?</h3>
                     <button className="w-full py-6 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-ultra text-[10px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-xl">
                        Book Campaign <Send size={16} />
                     </button>
                  </div>

                  <div className="mt-20 py-20 bg-gray-950 -mx-14 px-14 text-white">
                    <h2 className="text-3xl font-bold serif mb-8 tracking-tighter leading-none">GLOBALTRAVEL <span className="text-indigo-500 italic">AI</span></h2>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-sm">
                      Empowering the world's most iconic travel brands with data-driven storytelling and global influencer intelligence.
                    </p>
                  </div>
               </section>

             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drawer-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-drawer-in {
          animation: drawer-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Gallery;
