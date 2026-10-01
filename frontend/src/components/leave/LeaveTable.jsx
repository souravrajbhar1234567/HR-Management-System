import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { Check, X } from 'lucide-react';

const LeaveTable = ({
  leaves = [],
  showAdminActions = false,
  onApprove,
  onReject,
  showEmployee = true,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
            <tr>
              {showEmployee && <th className="px-6 py-3.5">Employee</th>}
              <th className="px-6 py-3.5">Leave Type</th>
              <th className="px-6 py-3.5">Duration</th>
              <th className="px-6 py-3.5">Days</th>
              <th className="px-6 py-3.5">Reason</th>
              <th className="px-6 py-3.5">Status</th>
              {showAdminActions && <th className="px-6 py-3.5 text-right">Review</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 whitespace-nowrap">
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-slate-50/60 transition">
                {showEmployee && (
                  <td className="px-6 py-3.5">
                    <p className="font-semibold text-slate-900">{leave.employeeName || 'Staff'}</p>
                    <p className="text-[11px] text-slate-500">{leave.department}</p>
                  </td>
                )}
                <td className="px-6 py-3.5 font-medium">{leave.leaveType}</td>
                <td className="px-6 py-3.5 text-slate-600">
                  {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
                </td>
                <td className="px-6 py-3.5 font-bold text-slate-800">{leave.days}d</td>
                <td className="px-6 py-3.5 max-w-xs truncate text-slate-500">{leave.reason}</td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      leave.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : leave.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                {showAdminActions && (
                  <td className="px-6 py-3.5 text-right">
                    {leave.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onApprove(leave._id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                          title="Approve Leave"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onReject(leave._id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                          title="Reject Leave"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Decided</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
