import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Building, Bell, Shield, Clock } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'PeopleHub Technologies Inc.',
    adminEmail: 'admin@peoplehub.com',
    workingHoursStart: '09:00',
    workingHoursEnd: '18:00',
    currency: 'USD ($)',
    enableEmailAlerts: true,
    autoApproveCasualLeave: false,
    probationMonths: '3',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System preferences saved successfully!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure corporate policies, standard office hours, and system preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Info */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-800 text-sm">
            <Building className="h-4 w-4 text-indigo-600" />
            <span>Corporate Identity</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Company Legal Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Primary Contact Email</label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Attendance & Working Hours */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-800 text-sm">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span>Working Hours & Shifts</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Work Shift Starts</label>
              <input
                type="time"
                name="workingHoursStart"
                value={settings.workingHoursStart}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Work Shift Ends</label>
              <input
                type="time"
                name="workingHoursEnd"
                value={settings.workingHoursEnd}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Standard Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications and Automations */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-800 text-sm">
            <Bell className="h-4 w-4 text-indigo-600" />
            <span>Workflow & Automated Triggers</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="enableEmailAlerts"
                checked={settings.enableEmailAlerts}
                onChange={handleChange}
                className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              <span>Send automated email notifications when leaves are applied or decided</span>
            </label>

            <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="autoApproveCasualLeave"
                checked={settings.autoApproveCasualLeave}
                onChange={handleChange}
                className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              <span>Enable 1-day casual leave auto-approval if balance permits</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <Save className="h-4 w-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
