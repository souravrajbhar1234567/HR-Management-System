import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { Clock, Play, Square, CheckCircle, Calendar } from 'lucide-react';
import { getTodayDateString } from '../../utils/formatDate';

const AttendanceStatus = () => {
  const { user } = useAuth();
  const { attendance, clockIn, clockOut } = useEmployee();
  const [time, setTime] = useState(new Date());

  const todayStr = getTodayDateString();
  const todayRecord = attendance.find(
    (a) => (a.employeeId === user?.employeeId || a.employeeEmail === user?.email) && a.date === todayStr
  );

  const isClockedIn = Boolean(todayRecord?.checkIn);
  const isClockedOut = Boolean(todayRecord?.checkOut);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span>{time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isClockedOut
                ? 'bg-slate-100 text-slate-600'
                : isClockedIn
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isClockedOut ? 'bg-slate-400' : isClockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {isClockedOut ? 'Shift Completed' : isClockedIn ? 'Clocked In' : 'Not Clocked In'}
          </span>
        </div>

        {/* Live Clock Display */}
        <div className="mt-5 text-center sm:text-left">
          <div className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <p className="mt-1 text-xs text-slate-500">Work Shift: 09:00 AM – 06:00 PM (Standard 8 Hours)</p>
        </div>

        {/* Punch Details */}
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-xs">
          <div>
            <p className="text-[11px] text-slate-400">Punch In</p>
            <p className="font-semibold text-slate-800">{todayRecord?.checkIn || '--:--'}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Punch Out</p>
            <p className="font-semibold text-slate-800">{todayRecord?.checkOut || '--:--'}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        {!isClockedIn ? (
          <button
            onClick={() => clockIn(user)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Clock In Now</span>
          </button>
        ) : !isClockedOut ? (
          <button
            onClick={() => clockOut(user)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition"
          >
            <Square className="h-4 w-4 fill-white" />
            <span>Clock Out (End Shift)</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-600">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span>Attendance Logged for Today</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceStatus;
