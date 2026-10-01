import React from 'react';
import { CheckCircle2, Clock, UserPlus, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'leave',
    icon: CheckCircle2,
    color: 'text-emerald-500 bg-emerald-50',
    title: 'Emily Watson leave approved',
    subtitle: 'Annual Leave (5 days)',
    time: '25m ago',
  },
  {
    id: 2,
    type: 'hire',
    icon: UserPlus,
    color: 'text-indigo-500 bg-indigo-50',
    title: 'New employee onboarded',
    subtitle: 'David Kim joined Marketing as Manager',
    time: '2h ago',
  },
  {
    id: 3,
    type: 'payroll',
    icon: FileText,
    color: 'text-sky-500 bg-sky-50',
    title: 'September Payroll finalized',
    subtitle: '36 payslips issued successfully',
    time: 'Yesterday',
  },
  {
    id: 4,
    type: 'attendance',
    icon: Clock,
    color: 'text-amber-500 bg-amber-50',
    title: 'Daily Attendance logged',
    subtitle: '94.5% check-in rate recorded',
    time: 'Yesterday',
  },
];

const RecentActivities = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-slate-800">Recent HR Activities</h4>
        <span className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer">
          Live stream
        </span>
      </div>

      <div className="space-y-3.5">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-semibold text-slate-800">{item.title}</p>
                <p className="truncate text-[11px] text-slate-500">{item.subtitle}</p>
              </div>
              <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
