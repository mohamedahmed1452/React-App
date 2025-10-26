import { useQuery } from "@tanstack/react-query";
import { fetchUsers} from "../api/users";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function AnalyticsCard() {
  const { data: users } = useQuery({queryKey: ["users"], queryFn: fetchUsers});

  const { data: allPosts, isLoading: postsLoading } = useQuery({queryKey: ["posts_all"], queryFn: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
  }});

  const { data: allTodos, isLoading: todosLoading } = useQuery({queryKey: ["todos_all"], queryFn: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    return res.json();
  }});

  if (!users || postsLoading || todosLoading) return <div>Loading analytics...</div>;

  const postsByUser = (allPosts as Post[]).reduce<Record<number, number>>((acc, p) => {
    acc[p.userId] = (acc[p.userId] || 0) + 1;
    return acc;
  }, {});

  const completedByUser = (allTodos as Todo[]).reduce<Record<number, number>>((acc, t) => {
    if (t.completed) acc[t.userId] = (acc[t.userId] || 0) + 1;
    return acc;
  }, {});

  const userStats = users.map(u => ({
    id: u.id,
    username: u.username,
    posts: postsByUser[u.id] || 0,
    completedTodos: completedByUser[u.id] || 0,
  }));

  const mostPosts = userStats.reduce((a, b) => (b.posts > a.posts ? b : a), userStats[0]);
  const fewestPosts = userStats.reduce((a, b) => (b.posts < a.posts ? b : a), userStats[0]);
  const mostCompletedTodos = userStats.reduce((a,b)=> (b.completedTodos > a.completedTodos ? b : a), userStats[0]);
  const fewestCompletedTodos = userStats.reduce((a,b)=> (b.completedTodos < a.completedTodos ? b : a), userStats[0]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-purple-600/40 to-indigo-600/40 border border-purple-500/50 rounded-2xl backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-500/80 group">
        <div className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Total Users</div>
        <div className="text-5xl font-bold text-slate-100 mt-2 group-hover:text-white transition-colors">{users?.length || 0}</div>
        <div className="mt-3 h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-gradient-to-br from-sky-600/30 to-cyan-600/30 border border-sky-500/50 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-sky-500/80 transition-all duration-300 hover:from-sky-600/40 hover:to-cyan-600/40 transform hover:scale-105">
          <div className="text-xs font-bold text-sky-300 uppercase tracking-widest mb-2">📝 Most Posts</div>
          <div className="font-bold text-xl text-slate-100">{mostPosts?.username}</div>
          <div className="text-sm text-sky-400 font-semibold mt-2">{mostPosts?.posts} posts</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-sky-500 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-gradient-to-br from-slate-600/30 to-gray-600/30 border border-slate-500/50 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-slate-500/80 transition-all duration-300 hover:from-slate-600/40 hover:to-gray-600/40 transform hover:scale-105">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">📊 Fewest Posts</div>
          <div className="font-bold text-xl text-slate-100">{fewestPosts?.username}</div>
          <div className="text-sm text-slate-400 font-semibold mt-2">{fewestPosts?.posts} posts</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-slate-500 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-gradient-to-br from-emerald-600/30 to-teal-600/30 border border-emerald-500/50 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-emerald-500/80 transition-all duration-300 hover:from-emerald-600/40 hover:to-teal-600/40 transform hover:scale-105">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-2">✅ Most Completed</div>
          <div className="font-bold text-xl text-slate-100">{mostCompletedTodos?.username}</div>
          <div className="text-sm text-emerald-400 font-semibold mt-2">{mostCompletedTodos?.completedTodos} todos</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-gradient-to-br from-orange-600/30 to-amber-600/30 border border-orange-500/50 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-orange-500/80 transition-all duration-300 hover:from-orange-600/40 hover:to-amber-600/40 transform hover:scale-105">
          <div className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">⏳ Fewest Completed</div>
          <div className="font-bold text-xl text-slate-100">{fewestCompletedTodos?.username}</div>
          <div className="text-sm text-orange-400 font-semibold mt-2">{fewestCompletedTodos?.completedTodos} todos</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}