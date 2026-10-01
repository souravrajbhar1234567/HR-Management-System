import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Building, Calendar, DollarSign, Award, CheckCircle, Save } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'System Administrator',
    phone: user?.phone || '+1 (555) 234-5678',
    location: user?.location || 'San Francisco, CA',
    department: user?.department || 'Engineering',
    designation: user?.designation || 'Software Engineer',
    emergencyContact: '+1 (555) 987-6543',
    bankAccount: '•••••••• 8821',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser(formData);
    }
    toast.success('Your profile was updated successfully!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Profile & Account</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View your employment details and keep your contact information up to date.
        </p>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur-xs border-2 border-white/30">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ME'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
                {user?.employeeId || 'EMP-1001'}
              </span>
            </div>
            <p className="text-xs text-indigo-100 mt-0.5">{user?.designation || 'Team Member'}</p>
            <p className="text-[11px] text-indigo-200 mt-1">{user?.email}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            Personal & Contact Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Email Address (Locked)</label>
              <input
                type="email"
                disabled
                value={user?.email}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Work Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Direct Deposit Bank Account</label>
              <input
                type="text"
                disabled
                value={formData.bankAccount}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Work & Organization Details Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            Organization & Position
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="text-slate-400">Department</span>
              <p className="font-bold text-slate-800 mt-1">{user?.department || 'Engineering'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="text-slate-400">Designation</span>
              <p className="font-bold text-slate-800 mt-1">{user?.designation || 'Specialist'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="text-slate-400">System Role</span>
              <p className="font-bold text-slate-800 mt-1 capitalize">{user?.role || 'Employee'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <Save className="h-4 w-4" />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
