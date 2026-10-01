import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const loggedUser = await login({ email, password });
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        const isLocal =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1';
        setError(
          isLocal
            ? 'Cannot connect to local backend server. Please make sure your backend is running on port 5001.'
            : 'Cannot connect to the live backend server. Please verify your backend web service is deployed on Render and VITE_API_BASE_URL is set in Render Environment Variables.'
        );
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-extrabold text-white text-lg shadow-lg shadow-indigo-500/30">
            PH
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-3">PeopleHub</h1>
          <p className="mt-1 text-xs text-slate-400">Enterprise HR Management & Workforce Platform</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-500/10 p-3 text-xs font-semibold text-rose-400 border border-rose-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@peoplehub.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-[11px] font-medium text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition disabled:opacity-50 mt-2"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Demo Credentials Pill */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 text-center mb-2">
            One-Click Login Credentials
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('admin@peoplehub.com', 'admin123')}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/50 p-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Admin</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">admin123</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('employee@peoplehub.com', 'employee123')}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/50 p-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-sky-400" />
                <span className="font-semibold">Employee</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">employee123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;