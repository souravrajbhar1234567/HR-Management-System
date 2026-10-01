import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, DESIGNATIONS } from '../../utils/constants';

const EmployeeForm = ({ employee, onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: DEPARTMENTS[0],
    designation: DESIGNATIONS[0],
    phone: '',
    salary: 6500,
    status: 'Active',
    location: '',
    avatar: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || DEPARTMENTS[0],
        designation: employee.designation || DESIGNATIONS[0],
        phone: employee.phone || '',
        salary: employee.salary || 6500,
        status: employee.status || 'Active',
        location: employee.location || '',
        avatar: employee.avatar || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="alex.morgan@peoplehub.com"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
          >
            {DESIGNATIONS.map((desig) => (
              <option key={desig} value={desig}>
                {desig}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Monthly Salary ($)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Avatar Image URL</label>
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
          {isSubmitting ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
