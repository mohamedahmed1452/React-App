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
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-rose-900 focus:border-transparent transition-all duration-200" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Write your note here..." 
        />
        <select 
          value={priority} 
          onChange={e => setPriority(e.target.value as Note["priority"])} 
          className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-sm"
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>
        <button 
          onClick={add} 
          className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-sm"
        >
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {( ["important", "normal", "delayed"] as const ).map(k => {
          const titles: Record<Note["priority"], string> = {
            important: "High Priority Notes",
            normal: "Standard Notes List",
            delayed: "Delayed Action Items",
          };
          const title = titles[k];

          return (
            <div key={k} className="border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 bg-slate-900">
              <div className={`p-4 font-extrabold text-slate-100 text-lg flex items-center justify-between space-x-4 ${
                k === "important" ? "bg-rose-900/10" : k === "normal" ? "bg-amber-900/6" : "bg-slate-800"
              }`}>
                <span className="header-title truncate whitespace-nowrap text-lg md:text-xl">{title}</span>
                <span className="ml-auto flex items-center justify-center w-8 h-8 bg-slate-800 rounded-full text-sm font-semibold text-slate-300 shadow">{grouped[k].length}</span>
              </div>

              <ul className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {grouped[k].map(n => (
                  <li key={n.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg transition-all duration-200 group hover:shadow-md">
                    <div className="flex flex-col gap-3">
                      <div className="min-w-0">
                        <div className="text-sm text-slate-100 font-medium whitespace-normal break-normal leading-relaxed">{n.text}</div>
                        <div className="text-xs text-slate-400 mt-2 font-mono">{new Date(n.createdAt).toLocaleString()}</div>
                      </div>

                      <div className="flex  items-center justify-center gap-1">
                        {/* Priority button: cycles through priorities on click */}
                        <button 
                          onClick={() => {
                            const next: Note["priority"] = n.priority === "important" ? "normal" : n.priority === "normal" ? "delayed" : "important";
                            changePriority(n.id, next);
                          }}
                          aria-label={`Change priority (currently ${n.priority})`}
                          className={`w-28 flex items-center justify-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 border ${
                            n.priority === "important" ? "bg-rose-600 border-rose-700 text-white shadow-md" : n.priority === "normal" ? "bg-amber-700 border-amber-800 text-white shadow-sm" : "bg-slate-800 border-slate-700 text-slate-100"
                          }`}
                        >
                          <span className={`inline-block w-2 h-2 rounded-full ${n.priority === "important" ? "bg-rose-300" : n.priority === "normal" ? "bg-amber-300" : "bg-slate-500"}`}></span>
                          <span className="capitalize ">{n.priority}</span>
                        </button>

                  
                        <button
                          onClick={() => del(n.id)}
                          aria-label="Delete note"
                          className="w-28 flex items-center justify-center gap-2 px-3 py-1 rounded-md text-sm font-semibold transition-all duration-150 bg-rose-600 hover:bg-rose-700 text-white border border-rose-700 shadow-md"
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
          );
        })}
      </div>
    </div>
  );
}