import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import EmployeeTable from '../../components/employee/EmployeeTable';
import EmployeeCard from '../../components/employee/EmployeeCard';
import EmployeeForm from '../../components/employee/EmployeeForm';
import EmployeeProfile from '../../components/employee/EmployeeProfile';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import { DEPARTMENTS } from '../../utils/constants';
import { Plus, LayoutGrid, List, Filter } from 'lucide-react';

const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [viewingEmp, setViewingEmp] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleOpenAdd = () => {
    setEditingEmp(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingEmp(emp);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingEmp) {
      await updateEmployee(editingEmp._id, formData);
    } else {
      await addEmployee(formData);
    }
    setIsFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await deleteEmployee(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Employee Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company personnel, departmental assignments, and compensations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email, or employee ID..."
            className="sm:w-80"
          />

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center self-end sm:self-center rounded-xl border border-slate-200 p-1 bg-slate-50">
          <button
            onClick={() => setViewMode('table')}
            className={`rounded-lg p-1.5 text-xs transition ${
              viewMode === 'table' ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Table View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-1.5 text-xs transition ${
              viewMode === 'grid' ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Directory Content */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          title="No employees found"
          description="Try adjusting your search criteria or add a new team member."
          action={
            <button
              onClick={handleOpenAdd}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
            >
              Add New Employee
            </button>
          }
        />
      ) : viewMode === 'table' ? (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleOpenEdit}
          onDelete={setDeletingId}
          onView={setViewingEmp}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((emp) => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              onEdit={handleOpenEdit}
              onDelete={setDeletingId}
              onView={setViewingEmp}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingEmp ? 'Edit Employee Details' : 'Add New Employee'}
        subtitle="Ensure all details correspond with the employee's official records."
      >
        <EmployeeForm
          employee={editingEmp}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      {/* View Profile Modal */}
      <Modal
        isOpen={Boolean(viewingEmp)}
        onClose={() => setViewingEmp(null)}
        title="Employee Profile Overview"
        maxWidth="max-w-2xl"
      >
        <EmployeeProfile
          employee={viewingEmp}
          onEdit={(emp) => {
            setViewingEmp(null);
            handleOpenEdit(emp);
          }}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee Record"
        message="Are you sure you want to delete this employee? This will remove them from the workforce directory."
        confirmText="Delete Record"
        danger={true}
      />
    </div>
  );
};

export default Employees;
