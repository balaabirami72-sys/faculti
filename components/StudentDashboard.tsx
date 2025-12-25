
import React, { useState, useMemo } from 'react';
import { FacultyMember } from '../types';
import FacultyCard from './FacultyCard';
import { Search, Filter, RefreshCw, Layers } from 'lucide-react';

interface StudentDashboardProps {
  faculty: FacultyMember[];
  onSimulate: () => void;
  isSimulating: boolean;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ faculty, onSimulate, isSimulating }) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const departments = useMemo(() => {
    const depts = new Set(faculty.map(f => f.department));
    return ['All', ...Array.from(depts)];
  }, [faculty]);

  const filteredFaculty = useMemo(() => {
    return faculty.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'All' || f.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [faculty, search, deptFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Faculty Directory</h1>
          <p className="mt-2 text-slate-600">Track real-time availability and class schedules.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onSimulate}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              isSimulating 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <RefreshCw size={16} className={`mr-2 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulating Movement...' : 'Simulate Movement'}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <select
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-sm cursor-pointer"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          
          <div className="hidden lg:flex items-center text-slate-400 text-sm whitespace-nowrap ml-2">
            <Layers size={16} className="mr-2" />
            Showing {filteredFaculty.length} members
          </div>
        </div>
      </div>

      {filteredFaculty.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map(f => (
            <FacultyCard key={f.id} faculty={f} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <Search size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No results found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
