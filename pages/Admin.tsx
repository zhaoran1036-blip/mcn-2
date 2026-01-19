
import React, { useState } from 'react';
import { MOCK_CREATORS } from '../constants';
// Fix: Added missing Filter icon import from lucide-react
import { Settings, Users, Briefcase, Plus, Search, Tag, MoreVertical, Filter } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crm' | 'projects'>('crm');

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 p-6 flex flex-col gap-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Internal Dashboard</p>
        <button 
          onClick={() => setActiveTab('crm')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'crm' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Users size={20} /> Creator CRM
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Briefcase size={20} /> Project Pipeline
        </button>
        <div className="mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 w-full">
            <Settings size={20} /> Settings
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'crm' ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold serif text-gray-900">Creator Management</h2>
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:scale-105 transition-all">
                <Plus size={20} /> Add New Creator
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search database..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-50 rounded-lg text-gray-400"><Tag size={16}/></button>
                  <button className="p-2 bg-gray-50 rounded-lg text-gray-400"><Filter size={16}/></button>
                </div>
              </div>

              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Creator</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Audience</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Quote</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_CREATORS.map(creator => (
                    <tr key={creator.id} className="hover:bg-gray-50/50 transition-all cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={creator.avatar} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{creator.name}</p>
                            <p className="text-xs text-gray-400">{creator.platform}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">Active</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 font-medium">{creator.followers}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        $2,500 - $4,000
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold serif text-gray-900">Project Pipeline</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Selecting', 'Shooting', 'Reviewing', 'Published'].map(status => (
                <div key={status} className="flex flex-col gap-4">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{status}</h3>
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
                  </div>
                  
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm border-t-4 border-t-indigo-500">
                    <p className="text-xs font-bold text-indigo-600 mb-1">Switzerland Tourism</p>
                    <p className="text-sm font-bold text-gray-900 mb-4">Winter Ski Campaign 2024</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                         <img src={MOCK_CREATORS[0].avatar} className="w-6 h-6 rounded-full ring-2 ring-white object-cover" />
                         <img src={MOCK_CREATORS[1].avatar} className="w-6 h-6 rounded-full ring-2 ring-white object-cover" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">Updated 2h ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
