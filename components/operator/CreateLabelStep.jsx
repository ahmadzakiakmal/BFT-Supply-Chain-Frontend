'use client';

import { useState } from 'react';
import { Tag, Loader2 } from 'lucide-react';

const couriers = [
  { id: 'CUR-001', name: 'Express Courier Co.' },
  { id: 'CUR-002', name: 'Global Shipping Inc.' },
  { id: 'CUR-003', name: 'Fast Delivery Services' },
];

export default function CreateLabelStep({ onCreateLabel, loading, sessionData }) {
  const [courierId, setCourierId] = useState('CUR-001');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateLabel(courierId);
  };

  const labelInfo = sessionData?.labelInfo;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Tag className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 5: Create Shipping Label
          </h3>
          <p className="text-gray-600">
            Generate label with tracking number
          </p>
        </div>

        {!labelInfo ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="courier" className="block text-sm font-medium text-gray-700 mb-2">
                Select Courier
              </label>
              <select
                id="courier"
                value={courierId}
                onChange={(e) => setCourierId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                {couriers.map((courier) => (
                  <option key={courier.id} value={courier.id}>
                    {courier.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Label...</span>
                </>
              ) : (
                <>
                  <Tag className="w-5 h-5" />
                  <span>Create Label</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-4">Label Created!</h4>
            <div className="space-y-3 text-sm text-green-800">
              <div>
                <p className="text-gray-600">Label ID</p>
                <p className="font-mono font-semibold text-lg">{labelInfo.label_id}</p>
              </div>
              <div>
                <p className="text-gray-600">Tracking Number</p>
                <p className="font-mono font-semibold text-lg">{labelInfo.tracking_no}</p>
              </div>
              <div>
                <p className="text-gray-600">Courier</p>
                <p className="font-semibold">{labelInfo.courier}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}