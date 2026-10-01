import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Bell, ArrowRightLeft, Menu } from 'lucide-react';

const Navbar = ({ role = 'admin', onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentAdminView = location.pathname.startsWith('/admin');

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left: Hamburger menu toggle + View title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-xs sm:text-sm font-bold text-slate-800">
            {isCurrentAdminView ? 'Admin Console' : 'Employee Workspace'}
          </h2>
          <p className="hidden xs:block truncate text-[11px] text-slate-500">
            Hello, <span className="font-semibold text-slate-700">{user?.name?.split(' ')[0] || 'User'}</span>
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* If user is admin, show switch to employee portal button */}
        {user?.role === 'admin' && (
          <button
            onClick={() =>
              navigate(isCurrentAdminView ? '/employee/dashboard' : '/admin/dashboard')
            }
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            title="Switch Portal View"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
            <span className="hidden md:inline">
              {isCurrentAdminView ? 'Switch to Employee View' : 'Back to Admin Console'}
            </span>
            <span className="md:hidden text-[11px]">
              {isCurrentAdminView ? 'Employee' : 'Admin'}
            </span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/employee/notifications')}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        {/* User Info & Badge */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-xs font-bold text-indigo-600">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="truncate text-xs font-semibold leading-tight text-slate-800 max-w-[120px]">{user?.name}</p>
            <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
          title="Logout"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;