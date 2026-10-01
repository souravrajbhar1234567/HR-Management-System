export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(String(phone).replace(/[\s-]/g, ''));
};

export const validateRequired = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  return true;
};
