'use client';

import { useState } from 'react';
import { PlayCircle, Loader2 } from 'lucide-react';

export default function StartSessionStep({ onStart, loading }) {
  const [operatorId, setOperatorId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (operatorId.trim()) {
      onStart(operatorId.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <PlayCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 1: Start Session
          </h3>
          <p className="text-gray-600">
            Enter your operator ID to begin processing packages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="operatorId" className="block text-sm font-medium text-gray-700 mb-2">
              Operator ID
            </label>
            <input
              id="operatorId"
              type="text"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              placeholder="e.g., OPR-001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !operatorId.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Session...</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                <span>Start Session</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}