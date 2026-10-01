import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeeService';
import { getAttendanceLogs, clockIn, clockOut } from '../services/attendanceService';
import { getLeaves, applyLeave, updateLeaveStatus } from '../services/leaveService';
import toast from 'react-hot-toast';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAll = async () => {
    try {
      setLoading(true);
      const [empData, attData, leaveData] = await Promise.all([
        getEmployees(),
        getAttendanceLogs(),
        getLeaves(),
      ]);
      setEmployees(empData);
      setAttendance(attData);
      setLeaves(leaveData);
    } catch (err) {
      console.error('Error loading employee context:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleAddEmployee = async (data) => {
    const created = await createEmployee(data);
    setEmployees((prev) => [created, ...prev]);
    toast.success(`Employee ${created.name} added successfully!`);
    return created;
  };

  const handleUpdateEmployee = async (id, data) => {
    const updated = await updateEmployee(id, data);
    setEmployees((prev) => prev.map((e) => (e._id === id || e.employeeId === id ? updated : e)));
    toast.success('Employee updated successfully!');
    return updated;
  };

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e._id !== id && e.employeeId !== id));
    toast.success('Employee record deleted.');
  };

  const handleClockIn = async (user) => {
    const entry = await clockIn(user);
    setAttendance((prev) => [entry, ...prev.filter((p) => p._id !== entry._id)]);
    toast.success(`Clocked in at ${entry.checkIn}`);
    return entry;
  };

  const handleClockOut = async (user) => {
    const entry = await clockOut(user);
    if (entry) {
      setAttendance((prev) => prev.map((p) => (p._id === entry._id ? entry : p)));
      toast.success(`Clocked out at ${entry.checkOut}`);
    }
    return entry;
  };

  const handleApplyLeave = async (leaveData, user) => {
    const newLeave = await applyLeave(leaveData, user);
    setLeaves((prev) => [newLeave, ...prev]);
    toast.success('Leave application submitted for approval!');
    return newLeave;
  };

  const handleUpdateLeaveStatus = async (id, status) => {
    const updated = await updateLeaveStatus(id, status);
    if (updated) {
      setLeaves((prev) => prev.map((l) => (l._id === id ? updated : l)));
      toast.success(`Leave request ${status.toLowerCase()}!`);
    }
    return updated;
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        attendance,
        leaves,
        loading,
        refreshAll,
        addEmployee: handleAddEmployee,
        updateEmployee: handleUpdateEmployee,
        deleteEmployee: handleDeleteEmployee,
        clockIn: handleClockIn,
        clockOut: handleClockOut,
        applyLeave: handleApplyLeave,
        updateLeaveStatus: handleUpdateLeaveStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
