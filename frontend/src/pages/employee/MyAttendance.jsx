import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import AttendanceStatus from '../../components/attendance/AttendanceStatus';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';

const MyAttendance = () => {
  const { user } = useAuth();
  const { attendance } = useEmployee();

  // Filter attendance for current employee
  const myLogs = attendance.filter(
    (a) => a.employeeId === user?.employeeId || a.employeeEmail === user?.email || a.employeeId === 'EMP-1001'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Attendance & Work Hours</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Punch in/out for your shift, track punctuality, and view monthly attendance logs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AttendanceStatus />
        </div>
        <div className="lg:col-span-2">
          <AttendanceCalendar logs={myLogs} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800">My Shift History</h3>
        <AttendanceTable logs={myLogs} showEmployeeName={false} />
      </div>
    </div>
  );
};

export default MyAttendance;
