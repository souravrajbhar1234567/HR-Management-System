import React, { useState } from 'react';
import { CheckSquare, Plus, Clock, CheckCircle2, Circle } from 'lucide-react';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

const INITIAL_TASKS = [
  { id: 1, title: 'Submit Q4 performance self-review', due: 'Oct 05, 2026', priority: 'High', status: 'To Do' },
  { id: 2, title: 'Review Figma wireframes for onboarding flow', due: 'Oct 07, 2026', priority: 'Medium', status: 'In Progress' },
  { id: 3, title: 'Complete annual cybersecurity awareness training', due: 'Oct 12, 2026', priority: 'Low', status: 'To Do' },
  { id: 4, title: 'Sync with frontend lead regarding Vite v8 upgrades', due: 'Sep 29, 2026', priority: 'High', status: 'Completed' },
];

const MyTasks = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Completed' ? 'To Do' : 'Completed' } : t
      )
    );
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      title: newTaskTitle,
      due: newTaskDue || 'Oct 15, 2026',
      priority: newTaskPriority,
      status: 'To Do',
    };
    setTasks((prev) => [created, ...prev]);
    setIsAddOpen(false);
    setNewTaskTitle('');
    setNewTaskDue('');
    toast.success('Task created successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Tasks & Action Items</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize personal deliverables, department assignments, and deadlines.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
        {tasks.map((task) => {
          const isDone = task.status === 'Completed';

          return (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition cursor-pointer ${
                isDone
                  ? 'border-slate-100 bg-slate-50/50 opacity-60'
                  : 'border-slate-200/80 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300 shrink-0 hover:text-indigo-600" />
                )}
                <div>
                  <p className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Due {task.due}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    task.priority === 'High'
                      ? 'bg-rose-50 text-rose-700'
                      : task.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {task.priority}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    isDone ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Task">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Task Title *</label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Prepare deck for design sprint"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Due Date</label>
              <input
                type="text"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                placeholder="e.g. Oct 18, 2026"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Priority</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyTasks;
