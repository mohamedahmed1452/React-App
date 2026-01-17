import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const ok = login(username, password);
    if (ok) {
      navigate("/dashboard");
    } else {
      setErr("Invalid username or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-36 -right-32 w-80 h-80 bg-white/6 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-36 -left-32 w-80 h-80 bg-white/6 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-white/80">Sign in to your account to continue</p>
          </div>

          {err && (
            <div className="mb-6 p-3 bg-red-600/10 border border-red-500/20 rounded-lg text-red-100 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{err}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-shadow duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-shadow duration-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-sky-700 rounded-xl font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-transform duration-150 transform-gpu hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/90 text-sm font-semibold mb-3 text-center">Demo Credentials:</p>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Username:</span>
                <span className="text-white font-medium">admin</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-white/70">Password:</span>
                <span className="text-white font-medium">password</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-3xl blur-xl opacity-50"></div>
      </div>
    </div>
  );
}
