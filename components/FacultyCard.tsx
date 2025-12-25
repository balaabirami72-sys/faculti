
import React from 'react';
import { FacultyMember, Status } from '../types';
import { ZONE_STATUS_MAP } from '../constants';
import StatusBadge from './StatusBadge';
import { Mail, ChevronRight } from 'lucide-react';

interface FacultyCardProps {
  faculty: FacultyMember;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const getStatus = (): Status => {
    if (faculty.isDNDOverride) return Status.DND;
    return ZONE_STATUS_MAP[faculty.currentZone] || Status.OFFLINE;
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5 flex items-start space-x-4">
        <div className="relative">
          <img 
            src={faculty.avatar} 
            alt={faculty.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
            status === Status.AVAILABLE ? 'bg-emerald-500' : 
            status === Status.IN_CLASS ? 'bg-amber-500' : 
            status === Status.DND ? 'bg-slate-800' : 'bg-rose-500'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 truncate leading-tight">
              {faculty.name}
            </h3>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <p className="text-sm text-slate-500 mb-2 font-medium">{faculty.department}</p>
          
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <span className="text-[10px] text-slate-400 font-mono">
              updated {new Date(faculty.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center text-xs text-slate-500">
          <Mail size={14} className="mr-1.5" />
          <span className="truncate max-w-[150px]">{faculty.email}</span>
        </div>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
