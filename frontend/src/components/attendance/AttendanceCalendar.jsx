import React from 'react';

const AttendanceCalendar = ({ logs = [] }) => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getStatusForDay = (day) => {
    const dayStr = `2026-10-${String(day).padStart(2, '0')}`;
    const found = logs.find((l) => l.date === dayStr);
    if (found) return found.status;
    if (day % 7 === 0 || day % 7 === 6) return 'Weekend';
    if (day > 1) return 'Upcoming';
    return 'Present';
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Monthly Attendance Calendar</h4>
          <p className="text-xs text-slate-500">October 2026</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Present
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Late
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-slate-300" /> Weekend
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="font-bold text-slate-400 py-1 text-[11px]">
            {d}
          </div>
        ))}

        {daysInMonth.map((day) => {
          const status = getStatusForDay(day);
          const isWeekend = status === 'Weekend';
          const isPresent = status === 'Present';
          const isLate = status === 'Late';

          return (
            <div
              key={day}
              className={`flex flex-col items-center justify-center rounded-xl p-2.5 transition border ${
                isWeekend
                  ? 'bg-slate-50 border-slate-100 text-slate-400'
                  : isPresent
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800 font-semibold'
                  : isLate
                  ? 'bg-amber-50 border-amber-200 text-amber-800 font-semibold'
                  : 'bg-white border-slate-100 text-slate-600'
              }`}
            >
              <span className="text-xs">{day}</span>
              <span className="text-[9px] mt-0.5 opacity-80 uppercase tracking-tighter">
                {isWeekend ? 'OFF' : status === 'Upcoming' ? '—' : status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
