import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import EmployeeProfile from '../../components/employee/EmployeeProfile';
import EmployeeForm from '../../components/employee/EmployeeForm';
import Modal from '../../components/common/Modal';
import { ArrowLeft, User } from 'lucide-react';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useEmployee();
  const [employee, setEmployee] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const found = employees.find((e) => e._id === id || e.employeeId === id) || employees[0];
    setEmployee(found);
  }, [id, employees]);

  if (!employee) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Employee record not found.</p>
        <button
          onClick={() => navigate('/admin/employees')}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const handleUpdate = async (formData) => {
    await updateEmployee(employee._id, formData);
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/employees')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{employee.name}</h1>
          <p className="text-xs text-slate-500">Employee Profile & Records</p>
        </div>
      </div>

      <EmployeeProfile employee={employee} onEdit={() => setIsEditOpen(true)} />

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Employee Information"
      >
        <EmployeeForm
          employee={employee}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
