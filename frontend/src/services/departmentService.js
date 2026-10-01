import api from './api';

const DEFAULT_DEPARTMENTS = [
  {
    id: 'dept-1',
    name: 'Engineering',
    head: 'Michael Chen',
    employeeCount: 14,
    budget: '$180,000 / mo',
    icon: 'Code2',
    description: 'Core product engineering, architecture, infrastructure and DevOps.',
  },
  {
    id: 'dept-2',
    name: 'Human Resources',
    head: 'James Rodriguez',
    employeeCount: 5,
    budget: '$45,000 / mo',
    icon: 'Users',
    description: 'Talent acquisition, employee welfare, compliance, and culture.',
  },
  {
    id: 'dept-3',
    name: 'Design & UI/UX',
    head: 'Emily Watson',
    employeeCount: 6,
    budget: '$55,000 / mo',
    icon: 'Palette',
    description: 'Product UX research, design systems, visual assets, and prototypes.',
  },
  {
    id: 'dept-4',
    name: 'Finance & Accounts',
    head: 'Aisha Patel',
    employeeCount: 4,
    budget: '$40,000 / mo',
    icon: 'Coins',
    description: 'Payroll disbursement, financial auditing, reporting and tax.',
  },
  {
    id: 'dept-5',
    name: 'Marketing & Growth',
    head: 'David Kim',
    employeeCount: 7,
    budget: '$70,000 / mo',
    icon: 'Megaphone',
    description: 'Inbound campaigns, brand reach, social media, and developer relations.',
  },
];

export const getDepartments = async () => {
  try {
    const res = await api.get('/departments');
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return DEFAULT_DEPARTMENTS;
};
