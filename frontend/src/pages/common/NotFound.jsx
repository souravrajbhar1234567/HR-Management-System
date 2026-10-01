import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth();
  const homePath = user?.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-3xl font-extrabold text-indigo-600 shadow-sm border border-indigo-100">
        404
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-xs text-slate-500">
        The link you followed may be broken, or the page may have been removed or renamed.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Link
          to={homePath}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
