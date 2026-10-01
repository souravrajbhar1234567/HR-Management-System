import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const EmployeeTable = ({ employees = [], onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3.5">Employee</th>
              <th className="px-6 py-3.5">ID</th>
              <th className="px-6 py-3.5">Department</th>
              <th className="px-6 py-3.5">Designation</th>
              <th className="px-6 py-3.5">Salary</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 whitespace-nowrap">
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-slate-50/60 transition">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80'}
                      alt={emp.name}
                      className="h-9 w-9 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{emp.name}</p>
                      <p className="text-[11px] text-slate-500">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3.5 font-mono text-slate-600">{emp.employeeId}</td>
                <td className="px-6 py-3.5 font-medium">{emp.department}</td>
                <td className="px-6 py-3.5 text-slate-600">{emp.designation}</td>
                <td className="px-6 py-3.5 font-semibold text-slate-900">
                  {formatCurrency(emp.salary || 6500)}
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      emp.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : emp.status === 'On Leave'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {emp.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {onView && (
                      <button
                        onClick={() => onView(emp)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(emp)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition"
                        title="Edit Record"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(emp._id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                        title="Delete Record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
