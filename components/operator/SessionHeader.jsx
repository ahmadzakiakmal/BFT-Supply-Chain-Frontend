'use client';

import { Clock, User, Hash } from 'lucide-react';

export default function SessionHeader({ sessionId, operatorId, startTime, status }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Active Session
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Hash className="w-4 h-4" />
              <span className="font-mono">{sessionId || 'Not started'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{operatorId || 'N/A'}</span>
            </div>
            {startTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{new Date(startTime).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status || 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
}