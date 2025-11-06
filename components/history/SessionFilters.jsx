'use client';

import { Search, Filter, X } from 'lucide-react';

export default function SessionFilters({ filters, onFilterChange, onClear }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.search || filters.shard || filters.status || filters.committed !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Session ID, Operator..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Shard Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shard
          </label>
          <select
            value={filters.shard}
            onChange={(e) => handleChange('shard', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Shards</option>
            <option value="shard-a">Shard A</option>
            <option value="shard-b">Shard B</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="committed">Committed</option>
          </select>
        </div>

        {/* Committed Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blockchain Status
          </label>
          <select
            value={filters.committed}
            onChange={(e) => handleChange('committed', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="committed">Committed</option>
            <option value="pending">Not Committed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
