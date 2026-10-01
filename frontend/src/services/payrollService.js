import api from './api';

const DEFAULT_PAYROLL = [
  {
    _id: 'pay-1',
    employeeId: 'EMP-1001',
    employeeName: 'Sarah Connor',
    department: 'Engineering',
    month: 'September 2026',
    salary: 7800,
    bonus: 500,
    deductions: 950,
    netPay: 7350,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
  {
    _id: 'pay-2',
    employeeId: 'EMP-1002',
    employeeName: 'Michael Chen',
    department: 'Engineering',
    month: 'September 2026',
    salary: 8500,
    bonus: 800,
    deductions: 1050,
    netPay: 8250,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
  {
    _id: 'pay-3',
    employeeId: 'EMP-1003',
    employeeName: 'Emily Watson',
    department: 'Design & UI/UX',
    month: 'September 2026',
    salary: 7200,
    bonus: 0,
    deductions: 880,
    netPay: 6320,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
  {
    _id: 'pay-4',
    employeeId: 'EMP-1004',
    employeeName: 'James Rodriguez',
    department: 'Human Resources',
    month: 'September 2026',
    salary: 5800,
    bonus: 200,
    deductions: 710,
    netPay: 5290,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
  {
    _id: 'pay-5',
    employeeId: 'EMP-1005',
    employeeName: 'Aisha Patel',
    department: 'Finance & Accounts',
    month: 'September 2026',
    salary: 6400,
    bonus: 400,
    deductions: 780,
    netPay: 6020,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
  {
    _id: 'pay-6',
    employeeId: 'EMP-1006',
    employeeName: 'David Kim',
    department: 'Marketing',
    month: 'September 2026',
    salary: 6900,
    bonus: 300,
    deductions: 840,
    netPay: 6360,
    paymentDate: '2026-09-30',
    status: 'Paid',
  },
];

export const getPayrollRecords = async () => {
  try {
    const res = await api.get('/payroll');
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return DEFAULT_PAYROLL;
};

export const getEmployeePayslips = async (employeeId) => {
  const records = await getPayrollRecords();
  if (!employeeId) return records;
  return records.filter((r) => r.employeeId === employeeId);
};
