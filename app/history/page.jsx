'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { l1Client } from '@/lib/api-client';
import SessionFilters from '@/components/history/SessionFilters';
import SessionTable from '@/components/history/SessionTable';

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const [allSessions, setAllSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  
  const [filters, setFilters] = useState({
    search: '',
    shard: '',
    status: '',
    committed: 'all',
  });

  // Fetch all sessions
  const fetchSessions = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    setError(null);

    try {
      // Fetch shards first
      const shardsPayload = await l1Client.getShards();
      const shards = shardsPayload.shards;

      // Fetch sessions from all shards
      const allSessionsData = [];
      for (const shard of shards) {
        try {
          const sessions = await l1Client.getSessionsByShard(shard.ShardID);
          // Add shard ID to each session
          sessions.forEach(s => {
            s.ShardID = shard.ShardID;
            s.data = JSON.parse(s.SessionData);
          });
          allSessionsData.push(...sessions);
        } catch (err) {
          console.error(`Failed to fetch sessions for ${shard.ShardID}:`, err);
        }
      }

      // Sort by created_at desc
      allSessionsData.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
      
      setAllSessions(allSessionsData);
      setFilteredSessions(allSessionsData);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch session history. Make sure L1 service is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Apply filters whenever filters or sessions change
  useEffect(() => {
    let filtered = [...allSessions];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.Transaction?.SessionID || s.SessionID)?.toLowerCase().includes(searchLower) ||
          s.OperatorID?.toLowerCase().includes(searchLower)
      );
    }

    // Shard filter
    if (filters.shard) {
      filtered = filtered.filter((s) => s.ShardID === filters.shard);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((s) => s.Status === filters.status);
    }

    // Committed filter
    if (filters.committed !== 'all') {
      if (filters.committed === 'committed') {
        filtered = filtered.filter((s) => s.Status === 'committed');
      } else {
        filtered = filtered.filter((s) => s.Status !== 'committed');
      }
    }

    setFilteredSessions(filtered);
  }, [filters, allSessions]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      shard: '',
      status: '',
      committed: 'all',
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredSessions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sessions-export-${new Date().toISOString()}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading session history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Session History
          </h1>
          <p className="text-gray-600">
            View and search all committed sessions • {filteredSessions.length} of {allSessions.length} sessions
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            disabled={filteredSessions.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => fetchSessions(true)}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <SessionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {/* Session Table */}
      <SessionTable sessions={filteredSessions} />
    </div>
  );
}