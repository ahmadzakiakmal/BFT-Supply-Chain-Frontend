'use client';

import { useState } from 'react';
import { Scan, Loader2 } from 'lucide-react';

export default function ScanPackageStep({ onScan, loading, sessionData }) {
  const [packageId, setPackageId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (packageId.trim()) {
      onScan(packageId.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Scan className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 2: Scan Package
          </h3>
          <p className="text-gray-600">
            Scan or enter the package barcode
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 mb-2">
              Package ID / Barcode
            </label>
            <input
              id="packageId"
              type="text"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              placeholder="e.g., PKG-001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
              disabled={loading}
              autoFocus
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Try: PKG-001 or PKG-002
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !packageId.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Scan className="w-5 h-5" />
                <span>Scan Package</span>
              </>
            )}
          </button>
        </form>

        {/* Show package info after scan */}
        {sessionData?.packageInfo && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Package Scanned!</h4>
            <div className="text-sm text-green-800 space-y-1">
              <p><strong>Package ID:</strong> {sessionData.packageInfo.package_id}</p>
              <p><strong>Supplier:</strong> {sessionData.packageInfo.supplier}</p>
              <p><strong>Status:</strong> {sessionData.packageInfo.status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}