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
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow transition-all duration-200 group">
        <div className="text-sm font-semibold text-rose-500 uppercase tracking-wider">Total Users</div>
          <div className="text-4xl md:text-5xl font-extrabold text-slate-100 mt-2">{users?.length || 0}</div>
        <div className="mt-3 h-1 w-16 bg-gradient-to-r from-rose-400 to-orange-300 rounded-full transition-all duration-300"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
         <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">📝 Most Posts</div>
         <div className="font-bold text-lg text-slate-100">{mostPosts?.username}</div>
         <div className="text-sm text-slate-400 font-medium mt-2">{mostPosts?.posts} posts</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-rose-400 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
         <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">📊 Fewest Posts</div>
         <div className="font-bold text-lg text-slate-100">{fewestPosts?.username}</div>
         <div className="text-sm text-slate-400 font-medium mt-2">{fewestPosts?.posts} posts</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-gray-300 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
         <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">✅ Most Completed</div>
         <div className="font-bold text-lg text-slate-100">{mostCompletedTodos?.username}</div>
         <div className="text-sm text-slate-400 font-medium mt-2">{mostCompletedTodos?.completedTodos} todos</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-rose-400 to-transparent rounded-full"></div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">⏳ Fewest Completed</div>
            <div className="font-bold text-lg text-slate-100">{fewestCompletedTodos?.username}</div>
            <div className="text-sm text-slate-400 font-medium mt-2">{fewestCompletedTodos?.completedTodos} todos</div>
          <div className="mt-3 h-0.5 bg-gradient-to-r from-gray-300 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}