import React from 'react';
import { Calendar, Umbrella, HeartPulse, Clock } from 'lucide-react';

const LeaveStatus = ({ balances }) => {
  const defaultBalances = balances || {
    casual: { total: 12, used: 2 },
    sick: { total: 10, used: 1 },
    annual: { total: 18, used: 4 },
  };

  const cards = [
    {
      title: 'Casual Leave',
      icon: Umbrella,
      total: defaultBalances.casual.total,
      used: defaultBalances.casual.used,
      color: 'indigo',
    },
    {
      title: 'Sick Leave',
      icon: HeartPulse,
      total: defaultBalances.sick.total,
      used: defaultBalances.sick.used,
      color: 'rose',
    },
    {
      title: 'Annual Leave',
      icon: Calendar,
      total: defaultBalances.annual.total,
      used: defaultBalances.annual.used,
      color: 'emerald',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const remaining = card.total - card.used;
        const percent = Math.round((remaining / card.total) * 100);

        return (
          <div key={card.title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{remaining}</span>
              <span className="text-xs font-medium text-slate-400">of {card.total} days left</span>
            </div>

            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveStatus;
