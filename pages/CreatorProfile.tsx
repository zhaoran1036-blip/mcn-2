
import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_CREATORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CreatorRadarChart from '../components/CreatorRadarChart';
import { CheckCircle, Globe, Play, Heart, MessageSquare, Send } from 'lucide-react';

const CreatorProfile: React.FC = () => {
  const { id } = useParams();
  const creator = MOCK_CREATORS.find(c => c.id === id);

  if (!creator) return <div className="pt-32 text-center">Creator not found</div>;

  return (
    <div className="pt-20 bg-white">
      {/* Header - Magazine Style */}
      <section className="relative h-[60vh] md:h-[80vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full">
          <img src={creator.avatar} className="w-full h-full object-cover" alt={creator.name} />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 bg-gray-50">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[1px] bg-indigo-600"></span>
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Creator Profile</span>
            </div>
            <h1 className="text-6xl font-bold serif mb-6 leading-tight">{creator.name}</h1>
            <p className="text-2xl italic text-gray-400 font-light mb-8">"{creator.slogan}"</p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{creator.followers}</span>
                <span className="text-xs text-gray-400 font-bold uppercase">Followers</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{creator.engagementRate}%</span>
                <span className="text-xs text-gray-400 font-bold uppercase">Engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Side - Hard Data */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-100 pb-4">Performance Radar</h3>
                <CreatorRadarChart data={creator.stats} />
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-100 pb-4">Audience Insights</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={creator.audienceDemographics}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-200">
                <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Quick Contact</p>
                <p className="text-xl font-medium mb-8">Interested in working with {creator.name.split(' ')[0]}?</p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                  Book Campaign <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - AI Analysis & Content */}
          <div className="lg:col-span-8 space-y-24">
            {/* AI Analysis Report */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold serif">AI Recommendation Report</h3>
                  <p className="text-gray-500 text-sm italic underline decoration-indigo-200 decoration-4">Analysis by Gemini-3 Pro-Preview</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 rounded-3xl">
                  <h4 className="font-bold mb-4">Content Style</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {creator.styles.map(s => (
                      <span key={s} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold">{s}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Highly cinematic approach with slow-pan transitions. Best suited for high-end boutique properties that prioritize aesthetics and architectural detail.
                  </p>
                </div>

                <div className="p-8 bg-gray-50 rounded-3xl">
                  <h4 className="font-bold mb-4">Best Suited For</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {creator.scenes.map(s => (
                      <span key={s} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold">{s}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ideal for quiet luxury resorts, destination marketing organizations, and premium luggage brands seeking long-form engagement.
                  </p>
                </div>
              </div>
            </div>

            {/* Representative Works */}
            <div>
              <h3 className="text-2xl font-bold serif mb-10">Signature Storytelling</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {creator.representativeWorks.map((work, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-2xl aspect-[9/16]">
                    <img src={work} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="Work" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Play className="text-white fill-white" size={48} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-100 pb-4">AI Sentiment Tags</h3>
               <div className="flex flex-wrap gap-4">
                {creator.tags.map((tag, idx) => (
                  <span key={tag} className={`font-bold serif italic ${idx === 0 ? 'text-4xl' : idx === 1 ? 'text-3xl' : 'text-xl'} text-gray-900 opacity-80`}>
                    {tag}
                  </span>
                ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorProfile;
