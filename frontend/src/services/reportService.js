export const getHRMetrics = () => {
  return {
    totalEmployees: 36,
    activeEmployees: 34,
    onLeaveToday: 2,
    attendanceRate: '94.5%',
    avgTenure: '2.4 years',
    monthlyPayrollCost: '$245,600',
    turnoverRate: '3.2%',
    openPositions: 4,
  };
};

export const exportReportToCSV = (filename, data) => {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((item) =>
    Object.values(item)
      .map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
