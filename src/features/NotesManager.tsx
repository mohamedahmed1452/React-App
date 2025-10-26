    import { useState } from "react";
    import { v4 as uuidv4 } from "uuid";
    import { useLocalStorage } from "../hooks/useLocalStorage";
    import type { Note } from "../types";

    export default function NotesManager() {
    const [notes, setNotes] = useLocalStorage<Note[]>("notes_v1", []);
    const [text, setText] = useState("");
    const [priority, setPriority] = useState<Note["priority"]>("normal");

    const add = () => {
        if (!text.trim()) return;
        const n: Note = { id: uuidv4(), text: text.trim(), priority, createdAt: new Date().toISOString() };
        setNotes(prev => [n, ...prev]);
        setText("");
    };

    const del = (id: string) => setNotes(prev => prev.filter(x => x.id !== id));
    const changePriority = (id: string, p: Note["priority"]) => setNotes(prev => prev.map(n => n.id === id ? { ...n, priority: p } : n));

    const grouped = {
        important: notes.filter(n => n.priority === "important"),
        normal: notes.filter(n => n.priority === "normal"),
        delayed: notes.filter(n => n.priority === "delayed"),
    };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Write your note here..." 
        />
        <select 
          value={priority} 
          onChange={e => setPriority(e.target.value as Note["priority"])} 
          className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>
        <button 
          onClick={add} 
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl transform hover:scale-105"
        >
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["important","normal","delayed"] as const).map(k => (
          <div key={k} className="border border-slate-600 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 bg-slate-800/40">
            <div className={`p-4 font-bold text-white text-lg capitalize flex items-center justify-between ${
              k === "important" ? "bg-gradient-to-r from-red-600/80 to-pink-600/80" :
              k === "normal" ? "bg-gradient-to-r from-sky-600/80 to-cyan-600/80" :
              "bg-gradient-to-r from-amber-600/80 to-orange-600/80"
            }`}>
              <span>{k}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">{grouped[k].length}</span>
            </div>
            <ul className="p-4 space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
              {grouped[k].map(n => (
                <li key={n.id} className="p-4 bg-slate-700/40 border border-slate-600 rounded-xl hover:border-slate-500 hover:bg-slate-700/60 transition-all duration-300 group hover:shadow-lg hover:shadow-slate-900/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-100 font-medium break-words">{n.text}</div>
                      <div className="text-xs text-slate-400 mt-2 font-mono">
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-2 flex-shrink-0">
                      <select 
                        value={n.priority} 
                        onChange={e => changePriority(n.id, e.target.value as Note["priority"])} 
                        className="px-2 py-1 bg-slate-600/50 border border-slate-500 text-slate-100 cursor-pointer rounded-lg text-xs font-medium focus:ring-1 focus:ring-emerald-400 transition-all"
                      >
                        <option value="important">Important</option>
                        <option value="normal">Normal</option>
                        <option value="delayed">Delayed</option>
                      </select>
                      <button 
                        onClick={() => del(n.id)} 
                        className="px-3 py-1 bg-red-600/20 border border-red-500/50 text-red-300 text-xs font-semibold cursor-pointer hover:bg-red-600/40 hover:border-red-500 transition-all duration-200 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {grouped[k].length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">No {k} notes yet</div>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}