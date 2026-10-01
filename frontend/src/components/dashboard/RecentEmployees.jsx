import React from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const RecentEmployees = () => {
  const { employees } = useEmployee();
  const recent = employees.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Newest Team Members</h4>
          <p className="text-xs text-slate-500">Recently onboarded personnel</p>
        </div>
        <Link
          to="/admin/employees"
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <span>View All</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {recent.map((emp) => (
          <div key={emp._id} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <img
                src={emp.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                alt={emp.name}
                className="h-9 w-9 rounded-xl object-cover border border-slate-100"
              />
              <div>
                <p className="text-xs font-semibold text-slate-800">{emp.name}</p>
                <p className="text-[11px] text-slate-500">{emp.designation}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {emp.department}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEmployees;
