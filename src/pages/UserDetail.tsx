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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-400"></div>
          <p className="text-slate-300 font-medium">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/users" 
            className="inline-flex items-center text-slate-300 hover:text-rose-400 mb-4 font-medium transition-colors duration-150"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users
          </Link>

          {/* User Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-slate-100 mb-1">{user?.name}</h1>
                <p className="text-slate-400 text-sm mb-3">@{user?.username} • {user?.email}</p>
                <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider">Posts</div>
                      <div className="text-slate-100 font-bold">{posts?.length || 0}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider">Completed</div>
                      <div className="text-slate-100 font-bold">{completedCount}/{todos?.length || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posts Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-100">Posts</h2>
              </div>
              <span className="text-sm text-slate-400">{posts?.length || 0}</span>
            </div>

            {postsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-400"></div>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {posts.map(post => (
                  <div key={post.id} className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                    <h3 className="font-semibold text-slate-100 mb-1">{post.title}</h3>
                    <p className="text-slate-300 text-sm">{post.body}</p>
                    <div className="mt-2 text-xs text-slate-500">Post #{post.id}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">No posts yet</div>
            )}
          </div>

          {/* Todos Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-100">To‑do List</h2>
              <div className="text-sm text-slate-400">{completedCount} done • {todos?.length || 0}</div>
            </div>

            {todosLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-400"></div>
              </div>
            ) : todos && todos.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {todos.map(todo => {
                  const done = getCompleted(todo);
                  return (
                    <div
                      key={todo.id}
                      className={`p-3 border rounded-lg transition-all duration-150 flex items-center justify-between ${done ? 'bg-slate-800' : 'bg-slate-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggle(todo)}
                          className="w-4 h-4 text-rose-400"
                        />
                        <span className={`text-sm ${done ? 'line-through text-slate-500' : 'text-slate-100'}`}>{todo.title}</span>
                      </div>
                      <button
                        onClick={() => toggle(todo)}
                        className={`px-2 py-1 text-xs rounded-md ${done ? 'bg-slate-800 text-slate-400' : 'bg-rose-900/10 text-rose-400'}`}
                      >
                        {done ? 'Undo' : 'Mark'}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">No todos yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}