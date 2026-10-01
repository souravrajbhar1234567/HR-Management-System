import api from './api';

const DEFAULT_EMPLOYEES = [
  {
    _id: 'emp-001',
    name: 'Sarah Connor',
    email: 'sarah.connor@peoplehub.com',
    employeeId: 'EMP-1001',
    department: 'Engineering',
    designation: 'Senior Frontend Engineer',
    role: 'employee',
    phone: '+1 (555) 234-5678',
    salary: 7800,
    isActive: true,
    status: 'Active',
    joinDate: '2023-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    location: 'San Francisco, CA',
  },
  {
    _id: 'emp-002',
    name: 'Michael Chen',
    email: 'michael.chen@peoplehub.com',
    employeeId: 'EMP-1002',
    department: 'Engineering',
    designation: 'DevOps Lead',
    role: 'employee',
    phone: '+1 (555) 345-6789',
    salary: 8500,
    isActive: true,
    status: 'Active',
    joinDate: '2022-09-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    location: 'Austin, TX',
  },
  {
    _id: 'emp-003',
    name: 'Emily Watson',
    email: 'emily.watson@peoplehub.com',
    employeeId: 'EMP-1003',
    department: 'Design & UI/UX',
    designation: 'Lead Product Designer',
    role: 'employee',
    phone: '+1 (555) 456-7890',
    salary: 7200,
    isActive: true,
    status: 'On Leave',
    joinDate: '2023-01-10',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    location: 'New York, NY',
  },
  {
    _id: 'emp-004',
    name: 'James Rodriguez',
    email: 'james.rodriguez@peoplehub.com',
    employeeId: 'EMP-1004',
    department: 'Human Resources',
    designation: 'HR Specialist',
    role: 'employee',
    phone: '+1 (555) 567-8901',
    salary: 5800,
    isActive: true,
    status: 'Active',
    joinDate: '2023-06-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    location: 'Chicago, IL',
  },
  {
    _id: 'emp-005',
    name: 'Aisha Patel',
    email: 'aisha.patel@peoplehub.com',
    employeeId: 'EMP-1005',
    department: 'Finance & Accounts',
    designation: 'Financial Analyst',
    role: 'employee',
    phone: '+1 (555) 678-9012',
    salary: 6400,
    isActive: true,
    status: 'Active',
    joinDate: '2023-11-05',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    location: 'Seattle, WA',
  },
  {
    _id: 'emp-006',
    name: 'David Kim',
    email: 'david.kim@peoplehub.com',
    employeeId: 'EMP-1006',
    department: 'Marketing',
    designation: 'Growth Marketing Manager',
    role: 'employee',
    phone: '+1 (555) 789-0123',
    salary: 6900,
    isActive: true,
    status: 'Active',
    joinDate: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    location: 'Remote',
  },
];

const getStoredEmployees = () => {
  const stored = localStorage.getItem('peoplehub_employees');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_EMPLOYEES;
    }
  }
  localStorage.setItem('peoplehub_employees', JSON.stringify(DEFAULT_EMPLOYEES));
  return DEFAULT_EMPLOYEES;
};

const saveStoredEmployees = (employees) => {
  localStorage.setItem('peoplehub_employees', JSON.stringify(employees));
};

export const getEmployees = async () => {
  try {
    const res = await api.get('/employees');
    if (res.data?.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return getStoredEmployees();
  } catch {
    return getStoredEmployees();
  }
};

export const getEmployeeById = async (id) => {
  try {
    const res = await api.get(`/employees/${id}`);
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  const all = getStoredEmployees();
  return all.find((e) => e._id === id || e.employeeId === id) || null;
};

export const createEmployee = async (employeeData) => {
  try {
    const res = await api.post('/employees', employeeData);
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  const all = getStoredEmployees();
  const newEmp = {
    ...employeeData,
    _id: `emp-${Date.now()}`,
    employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
    status: employeeData.status || 'Active',
    isActive: true,
    joinDate: new Date().toISOString().split('T')[0],
  };
  const updated = [newEmp, ...all];
  saveStoredEmployees(updated);
  return newEmp;
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const res = await api.put(`/employees/${id}`, employeeData);
    if (res.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  const all = getStoredEmployees();
  const index = all.findIndex((e) => e._id === id || e.employeeId === id);
  if (index !== -1) {
    all[index] = { ...all[index], ...employeeData };
    saveStoredEmployees(all);
    return all[index];
  }
  return null;
};

export const deleteEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`);
  } catch {
    // fallback
  }
  const all = getStoredEmployees();
  const updated = all.filter((e) => e._id !== id && e.employeeId !== id);
  saveStoredEmployees(updated);
  return true;
};
