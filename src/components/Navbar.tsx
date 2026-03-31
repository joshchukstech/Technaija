import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { Menu, X, Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 dark:bg-white border-b border-slate-800 dark:border-slate-200 text-white dark:text-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-emerald-400 dark:text-emerald-600">Tech9ja</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-emerald-400 dark:hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/blog" className="hover:text-emerald-400 dark:hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
              <Link to="/about" className="hover:text-emerald-400 dark:hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="hover:text-emerald-400 dark:hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              <Link to="/privacy-policy" className="hover:text-emerald-400 dark:hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">Privacy</Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {user ? (
                <button onClick={handleLogout} className="flex items-center hover:text-emerald-400 dark:hover:text-emerald-600">
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center hover:text-emerald-400 dark:hover:text-emerald-600">
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white dark:hover:text-slate-900 hover:bg-gray-700 dark:hover:bg-slate-200 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/blog" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
            <Link to="/about" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Privacy Policy</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="bg-emerald-600 hover:bg-emerald-700 block px-3 py-2 rounded-md text-base font-medium text-center">Dashboard</Link>
            )}
            <button
              onClick={toggleTheme}
              className="w-full text-left hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            {user ? (
              <button onClick={handleLogout} className="w-full text-left hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            ) : (
              <Link to="/login" className="hover:text-emerald-400 dark:hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
