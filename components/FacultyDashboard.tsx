
import React from 'react';
import { FacultyMember, Status } from '../types.ts';
import { ZONE_STATUS_MAP } from '../constants.ts';
import StatusBadge from './StatusBadge.tsx';
import { Shield, Eye, MapPin, Power, Lock } from 'lucide-react';

interface FacultyDashboardProps {
  faculty: FacultyMember;
  onToggleDND: () => void;
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ faculty, onToggleDND }) => {
  const currentStatus = faculty.isDNDOverride ? Status.DND : ZONE_STATUS_MAP[faculty.currentZone];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 h-32 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-2xl shadow-lg">
            <img 
              src={faculty.avatar} 
              alt={faculty.name} 
              className="w-24 h-24 rounded-xl object-cover"
            />
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{faculty.name}</h1>
              <p className="text-slate-500">{faculty.department} Faculty Portal</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-400">Public Status:</span>
              <StatusBadge status={currentStatus} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Shield size={16} className="mr-2" />
                Privacy Controls
              </h2>
              
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">Do Not Disturb</h3>
                    <p className="text-xs text-slate-500 mt-1">Manual override to hide current activity</p>
                  </div>
                  <button 
                    onClick={onToggleDND}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${faculty.isDNDOverride ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${faculty.isDNDOverride ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start gap-3">
                  <Lock size={16} className="text-indigo-600 mt-0.5" />
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    <strong>Privacy Rule Active:</strong> Students only see your general status. Exact location logs are strictly restricted to administration.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Eye size={16} className="mr-2" />
                Live Feed Preview
              </h2>
              
              <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MapPin size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Live Location Data</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Current Zone</span>
                      <div className="text-xl font-medium flex items-center gap-2">
                        <MapPin size={20} className="text-indigo-400" />
                        {faculty.currentZone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
