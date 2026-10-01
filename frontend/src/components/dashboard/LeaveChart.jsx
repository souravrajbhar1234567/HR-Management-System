import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { month: 'May', requests: 4 },
  { month: 'Jun', requests: 7 },
  { month: 'Jul', requests: 12 },
  { month: 'Aug', requests: 9 },
  { month: 'Sep', requests: 11 },
  { month: 'Oct', requests: 5 },
];

const LeaveChart = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-800">Monthly Leave Request Trends</h4>
        <p className="text-xs text-slate-500">Total leave applications over the last 6 months</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leaveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area type="monotone" dataKey="requests" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#leaveGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeaveChart;
