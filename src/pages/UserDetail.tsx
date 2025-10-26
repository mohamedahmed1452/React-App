import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchPostsByUser, fetchTodosByUser } from "../api/users";
import type { Todo } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading: userLoading } = useQuery({ 
    queryKey: ["user", id], 
    queryFn: () => fetchUser(id!)
  });
  const { data: posts, isLoading: postsLoading } = useQuery({ 
    queryKey: ["posts", id], 
    queryFn: () => fetchPostsByUser(id!)
  });
  const { data: todos, isLoading: todosLoading } = useQuery({ 
    queryKey: ["todos", id], 
    queryFn: () => fetchTodosByUser(id!)
  });

  const [overrides, setOverrides] = useLocalStorage<Record<number, boolean>>(`todos_override_${id}`, {});

  const toggle = (todo: Todo) => {
    setOverrides(prev => ({ ...prev, [todo.id]: !getCompleted(todo) }));
  };

  const getCompleted = (t: Todo) => {
    if (overrides && overrides[t.id] !== undefined) return overrides[t.id];
    return t.completed;
  };

  const completedCount = todos?.filter(t => getCompleted(t)).length || 0;

  if (userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
          <p className="text-slate-300 font-medium">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-8 lg:p-12 text-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link 
            to="/users" 
            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6 font-semibold transition-colors duration-300 hover:translate-x-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users
          </Link>

          {/* User Header Card */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl border border-slate-600/50 p-8 shadow-lg">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 mb-2">{user?.name}</h1>
                <p className="text-slate-300 text-lg font-medium mb-4">@{user?.username} • {user?.email}</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider">Posts</div>
                      <div className="text-sky-300 font-bold text-lg">{posts?.length || 0}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider">Completed</div>
                      <div className="text-emerald-300 font-bold text-lg">{completedCount}/{todos?.length || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts Section */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-600/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">Posts</h2>
              </div>
              <span className="px-4 py-2 bg-sky-600/20 text-sky-300 rounded-full text-sm font-bold">{posts?.length || 0}</span>
            </div>
            
            {postsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
                {posts.map(post => (
                  <div key={post.id} className="p-4 bg-slate-700/40 border border-slate-600 rounded-xl hover:border-slate-500 hover:bg-slate-700/60 transition-all duration-300">
                    <h3 className="font-bold text-slate-100 mb-2 line-clamp-2 hover:text-white transition-colors">{post.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-3">{post.body}</p>
                    <div className="mt-3 text-xs text-slate-400 font-mono">Post #{post.id}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">No posts yet</div>
            )}
          </div>

          {/* Todos Section */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-600/50 hover:border-slate-500/80 p-8 transition-all duration-500 backdrop-blur-sm disable-select hover:from-slate-800/70 hover:to-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">To-do List</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-600/20 text-emerald-300 rounded-full text-xs font-bold">{completedCount} Done</span>
                <span className="px-3 py-1.5 bg-slate-600/40 text-slate-300 rounded-full text-xs font-bold">{todos?.length || 0}</span>
              </div>
            </div>

            {todosLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : todos && todos.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
                {todos.map(todo => {
                  const done = getCompleted(todo);
                  return (
                    <div
                      key={todo.id}
                      className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                        done 
                          ? "bg-emerald-900/20 border-emerald-600/50 hover:border-emerald-500/80" 
                          : "bg-slate-700/40 border-slate-600 hover:border-slate-500 hover:bg-slate-700/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggle(todo)}
                          className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 transition-all duration-200 flex items-center justify-center font-bold ${
                            done
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-slate-500 hover:border-emerald-500 hover:bg-slate-600/50"
                          }`}
                        >
                          {done && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`text-sm flex-1 font-medium transition-all ${done ? "text-emerald-300 line-through" : "text-slate-200"}`}>
                          {todo.title}
                        </span>
                        <button
                          onClick={() => toggle(todo)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                            done
                              ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40"
                              : "bg-slate-600/40 text-slate-300 hover:bg-slate-600/60"
                          }`}
                        >
                          {done ? "Undo" : "Mark Done"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">No todos yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}