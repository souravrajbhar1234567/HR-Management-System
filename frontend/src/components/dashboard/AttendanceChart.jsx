import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { day: 'Mon', present: 32, late: 2, absent: 2 },
  { day: 'Tue', present: 34, late: 1, absent: 1 },
  { day: 'Wed', present: 33, late: 2, absent: 1 },
  { day: 'Thu', present: 35, late: 0, absent: 1 },
  { day: 'Fri', present: 31, late: 3, absent: 2 },
];

const AttendanceChart = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Weekly Attendance Overview</h4>
          <p className="text-xs text-slate-500">Employee presence trends across the current week</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            <span>Present</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Late</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span>Absent</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="present" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
