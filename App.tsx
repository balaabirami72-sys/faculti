
import React, { useState, useCallback } from 'react';
import { User, Users, ShieldCheck, LayoutDashboard, Settings } from 'lucide-react';
import { FacultyMember } from './types.ts';
import { INITIAL_FACULTY, ZONES } from './constants.ts';
import StudentDashboard from './components/StudentDashboard.tsx';
import FacultyDashboard from './components/FacultyDashboard.tsx';

const App: React.FC = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>(INITIAL_FACULTY);
  const [activeTab, setActiveTab] = useState<'student' | 'faculty'>('student');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentUser] = useState<FacultyMember>(INITIAL_FACULTY[0]);

  const simulateMovement = useCallback(() => {
    setIsSimulating(true);
    
    const interval = setInterval(() => {
      setFaculty(prev => prev.map(f => {
        if (Math.random() > 0.4) return f;
        
        const randomZoneIndex = Math.floor(Math.random() * ZONES.length);
        const newZone = ZONES[randomZoneIndex];
        
        return {
          ...f,
          currentZone: newZone,
          lastUpdated: new Date().toISOString()
        };
      }));
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 6100);
  }, []);

  const toggleDND = () => {
    setFaculty(prev => prev.map(f => {
      if (f.id === currentUser.id) {
        return { ...f, isDNDOverride: !f.isDNDOverride, lastUpdated: new Date().toISOString() };
      }
      return f;
    }));
  };

  const currentFacultyUser = faculty.find(f => f.id === currentUser.id) || currentUser;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">
                Academia<span className="text-indigo-600">Track</span>
              </span>
            </div>
            
            <nav className="flex items-center bg-slate-100 p-1 rounded-xl my-2">
              <button
                onClick={() => setActiveTab('student')}
                className={`flex items-center px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'student' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Users size={16} className="mr-2" />
                Student View
              </button>
              <button
                onClick={() => setActiveTab('faculty')}
                className={`flex items-center px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'faculty' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <User size={16} className="mr-2" />
                Faculty Portal
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Session</span>
                <span className="text-xs text-slate-600 font-medium">Lakeside Campus</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">
        {activeTab === 'student' ? (
          <StudentDashboard 
            faculty={faculty} 
            onSimulate={simulateMovement} 
            isSimulating={isSimulating}
          />
        ) : (
          <FacultyDashboard 
            faculty={currentFacultyUser} 
            onToggleDND={toggleDND}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} AcademiaTrack Systems. All location data is anonymized and encrypted per university privacy standards.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
