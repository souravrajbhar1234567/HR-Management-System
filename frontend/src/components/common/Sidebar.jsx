import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck2,
  CalendarOff,
  DollarSign,
  Megaphone,
  BarChart3,
  Settings,
  User,
  Receipt,
  CheckSquare,
  Bell,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Employees', path: '/admin/employees', icon: Users },
  { name: 'Departments', path: '/admin/departments', icon: Building2 },
  { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck2 },
  { name: 'Leaves', path: '/admin/leaves', icon: CalendarOff },
  { name: 'Payroll', path: '/admin/payroll', icon: DollarSign },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const EMPLOYEE_NAV = [
  { name: 'My Portal', path: '/employee/dashboard', icon: LayoutDashboard },
  { name: 'My Profile', path: '/employee/profile', icon: User },
  { name: 'My Attendance', path: '/employee/attendance', icon: CalendarCheck2 },
  { name: 'My Leaves', path: '/employee/leaves', icon: CalendarOff },
  { name: 'My Payroll', path: '/employee/payroll', icon: DollarSign },
  { name: 'My Payslips', path: '/employee/payslips', icon: Receipt },
  { name: 'My Tasks', path: '/employee/tasks', icon: CheckSquare },
  { name: 'Notifications', path: '/employee/notifications', icon: Bell },
];

const Sidebar = ({ role = 'admin', isOpen = false, onClose }) => {
  const { user } = useAuth();
  const navItems = role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;
  const portalLabel = role === 'admin' ? 'Admin Workspace' : 'Employee Workspace';

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Slide-over drawer on mobile, static column on lg+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-800 bg-slate-950 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header & Mobile Close Button */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950 px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-black text-white shadow-md shadow-indigo-500/20">
                PH
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white">PeopleHub</h1>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400">
                  {role === 'admin' ? (
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <UserCheck className="h-3 w-3 text-sky-400" />
                  )}
                  <span>{portalLabel}</span>
                </div>
              </div>
            </div>

            {/* Close Button for mobile */}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation list */}
          <nav className="mt-4 flex flex-1 flex-col space-y-1 px-3">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Menu Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white active:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile Preview */}
        <div className="shrink-0 border-t border-slate-800/80 bg-slate-900/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-950 text-xs font-bold text-indigo-300">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{user?.name || 'User'}</p>
              <p className="truncate text-[10px] capitalize text-slate-400">{user?.role || role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;