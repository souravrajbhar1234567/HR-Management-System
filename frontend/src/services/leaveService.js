import api from './api';

const DEFAULT_LEAVES = [
  {
    _id: 'leave-1',
    employeeId: 'EMP-1003',
    employeeName: 'Emily Watson',
    department: 'Design & UI/UX',
    leaveType: 'Annual Leave',
    startDate: '2026-09-28',
    endDate: '2026-10-02',
    days: 5,
    reason: 'Family vacation and personal downtime',
    status: 'Approved',
    appliedOn: '2026-09-20',
  },
  {
    _id: 'leave-2',
    employeeId: 'EMP-1004',
    employeeName: 'James Rodriguez',
    department: 'Human Resources',
    leaveType: 'Sick Leave',
    startDate: '2026-10-03',
    endDate: '2026-10-04',
    days: 2,
    reason: 'Dental surgery and recovery',
    status: 'Pending',
    appliedOn: '2026-09-30',
  },
  {
    _id: 'leave-3',
    employeeId: 'EMP-1001',
    employeeName: 'Sarah Connor',
    department: 'Engineering',
    leaveType: 'Casual Leave',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    days: 1,
    reason: 'Home renovation work inspection',
    status: 'Pending',
    appliedOn: '2026-10-01',
  },
  {
    _id: 'leave-4',
    employeeId: 'EMP-1006',
    employeeName: 'David Kim',
    department: 'Marketing',
    leaveType: 'Casual Leave',
    startDate: '2026-09-15',
    endDate: '2026-09-16',
    days: 2,
    reason: 'Attending friend wedding',
    status: 'Approved',
    appliedOn: '2026-09-10',
  },
];

const getStoredLeaves = () => {
  const stored = localStorage.getItem('peoplehub_leaves');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_LEAVES;
    }
  }
  localStorage.setItem('peoplehub_leaves', JSON.stringify(DEFAULT_LEAVES));
  return DEFAULT_LEAVES;
};

const saveStoredLeaves = (leaves) => {
  localStorage.setItem('peoplehub_leaves', JSON.stringify(leaves));
};

export const getLeaves = async () => {
  try {
    const res = await api.get('/leaves');
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return getStoredLeaves();
};

export const applyLeave = async (leaveData, user) => {
  const leaves = getStoredLeaves();
  const start = new Date(leaveData.startDate);
  const end = new Date(leaveData.endDate);
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const newLeave = {
    _id: `leave-${Date.now()}`,
    employeeId: user?.employeeId || 'EMP-1001',
    employeeName: user?.name || 'Employee',
    department: user?.department || 'Engineering',
    leaveType: leaveData.leaveType,
    startDate: leaveData.startDate,
    endDate: leaveData.endDate,
    days: diffDays,
    reason: leaveData.reason,
    status: 'Pending',
    appliedOn: new Date().toISOString().split('T')[0],
  };

  const updated = [newLeave, ...leaves];
  saveStoredLeaves(updated);
  return newLeave;
};

export const updateLeaveStatus = async (id, status) => {
  const leaves = getStoredLeaves();
  const index = leaves.findIndex((l) => l._id === id);
  if (index !== -1) {
    leaves[index].status = status;
    saveStoredLeaves(leaves);
    return leaves[index];
  }
  return null;
};
