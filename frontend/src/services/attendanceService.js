import api from './api';

const DEFAULT_ATTENDANCE = [
  {
    _id: 'att-1',
    employeeId: 'EMP-1001',
    employeeName: 'Sarah Connor',
    date: '2026-10-01',
    checkIn: '09:02 AM',
    checkOut: '05:30 PM',
    status: 'Present',
    workHours: '8h 28m',
  },
  {
    _id: 'att-2',
    employeeId: 'EMP-1002',
    employeeName: 'Michael Chen',
    date: '2026-10-01',
    checkIn: '08:55 AM',
    checkOut: '05:05 PM',
    status: 'Present',
    workHours: '8h 10m',
  },
  {
    _id: 'att-3',
    employeeId: 'EMP-1003',
    employeeName: 'Emily Watson',
    date: '2026-10-01',
    checkIn: null,
    checkOut: null,
    status: 'On Leave',
    workHours: '0h',
  },
  {
    _id: 'att-4',
    employeeId: 'EMP-1004',
    employeeName: 'James Rodriguez',
    date: '2026-10-01',
    checkIn: '09:45 AM',
    checkOut: '06:00 PM',
    status: 'Late',
    workHours: '8h 15m',
  },
  {
    _id: 'att-5',
    employeeId: 'EMP-1005',
    employeeName: 'Aisha Patel',
    date: '2026-10-01',
    checkIn: '09:00 AM',
    checkOut: '05:15 PM',
    status: 'Present',
    workHours: '8h 15m',
  },
  {
    _id: 'att-6',
    employeeId: 'EMP-1006',
    employeeName: 'David Kim',
    date: '2026-10-01',
    checkIn: '09:12 AM',
    checkOut: null,
    status: 'Present',
    workHours: 'Active',
  },
];

const getStoredAttendance = () => {
  const stored = localStorage.getItem('peoplehub_attendance');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_ATTENDANCE;
    }
  }
  localStorage.setItem('peoplehub_attendance', JSON.stringify(DEFAULT_ATTENDANCE));
  return DEFAULT_ATTENDANCE;
};

const saveStoredAttendance = (data) => {
  localStorage.setItem('peoplehub_attendance', JSON.stringify(data));
};

export const getAttendanceLogs = async () => {
  try {
    const res = await api.get('/attendance');
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return getStoredAttendance();
};

export const clockIn = async (employee) => {
  const logs = getStoredAttendance();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const existing = logs.find((l) => (l.employeeId === employee?.employeeId || l.employeeEmail === employee?.email) && l.date === today);
  if (existing) {
    return existing;
  }

  const newLog = {
    _id: `att-${Date.now()}`,
    employeeId: employee?.employeeId || 'EMP-ME',
    employeeName: employee?.name || 'Employee',
    employeeEmail: employee?.email,
    date: today,
    checkIn: now,
    checkOut: null,
    status: 'Present',
    workHours: 'In Progress',
  };

  const updated = [newLog, ...logs];
  saveStoredAttendance(updated);
  return newLog;
};

export const clockOut = async (employee) => {
  const logs = getStoredAttendance();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const index = logs.findIndex((l) => (l.employeeId === employee?.employeeId || l.employeeEmail === employee?.email) && l.date === today);
  if (index !== -1) {
    logs[index].checkOut = now;
    logs[index].workHours = '8h 00m';
    saveStoredAttendance(logs);
    return logs[index];
  }
  return null;
};
