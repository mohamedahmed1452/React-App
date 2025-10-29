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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-400"></div>
          <p className="text-slate-300 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-rose-400 text-lg font-semibold mb-2">Error loading users</div>
          <p className="text-slate-400 mb-4">Unable to fetch user data. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-medium transition-colors duration-150"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-300 hover:text-rose-400 mb-4 font-medium transition-colors duration-150"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-100 mb-1">Users</h1>
            <p className="text-slate-400 text-sm">Manage and view user details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data!.map(user => (
            <Link 
              key={user.id} 
              to={`/users/${user.id}`}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-150"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="text-xs text-slate-400 px-2 py-1 rounded-full font-mono">{user.id}</div>
              </div>
              
              <h3 className="font-semibold text-slate-100 text-lg mb-0">{user.name}</h3>
              <p className="text-slate-400 text-sm mb-3">@{user.username}</p>
              
              <div className="space-y-2 text-sm pt-2">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span>{user.address?.city || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
                <span className="font-medium">View Profile</span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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