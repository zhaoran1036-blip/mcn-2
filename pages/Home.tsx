
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Globe, Zap, Target, BarChart3, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_CASE_STUDIES, MOCK_CREATORS } from '../constants';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [typedText, setTypedText] = useState("");
  
  const prompts = language === 'en' ? [
    "Find luxury family bloggers for Swiss skiing...",
    "Looking for minimalist aesthetic in Tokyo...",
    "Sustainable solo adventurers in Bali..."
  ] : [
    "寻找适合阿布扎比推广的奢华亲子博主...",
    "寻找极简风格的澳洲探险家...",
    "寻找具备极致审美、受众在北上广深的酒店体验官..."
  ];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: any;

    const type = () => {
      const fullText = prompts[currentIdx];
      setTypedText(isDeleting ? fullText.substring(0, charIdx - 1) : fullText.substring(0, charIdx + 1));
      charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

      if (!isDeleting && charIdx === fullText.length) {
        isDeleting = true;
        timer = setTimeout(type, 3000);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % prompts.length;
        timer = setTimeout(type, 500);
      } else {
        timer = setTimeout(type, isDeleting ? 30 : 70);
      }
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className="bg-white">
      {/* 1.2 Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=90" 
            className="w-full h-full object-cover opacity-40 brightness-75 grayscale contrast-125 transition-all duration-[3000ms] hover:scale-110"
            alt="Hero Cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>

        <div className="relative z-10 w-full max-w-[95rem] mx-auto px-6 text-center">
          <div className="reveal active">
            <h1 className={`font-extrabold text-white serif mb-10 tracking-tighter leading-[1.15] md:leading-[0.95] ${
              language === 'en' ? 'text-5xl md:text-[8.5vw]' : 'text-4xl md:text-[7.5vw]'
            }`}>
              {t.home.heroTitle} <br />
              <span className="italic text-indigo-500 font-light opacity-90">{t.home.heroSubTitle}</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed tracking-wide reveal active">
            {t.home.heroDesc}
          </p>

          <div className="max-w-2xl mx-auto relative group reveal active">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 p-2 flex items-center shadow-2xl">
              <div className="flex-1 flex items-center pl-4 md:pl-6 text-white text-sm md:text-lg font-light">
                <Sparkles size={18} className="text-indigo-400 mr-3 md:mr-4 shrink-0" />
                <span className="text-white/80 line-clamp-1">{typedText}</span>
                <span className="w-[1px] h-5 md:h-6 bg-indigo-500 animate-pulse ml-2"></span>
              </div>
              <button 
                onClick={() => window.location.hash = '#/gallery'}
                className="bg-white text-black px-6 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-indigo-600 hover:text-white transition-all m-2 whitespace-nowrap"
              >
                {t.home.startMatching}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1.3 AI Intelligence Cards - Horizontal Scrolling Mode */}
      <section className="py-32 md:py-48 bg-[#fafafa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 reveal">
             <h2 className="text-2xl md:text-3xl font-light text-gray-500 tracking-tight leading-relaxed mb-4">
               {language === 'cn' ? '不仅是数据，更是审美与策略的共鸣。' : 'Not just data, but a resonance of aesthetics and strategy.'}
             </h2>
             <div className="h-[1px] w-20 bg-indigo-500 mx-auto opacity-30"></div>
          </div>
          
          <div className="flex overflow-x-auto pb-12 gap-8 snap-x no-scrollbar -mx-6 px-6">
            {/* Card 1: Strategy Logic */}
            <div className="min-w-[320px] md:min-w-[400px] snap-center p-10 bg-white border border-gray-100 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] flex flex-col">
               <div className="flex items-center gap-3 mb-10">
                 <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <Target size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">营销目标</span>
               </div>
               <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Target</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">推广“静奢”冬季隐居之旅</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Audience</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">HNW (高净值人群, 35-45岁)</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Vibe</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">极简、禅意、电影感</p>
                  </div>
               </div>
               <div className="pt-8 mt-10 border-t border-gray-50 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={10} /> AI Matching Completed
                    </span>
                    <span className="text-xl font-black serif text-gray-900">98.5%</span>
                  </div>
               </div>
            </div>

            {/* Card 2: Visual Creator A */}
            <div className="min-w-[320px] md:min-w-[400px] snap-center relative rounded-[3rem] overflow-hidden group aspect-[4/5] shadow-2xl">
              <img src={MOCK_CREATORS[0].avatar} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute bottom-12 left-10 right-10">
                <p className="text-white text-3xl font-bold serif mb-3">{MOCK_CREATORS[0].name}</p>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white/80 text-[9px] font-black uppercase tracking-widest border border-white/20">#CinematicVlog</span>
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white/80 text-[9px] font-black uppercase tracking-widest border border-white/20">#SoloTravel</span>
                </div>
              </div>
            </div>

            {/* Card 3: Data Index (VIT) */}
            <div className="min-w-[320px] md:min-w-[400px] snap-center p-12 bg-gray-950 text-white rounded-[3rem] flex flex-col justify-between shadow-[0_60px_100px_-20px_rgba(99,102,241,0.2)]">
               <div>
                 <div className="flex items-center gap-3 mb-12">
                   <div className="p-3 bg-white/5 rounded-2xl text-indigo-400">
                      <Zap size={20} />
                   </div>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">VIT Index</h3>
                 </div>
                 <div className="text-8xl font-black serif text-white leading-none mb-6">9.2</div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Visibility • Influence • Trust</p>
               </div>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/40">
                    <span>Market Resonance</span>
                    <span className="text-white">High</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[92%]"></div>
                  </div>
               </div>
            </div>

            {/* Card 4: Global Resource (Creator B) */}
            <div className="min-w-[320px] md:min-w-[400px] snap-center relative rounded-[3rem] overflow-hidden group aspect-[4/5] shadow-2xl">
              <img src={MOCK_CREATORS[1].avatar} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <div className="absolute top-10 right-10 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-2">
                 <Globe size={12} className="text-indigo-400" /> THAILAND
              </div>

              <div className="absolute bottom-12 left-10 right-10">
                <p className="text-white text-3xl font-bold serif mb-3">{MOCK_CREATORS[1].name}</p>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white/80 text-[9px] font-black uppercase tracking-widest border border-white/20">#GlobalExplorer</span>
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white/80 text-[9px] font-black uppercase tracking-widest border border-white/20">#CrossCultural</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.4 Stats Section */}
      <section className="py-32 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-24">
            <div className="max-w-xl reveal">
              <h2 className={`font-extrabold serif mb-8 leading-tight ${
                language === 'en' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
              }`}>{t.home.statsTitle}</h2>
              <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed">{t.home.statsDesc}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 reveal">
              <div className="space-y-2">
                <p className="text-5xl md:text-8xl font-black serif text-white">50+</p>
                <p className="text-[10px] font-black uppercase tracking-ultra text-white/30">{t.home.globalScale}</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl md:text-8xl font-black serif text-indigo-500">2K</p>
                <p className="text-[10px] font-black uppercase tracking-ultra text-white/30">{t.home.curationStandard}</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl md:text-8xl font-black serif text-white">21</p>
                <p className="text-[10px] font-black uppercase tracking-ultra text-white/30">{t.home.industryDepth}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 Methodology (Zig-Zag) */}
      <section className="py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-64">
          {/* Identify */}
          <div className="flex flex-col md:flex-row items-center gap-24 reveal">
             <div className="w-full md:w-1/2 relative">
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-black text-white p-8 rounded-[2rem] shadow-2xl hidden md:block">
                   <Target className="text-indigo-500 mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-ultra">AI Precision</p>
                </div>
             </div>
             <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-5xl font-extrabold serif leading-tight tracking-tighter text-black">{t.home.methodology.identify.title}</h3>
                <p className="text-gray-500 text-xl font-light leading-relaxed">{t.home.methodology.identify.desc}</p>
             </div>
          </div>

          {/* Narrative */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-24 reveal">
             <div className="w-full md:w-1/2 relative">
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-5xl font-extrabold serif leading-tight tracking-tighter text-black">{t.home.methodology.narrative.title}</h3>
                <p className="text-gray-500 text-xl font-light leading-relaxed">{t.home.methodology.narrative.desc}</p>
             </div>
          </div>

          {/* Amplify */}
          <div className="flex flex-col md:flex-row items-center gap-24 reveal">
             <div className="w-full md:w-1/2 relative">
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-5xl font-extrabold serif leading-tight tracking-tighter text-black">{t.home.methodology.amplify.title}</h3>
                <p className="text-gray-500 text-xl font-light leading-relaxed">{t.home.methodology.amplify.desc}</p>
             </div>
          </div>
        </div>
      </section>

      {/* 1.6 Case Studies */}
      <section className="py-48 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 reveal gap-6">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-extrabold serif tracking-tighter">{t.home.casesTitle}</h2>
              <p className="text-gray-400 text-lg font-light tracking-wide uppercase">Portfolio of global influence</p>
            </div>
            <button onClick={() => window.location.hash = '#/gallery'} className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-indigo-600 transition-all">
              Explore All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {MOCK_CASE_STUDIES.map((cs, idx) => (
              <div key={cs.id} className={`reveal group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-1000 ${idx === 1 ? 'md:-translate-y-12' : ''}`}>
                <div className="aspect-[3/4] relative">
                  <img src={cs.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[3rem] pointer-events-none m-4"></div>
                </div>
                
                <div className="absolute bottom-10 md:bottom-12 left-10 md:left-12 right-10 md:right-12">
                  <p className="text-[10px] font-black uppercase tracking-ultra text-indigo-400 mb-3 md:mb-4">{cs.tag}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold serif text-white mb-2 leading-tight">{cs.title}</h3>
                  <p className="text-white/50 text-xs md:text-sm font-light mb-6 md:mb-8">{cs.subtitle}</p>
                  
                  <div className="flex gap-6 md:gap-8 border-t border-white/10 pt-6 md:pt-8">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">ROI</p>
                      <p className="text-base md:text-lg font-bold text-white">{cs.roi}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Exposure</p>
                      <p className="text-base md:text-lg font-bold text-white">{cs.exposure}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.7 Call to Action */}
      <section className="flex flex-col md:flex-row md:h-screen border-t border-gray-100">
        <div className="w-full md:w-1/2 relative group overflow-hidden bg-black flex flex-col justify-center p-12 md:p-24 py-24 md:py-0">
           <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]">
             <img src="https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
           </div>
           <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-700"></div>
           <div className="relative z-10 space-y-6 md:space-y-8 reveal">
             <h3 className="text-5xl md:text-6xl font-extrabold text-white serif tracking-tighter">{t.home.forBrands}</h3>
             <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-sm">{language === 'en' ? 'Elevate your destination narrative with AI-driven storytelling.' : '寻找增长的第二曲线？让我们用 AI 策略定制一场无法复制的营销战役。'}</p>
             <button className="px-10 md:px-12 py-5 md:py-6 bg-white text-black rounded-full font-black uppercase tracking-ultra text-[10px] hover:bg-indigo-600 hover:text-white transition-all">Book Consultation</button>
           </div>
        </div>
        <div className="w-full md:w-1/2 relative group overflow-hidden bg-gray-50 flex flex-col justify-center p-12 md:p-24 py-24 md:py-0">
           <div className="absolute inset-0 opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]">
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
           </div>
           <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-all duration-700"></div>
           <div className="relative z-10 space-y-6 md:space-y-8 reveal">
             <h3 className="text-5xl md:text-6xl font-extrabold text-black serif tracking-tighter">{t.home.forCreators}</h3>
             <p className="text-black/60 text-lg md:text-xl font-light leading-relaxed max-w-sm">{language === 'en' ? "Join the top 1% elite roster and collaborate with the world's finest brands." : '拒绝平庸的流量游戏。加入严选名录，连接顶级品牌。'}</p>
             <button className="px-10 md:px-12 py-5 md:py-6 bg-black text-white rounded-full font-black uppercase tracking-ultra text-[10px] hover:bg-indigo-600 transition-all">Join the Roster</button>
           </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
