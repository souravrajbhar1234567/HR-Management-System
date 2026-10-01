export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateSalaryBreakdown = (monthlySalary = 0) => {
  const basic = Math.round(monthlySalary * 0.5);
  const hra = Math.round(monthlySalary * 0.25);
  const specialAllowance = Math.round(monthlySalary * 0.15);
  const gross = basic + hra + specialAllowance;

  // Deductions
  const tax = Math.round(gross * 0.1);
  const providentFund = Math.round(basic * 0.12);
  const insurance = 120;
  const totalDeductions = tax + providentFund + insurance;

  const netSalary = gross - totalDeductions;

  return {
    basic,
    hra,
    specialAllowance,
    gross,
    tax,
    providentFund,
    insurance,
    totalDeductions,
    netSalary,
  };
};
