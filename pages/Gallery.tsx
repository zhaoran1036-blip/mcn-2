import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CREATORS } from '../constants';
import { Sparkles, X, Play, UserPlus, BarChart3, Loader2, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Creator, AISearchResult } from '../types';
import { findCreatorsWithAI } from '../services/gemini';

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [typedExample, setTypedExample] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [scannedCount, setScannedCount] = useState(218000);
  
  // Search States
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
    
    // Scroll to results
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

        {/* AI Insight Box for Search Results */}
        {searchResult && (
          <section className="max-w-5xl mx-auto mb-32 reveal active">
            <div className="bg-gray-50 border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-5">
                <Sparkles size={300} />
              </div>
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold serif text-black leading-none mb-2">{t.gallery.verdict}</h3>
                  <p className="text-[10px] font-black uppercase tracking-ultra text-gray-400">Match Accuracy: {(searchResult.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-light italic text-gray-700 leading-relaxed border-l-4 border-indigo-600 pl-8">
                "{searchResult.aiReasoning}"
              </p>
            </div>
          </section>
        )}

        {/* Immersive Gallery Grid */}
        <section id="results-grid" className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12 mb-32 md:mb-48">
          {displayCreators.map((creator, idx) => (
            <div 
              key={creator.id}
              onClick={() => setSelectedCreator(creator)}
              className={`reveal break-inside-avoid group relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-1000 bg-white border-[0.5px] border-gray-100 shadow-2xl ${idx % 2 === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <div className="relative overflow-hidden">
                <img src={creator.avatar} className="w-full h-auto object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale group-hover:grayscale-0" alt={creator.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 transition-opacity duration-700"></div>
                
                {/* Match Badge for Results */}
                {searchResult && (
                  <div className="absolute top-8 right-8 bg-indigo-600 text-white px-4 py-2 rounded-full text-[9px] font-black tracking-ultra uppercase shadow-lg shadow-indigo-600/40">
                    98.5% Match
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-10 md:bottom-12 left-10 md:left-12 right-10 md:right-12 transition-all duration-700 translate-y-0 group-hover:-translate-y-10">
                <p className="text-white font-bold text-3xl md:text-4xl serif mb-2 tracking-tighter leading-tight">{creator.name}</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-white/40 text-[9px] font-black uppercase tracking-ultra">#{creator.styles[0]}</span>
                  <div className="h-[1px] w-6 md:w-8 bg-white/20"></div>
                  <span className="text-indigo-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest shrink-0">{creator.stats.vitIndex} VIT</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-90 transition-all duration-700 flex flex-col justify-center items-center text-center p-8 md:p-16">
                 <h4 className="text-white text-3xl md:text-5xl font-black serif mb-4 md:mb-6 tracking-tighter leading-none">{creator.name}</h4>
                 <div className="h-[1px] w-10 md:w-12 bg-white/30 mb-6 md:mb-8"></div>
                 <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                   <p className="text-white/70 text-[9px] md:text-[10px] font-black uppercase tracking-ultra">{creator.followers} FOLLOWERS</p>
                   <p className="text-white text-base md:text-lg font-light italic opacity-90 line-clamp-2">"{creator.slogan}"</p>
                 </div>
                 <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-black rounded-xl font-black uppercase tracking-ultra text-[9px] hover:scale-105 transition-all">
                    {t.gallery.viewVision}
                 </button>
              </div>
            </div>
          ))}
        </section>

        {/* Gatekeeper Section */}
        {!searchResult && (
          <section className="reveal p-16 md:p-32 bg-black rounded-[3rem] md:rounded-[4rem] text-center relative overflow-hidden text-white shadow-[0_60px_100px_-20px_rgba(0,0,0,0.4)]">
             <div className="absolute inset-0 opacity-10">
               <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="relative z-10 space-y-8 md:space-y-12">
                <div className="inline-block px-6 md:px-8 py-2 md:py-3 border border-white/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-ultra text-white/50">
                  {t.gallery.restricted}
                </div>
                <h3 className={`font-extrabold serif tracking-tighter leading-tight ${
                  language === 'en' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'
                }`}>{t.gallery.unlock}</h3>
                <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed text-base md:text-xl italic tracking-wide">
                  {language === 'en' ? "Access the full database of 2,000+ elite storytellers hand-picked by our AI auditors." : "解锁包含 2,000+ 位由 AI 审计严选的顶级叙事者的完整名录。"}
                </p>
                <div className="pt-8 md:pt-12">
                   <button className="px-10 md:px-16 py-5 md:py-7 bg-indigo-600 text-white rounded-full font-black uppercase tracking-ultra text-[10px] md:text-[11px] hover:bg-indigo-500 hover:scale-105 transition-all shadow-[0_25px_50px_-12px_rgba(99,102,241,0.5)]">
                      Unlock Private Database
                   </button>
                </div>
             </div>
          </section>
        )}
      </div>

      {/* Creator Detail Drawer */}
      {selectedCreator && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-700" onClick={() => setSelectedCreator(null)}></div>
          <div className="relative w-full max-w-2xl bg-white h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto animate-drawer-in p-10 md:p-20 pt-24 md:pt-40 space-y-16 md:space-y-24">
             <button onClick={() => setSelectedCreator(null)} className="fixed top-8 right-8 md:top-12 md:right-12 p-4 md:p-5 bg-gray-50/50 backdrop-blur-3xl rounded-full hover:bg-gray-100 transition-all z-[310]">
               <X size={20} className="md:w-6 md:h-6 text-black" />
             </button>
             
             <div className="flex flex-col items-center text-center gap-8 md:gap-10">
                <div className="relative">
                  <img src={selectedCreator.avatar} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover ring-[12px] md:ring-[16px] ring-[#fcfcfc] shadow-2xl grayscale" />
                  {searchResult && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[8px] font-black tracking-ultra rounded-full whitespace-nowrap">
                      RANK #1 MATCH
                    </div>
                  )}
                </div>
                <div className="space-y-2 md:space-y-4">
                   <h3 className="text-4xl md:text-6xl font-black serif text-black tracking-tighter leading-none">{selectedCreator.name}</h3>
                   <p className="text-gray-400 italic font-light text-lg md:text-2xl leading-tight">"{selectedCreator.slogan}"</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="p-8 md:p-10 bg-[#fafafa] rounded-[2rem] md:rounded-[2.5rem] border border-gray-100">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-ultra text-gray-300 mb-1 md:mb-2 leading-none">VIT Score</p>
                   <p className="text-4xl md:text-5xl font-black serif text-indigo-600 leading-none">{selectedCreator.stats.vitIndex}</p>
                </div>
                <div className="p-8 md:p-10 bg-[#fafafa] rounded-[2rem] md:rounded-[2.5rem] border border-gray-100">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-ultra text-gray-300 mb-1 md:mb-2 leading-none">Reach</p>
                   {/* Fix: Using selectedCreator instead of undefined creator */}
                   <p className="text-4xl md:text-5xl font-black serif text-black leading-none">{selectedCreator.followers}</p>
                </div>
             </div>

             <div className="space-y-6 md:space-y-10 px-4 md:px-0">
                <div className="flex items-center gap-4">
                   <Sparkles size={18} className="text-indigo-600" />
                   <h4 className="text-[10px] font-black uppercase tracking-ultra text-indigo-600 leading-none">{t.gallery.verdict}</h4>
                </div>
                <div className="bg-black p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-white/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <BarChart3 size={150} />
                   </div>
                   <p className="relative font-mono text-sm md:text-base leading-relaxed text-white/80">
                     <span className="text-indigo-400 mr-2">/ Analysis:</span>
                     {language === 'en' ? "Creator exhibits cinematic Morandi palette. Audience retention is 42% above benchmark for HNW segments." : "该博主擅长低饱和度调色，其叙事逻辑紧密，完播率高于行业平均 42%。其核心受众精准集中于一线城市高净值群体。"}
                   </p>
                </div>
             </div>

             <div className="space-y-8 md:space-y-10 px-4 md:px-0">
                <h4 className="text-[10px] font-black uppercase tracking-ultra text-gray-300 leading-none">Visual Portfolio Assets</h4>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                   {selectedCreator.representativeWorks.map((work, i) => (
                      <div key={i} className="aspect-[9/16] rounded-xl md:rounded-[2rem] overflow-hidden bg-gray-100 relative group cursor-pointer shadow-lg">
                         <img src={work} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={24} className="md:w-8 md:h-8 text-white fill-white" />
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="pt-10 md:pt-20 sticky bottom-0 bg-white/90 backdrop-blur-xl pb-10">
                <button className="w-full py-6 md:py-8 bg-black text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-ultra text-[10px] md:text-[11px] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 group">
                   <UserPlus size={18} /> Add to Shortlist <ArrowRight className="group-hover:translate-x-2 transition-transform shrink-0" />
                </button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drawer-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-drawer-in {
          animation: drawer-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Gallery;