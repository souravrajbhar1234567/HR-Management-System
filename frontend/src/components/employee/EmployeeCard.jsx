import React from 'react';
import { Mail, Phone, MapPin, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const EmployeeCard = ({ employee, onEdit, onDelete, onView }) => {
  return (
    <div className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <img
              src={employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120'}
              alt={employee.name}
              className="h-14 w-14 rounded-2xl object-cover border-2 border-white shadow-xs"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                employee.status === 'Active'
                  ? 'bg-emerald-500'
                  : employee.status === 'On Leave'
                  ? 'bg-amber-500'
                  : 'bg-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-1">
            <span
              className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                employee.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700'
                  : employee.status === 'On Leave'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {employee.status || 'Active'}
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="mt-4">
          <h4 className="text-sm font-bold text-slate-900 leading-tight">{employee.name}</h4>
          <p className="text-xs font-medium text-indigo-600 mt-0.5">{employee.designation}</p>
          <p className="text-[11px] text-slate-500">{employee.department} • {employee.employeeId}</p>
        </div>

        {/* Contact info */}
        <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{employee.email}</span>
          </div>
          {employee.phone && (
            <div className="flex items-center gap-2 truncate">
              <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{employee.phone}</span>
            </div>
          )}
          {employee.location && (
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{employee.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs font-bold text-slate-800">
          {formatCurrency(employee.salary || 6500)} <span className="text-[10px] font-normal text-slate-500">/ mo</span>
        </span>
        <div className="flex items-center gap-1">
          {onView && (
            <button
              onClick={() => onView(employee)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="View Profile"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(employee)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition"
              title="Edit Employee"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(employee._id)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
              title="Delete Employee"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
