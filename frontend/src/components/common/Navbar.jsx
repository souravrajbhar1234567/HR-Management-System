import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Bell, Shield, User, ArrowRightLeft } from 'lucide-react';

const Navbar = ({ role = 'admin' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentAdminView = location.pathname.startsWith('/admin');

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            {isCurrentAdminView ? 'Administrator Console' : 'My Employee Workspace'}
          </h2>
          <p className="text-[11px] text-slate-500">
            Welcome back, <span className="font-semibold text-slate-700">{user?.name || 'User'}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* If user is admin, show switch to employee portal button */}
        {user?.role === 'admin' && (
          <button
            onClick={() =>
              navigate(isCurrentAdminView ? '/employee/dashboard' : '/admin/dashboard')
            }
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            title="Switch Portal View"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-indigo-600" />
            <span>{isCurrentAdminView ? 'Switch to Employee View' : 'Back to Admin Console'}</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/employee/notifications')}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        {/* User Info & Badge */}
        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 font-bold text-xs text-indigo-600">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition ml-1"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;