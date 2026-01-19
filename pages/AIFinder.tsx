
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Loader2, CheckCircle, Info } from 'lucide-react';
import { findCreatorsWithAI } from '../services/gemini';
import { AISearchResult, Creator } from '../types';
import CreatorCard from '../components/CreatorCard';

const AIFinder: React.FC = () => {
  const [params] = useSearchParams();
  const queryParam = params.get('q') || "";
  const [input, setInput] = useState(queryParam);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISearchResult | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const runSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setSteps([]);

    const messages = [
      "Scanning global creator database...",
      "Analyzing engagement patterns...",
      "Matching brand tone & visual style...",
      "Calculating estimated ROI...",
      "Finalizing recommendations..."
    ];

    for (let i = 0; i < messages.length; i++) {
      setSteps(prev => [...prev, messages[i]]);
      await new Promise(r => setTimeout(r, 600));
    }

    const aiResult = await findCreatorsWithAI(query);
    setResult(aiResult);
    setLoading(false);
  };

  useEffect(() => {
    if (queryParam) {
      runSearch(queryParam);
    }
  }, [queryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(input);
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold serif mb-4">AI Creator Matchmaker</h2>
          <p className="text-gray-500">Describe your campaign goals, and our AI will find the perfect storytellers.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Authentic travel vloggers for a Bali eco-resort campaign targeting Gen-Z..."
              className="w-full pl-14 pr-8 py-5 rounded-2xl bg-white border border-gray-200 shadow-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-lg"
            />
            <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600" size={24} />
            <button className="hidden sm:block absolute right-3 top-3 bottom-3 px-8 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all">
              Search
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <div className="space-y-2 text-center">
              {steps.map((step, idx) => (
                <p key={idx} className={`text-sm ${idx === steps.length - 1 ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                  {idx < steps.length - 1 && <CheckCircle size={12} className="inline mr-2 text-green-500" />}
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.creators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-32">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-6">
                <Sparkles size={18} />
                <span>AI Insights</span>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl mb-6">
                <p className="text-indigo-900 leading-relaxed italic text-sm">
                  "{result.aiReasoning}"
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Match Accuracy</span>
                  <span className="font-bold text-gray-900">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${result.confidence * 100}%` }}></div>
                </div>
                <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg">
                  Add All to List
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFinder;
