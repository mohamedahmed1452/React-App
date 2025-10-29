import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: location.pathname === "/dashboard" },
    { name: "Users", href: "/users", current: location.pathname.startsWith("/users") },
  ];

  if (!isAuthenticated) return null;

  return (
    <header className="bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 text-slate-100 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-3 group" aria-label="Dashboard Home">
              <div className="w-11 h-11 bg-gradient-to-br from-rose-600 to-orange-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-extrabold tracking-tight">MyStudio</span>
                <span className="text-xs text-slate-400 font-medium">Personal Dashboard</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block ml-8" aria-label="Primary">
              <ul className="flex items-center space-x-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                        item.current
                          ? "text-white bg-gradient-to-r from-rose-500 to-orange-300 shadow"
                          : "text-slate-200 hover:text-rose-400 hover:bg-slate-900"
                      }`}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center gap-4 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="w-9 h-9 bg-rose-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Account</span>
                <span className="text-sm font-semibold text-slate-100">{user?.username || "User"}</span>
              </div>
            </div>

            {/* Logout Button */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:opacity-95 transition-all duration-200 shadow-sm"
                aria-label="Logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-200 hover:text-rose-400 bg-slate-900 border border-slate-800 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 bg-slate-950 rounded-b-lg">
            <ul className="space-y-2 px-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-semibold transition-all duration-200 ${
                      item.current
                        ? "text-white bg-rose-500"
                        : "text-slate-200 hover:text-rose-400 hover:bg-slate-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="px-3 py-3 text-sm text-slate-400 border-t border-slate-800 mt-3 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Logged in as</span>
                    <span className="block font-semibold text-slate-100">{user?.username || "User"}</span>
                  </div>
                </div>
              </li>
              <li className="px-4 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2 px-4 py-2 text-base font-semibold text-white bg-rose-500 rounded-md hover:opacity-95 transition-all duration-150"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}