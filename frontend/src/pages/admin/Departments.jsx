import React, { useState, useEffect } from 'react';
import { getDepartments } from '../../services/departmentService';
import { Building2, Users, DollarSign, Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', head: '', budget: '', description: '' });

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const created = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      head: newDept.head || 'To be assigned',
      employeeCount: 1,
      budget: newDept.budget || '$30,000 / mo',
      description: newDept.description || 'General department activities.',
    };
    setDepartments((prev) => [...prev, created]);
    setIsAddOpen(false);
    setNewDept({ name: '', head: '', budget: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Departments Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize teams, assign department heads, and allocate operational budgets.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                  <Users className="h-3.5 w-3.5" />
                  <span>{dept.employeeCount} staff</span>
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">{dept.name}</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{dept.description}</p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Department Head:</span>
                <span className="font-semibold text-slate-800">{dept.head}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Budget:</span>
                <span className="font-semibold text-slate-800">{dept.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Department">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Department Name *</label>
            <input
              type="text"
              required
              value={newDept.name}
              onChange={(e) => setNewDept((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Quality Assurance"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Head of Department</label>
            <input
              type="text"
              value={newDept.head}
              onChange={(e) => setNewDept((prev) => ({ ...prev, head: e.target.value }))}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Monthly Budget</label>
            <input
              type="text"
              value={newDept.budget}
              onChange={(e) => setNewDept((prev) => ({ ...prev, budget: e.target.value }))}
              placeholder="e.g. $50,000 / mo"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <textarea
              rows={3}
              value={newDept.description}
              onChange={(e) => setNewDept((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of department scope..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              Save Department
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Departments;
