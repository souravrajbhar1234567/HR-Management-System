import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();
  const homePath = user?.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-600 shadow-sm border border-rose-100">
        <ShieldAlert className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900">Access Restricted</h1>
      <p className="mt-2 max-w-sm text-xs text-slate-500">
        You do not possess the required administrator credentials to view this section of PeopleHub.
      </p>

      <div className="mt-6">
        <Link
          to={homePath}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Authorized Workspace</span>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
