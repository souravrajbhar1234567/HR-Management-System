import React, { useState } from 'react';
import { LEAVE_TYPES } from '../../utils/constants';

const LeaveForm = ({ onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    leaveType: LEAVE_TYPES[0],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Leave Type *</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
        >
          {LEAVE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">From Date *</label>
          <input
            type="date"
            name="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">To Date *</label>
          <input
            type="date"
            name="endDate"
            required
            value={formData.endDate}
            min={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Reason for Leave *</label>
        <textarea
          name="reason"
          required
          rows={3}
          value={formData.reason}
          onChange={handleChange}
          placeholder="Brief explanation for your leave request..."
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
