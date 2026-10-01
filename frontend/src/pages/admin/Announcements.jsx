import React, { useState } from 'react';
import { Megaphone, Plus, Calendar, Pin, Trash2 } from 'lucide-react';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Company Annual Townhall & Roadmap Presentation',
    content:
      'Join us this Friday at 3:00 PM PST in the main virtual stage for our Q4 Townhall. The leadership team will present 2027 strategic initiatives and open the floor for live Q&A.',
    date: '2026-10-01',
    author: 'Human Resources',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Open Enrollment for Health & Dental Benefits',
    content:
      'The open enrollment window for 2027 healthcare benefits is now active. Please review your elected coverage and submit selections by October 25th.',
    date: '2026-09-25',
    author: 'Benefits Committee',
    isPinned: false,
  },
  {
    id: 3,
    title: 'New Hybrid Work Policy Updates',
    content:
      'We have updated our remote working stipend guidelines. Eligible employees can claim up to $500 annually for home workstation ergonomics.',
    date: '2026-09-18',
    author: 'Operations Team',
    isPinned: false,
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', author: 'Administration' });

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      author: form.author || 'Administration',
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
    };
    setAnnouncements((prev) => [created, ...prev]);
    setIsCreateOpen(false);
    setForm({ title: '', content: '', author: 'Administration' });
    toast.success('Announcement broadcasted to workforce!');
  };

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    toast.success('Announcement removed.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Company Announcements</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast updates, policy revisions, and news across all departments.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Notice</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-5 shadow-xs transition bg-white ${
              item.isPinned ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    item.isPinned ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    {item.isPinned && (
                      <span className="flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                        <Pin className="h-3 w-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>By {item.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                title="Delete Announcement"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Publish Announcement">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Notice Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Q4 Townhall Schedule"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Publishing Entity</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              placeholder="e.g. People Operations"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Content / Message *</label>
            <textarea
              required
              rows={4}
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write the full announcement text..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              Publish Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Announcements;
