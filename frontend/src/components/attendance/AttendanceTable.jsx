import React from 'react';
import { formatDate } from '../../utils/formatDate';

const AttendanceTable = ({ logs = [], showEmployeeName = true }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3.5">Date</th>
              {showEmployeeName && <th className="px-6 py-3.5">Employee</th>}
              <th className="px-6 py-3.5">Punch In</th>
              <th className="px-6 py-3.5">Punch Out</th>
              <th className="px-6 py-3.5">Work Hours</th>
              <th className="px-6 py-3.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-slate-50/60 transition">
                <td className="px-6 py-3.5 font-medium text-slate-900">{formatDate(log.date)}</td>
                {showEmployeeName && (
                  <td className="px-6 py-3.5">
                    <span className="font-semibold text-slate-800">{log.employeeName || 'Staff'}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-400">({log.employeeId})</span>
                  </td>
                )}
                <td className="px-6 py-3.5 font-mono text-slate-600">{log.checkIn || '--:--'}</td>
                <td className="px-6 py-3.5 font-mono text-slate-600">{log.checkOut || '--:--'}</td>
                <td className="px-6 py-3.5 font-medium text-slate-700">{log.workHours || 'N/A'}</td>
                <td className="px-6 py-3.5 text-right">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      log.status === 'Present'
                        ? 'bg-emerald-50 text-emerald-700'
                        : log.status === 'Late'
                        ? 'bg-amber-50 text-amber-700'
                        : log.status === 'On Leave'
                        ? 'bg-sky-50 text-sky-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
