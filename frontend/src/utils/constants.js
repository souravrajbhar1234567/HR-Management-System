export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
};

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Design & UI/UX',
  'Marketing',
  'Finance & Accounts',
  'Product Management',
  'Sales',
  'Customer Support',
];

export const DESIGNATIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'HR Specialist',
  'HR Manager',
  'Financial Analyst',
  'Marketing Lead',
  'Product Manager',
  'DevOps Engineer',
  'QA Specialist',
];

export const EMPLOYEE_STATUS = {
  ACTIVE: 'Active',
  ON_LEAVE: 'On Leave',
  INACTIVE: 'Inactive',
  PROBATION: 'Probation',
};

export const LEAVE_TYPES = [
  'Casual Leave',
  'Sick Leave',
  'Annual Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Unpaid Leave',
];

export const LEAVE_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  HALF_DAY: 'Half Day',
  ON_LEAVE: 'On Leave',
};

export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const INITIAL_LEAVE_BALANCES = {
  casual: { total: 12, used: 2 },
  sick: { total: 10, used: 1 },
  annual: { total: 18, used: 4 },
  unpaid: { total: 0, used: 0 },
};
