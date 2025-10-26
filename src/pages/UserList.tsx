import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import { Link } from "react-router-dom";

export default function UsersList() {
  const { data, isLoading, error } = useQuery({ 
    queryKey: ["users"], 
    queryFn: fetchUsers 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
          <p className="text-slate-300 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center bg-slate-800 rounded-3xl p-8 shadow-xl border-2 border-red-500/50">
          <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 5v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-red-400 text-lg font-bold mb-2">Error Loading Users</div>
          <p className="text-slate-400 mb-6">Unable to fetch user data. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-8 lg:p-12 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6 font-semibold transition-colors duration-300 hover:translate-x-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl border border-slate-600/50 p-8 shadow-lg">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 mb-3">Users</h1>
            <p className="text-slate-300 text-lg font-medium">Manage and view user details, posts, and todos</p>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data!.map(user => (
            <Link 
              key={user.id} 
              to={`/users/${user.id}`}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl border border-slate-600/50 hover:border-slate-500/80 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:from-slate-800/70 hover:to-slate-700/50 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {user.name.charAt(0)}
                </div>
                <div className="text-xs text-slate-400 bg-slate-700/60 px-3 py-1.5 rounded-full font-mono font-semibold">#{user.id}</div>
              </div>
              
              <h3 className="font-bold text-slate-100 text-xl mb-1 group-hover:text-white transition-colors">{user.name}</h3>
              <p className="text-sky-400 text-sm mb-4 font-medium">@{user.username}</p>
              
              <div className="space-y-3 text-sm border-t border-slate-600/30 pt-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-300 truncate">{user.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-slate-300">{user.address?.city || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-600/30 flex items-center justify-between group-hover:text-sky-300 transition-colors">
                <span className="text-slate-400 font-semibold text-sm">View Profile</span>
                <svg className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}