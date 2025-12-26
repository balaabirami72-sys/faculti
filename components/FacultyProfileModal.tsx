
import React from 'react';
import { FacultyMember, Status } from '../types.ts';
import { ZONE_STATUS_MAP } from '../constants.ts';
import StatusBadge from './StatusBadge.tsx';
import { X, Mail, Calendar, MapPin, MessageSquare, Clock, GraduationCap } from 'lucide-react';

interface FacultyProfileModalProps {
  faculty: FacultyMember | null;
  onClose: () => void;
}

const FacultyProfileModal: React.FC<FacultyProfileModalProps> = ({ faculty, onClose }) => {
  if (!faculty) return null;

  const getStatus = (): Status => {
    if (faculty.isDNDOverride) return Status.DND;
    return ZONE_STATUS_MAP[faculty.currentZone] || Status.OFFLINE;
  };

  const status = getStatus();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white z-10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="bg-indigo-600 h-32 sm:h-40 relative">
          <div className="absolute -bottom-16 left-8 p-1.5 bg-white rounded-2xl shadow-xl">
            <img 
              src={faculty.avatar} 
              alt={faculty.name} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{faculty.name}</h2>
              <div className="flex items-center text-slate-500 mt-1 font-medium">
                <GraduationCap size={18} className="mr-2 text-indigo-500" />
                {faculty.department}
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <StatusBadge status={status} />
              <span className="text-[10px] text-slate-400 font-mono text-right">
                LAST UPDATED:<br/>{new Date(faculty.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Email Address</p>
                      <p className="text-sm font-medium text-slate-700 truncate">{faculty.email}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Location Privacy</h3>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                  <MapPin size={18} className="text-amber-600 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Specific room details are hidden for privacy. Status reflects real-time campus activity.
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">General Availability</h3>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-400" />
                    <div className="text-sm">
                      <p className="font-semibold text-slate-700">Office Hours</p>
                      <p className="text-slate-500">Mon/Wed: 2:00 PM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfileModal;
