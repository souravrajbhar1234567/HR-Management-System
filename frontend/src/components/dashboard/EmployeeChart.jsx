import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Engineering', value: 14, color: '#4f46e5' },
  { name: 'Marketing', value: 7, color: '#06b6d4' },
  { name: 'Design', value: 6, color: '#ec4899' },
  { name: 'HR', value: 5, color: '#10b981' },
  { name: 'Finance', value: 4, color: '#f59e0b' },
];

const EmployeeChart = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-800">Department Distribution</h4>
        <p className="text-xs text-slate-500">Workforce breakdown by team</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="h-52 w-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-1 flex-col gap-2 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-slate-700">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.value} emps</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeChart;
