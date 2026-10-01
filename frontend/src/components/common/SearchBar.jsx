import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
