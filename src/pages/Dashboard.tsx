import { Link } from "react-router-dom";
import NotesManager from "../features/NotesManager";
import AnalyticsCard from "../features/AnalyticsCard";
import WeatherCard from "../features/WeatherCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black p-6 md:p-8 lg:p-12 text-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 pb-8 border-b border-slate-700/50">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 mb-3">Dashboard</h1>
          <p className="text-slate-300 text-lg font-medium">Welcome to your personal workspace</p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">User & Posts Manager</h3>
                  <p className="text-slate-400 mt-2 font-medium">Manage users, posts, and todos in one place</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <Link 
                to="/users" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-sky-500/50 hover:shadow-xl transform hover:translate-x-1"
              >
                <span>Open Users Manager</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            
            <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">Note Manager</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">Organize your thoughts</p>
                </div>
              </div>
              <div className="bg-slate-900/20 rounded-2xl p-6">
                <NotesManager />
              </div>
            </div>
          </div>

          
          <aside className="space-y-8 relative">
            
            <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">Analytics</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">User insights</p>
                </div>
              </div>
              <div className="bg-slate-900/20 rounded-2xl p-6">
                <AnalyticsCard />
              </div>
            </div>

            
            <div className="  group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">Weather</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">Local conditions</p>
                </div>
              </div>
              <div className="bg-slate-900/20 rounded-2xl p-6">
                <WeatherCard />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}