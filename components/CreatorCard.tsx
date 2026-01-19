
import React from 'react';
import { Creator } from '../types';
import { Instagram, Play, Youtube, BarChart2 } from 'lucide-react';

interface Props {
  creator: Creator;
}

const CreatorCard: React.FC<Props> = ({ creator }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
      onClick={() => window.location.hash = `#/creator/${creator.id}`}
    >
      <div className="relative h-[400px]">
        <img 
          src={creator.avatar} 
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white font-bold text-2xl serif mb-1">{creator.name}</p>
          <p className="text-gray-300 text-sm font-light italic">"{creator.slogan}"</p>
        </div>
        <div className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30">
          {creator.followers} Followers
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {creator.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 border-t border-gray-50 pt-4">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Eng. Rate</p>
            <p className="text-sm font-bold text-gray-900">{creator.engagementRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">ROI Score</p>
            <p className="text-sm font-bold text-gray-900">{creator.conversionPower}/100</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Main Site</p>
            <div className="flex justify-center text-indigo-600">
              {creator.platform === 'Instagram' && <Instagram size={14} />}
              {creator.platform === 'TikTok' && <Play size={14} />}
              {creator.platform === 'YouTube' && <Youtube size={14} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
