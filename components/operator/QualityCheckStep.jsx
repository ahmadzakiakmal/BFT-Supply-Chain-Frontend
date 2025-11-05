'use client';

import { useState } from 'react';
import { ClipboardCheck, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function QualityCheckStep({ onQC, loading }) {
  const [passed, setPassed] = useState(true);
  const [issues, setIssues] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const issueList = issues.trim() ? issues.split('\n').filter(i => i.trim()) : [];
    onQC(passed, issueList);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <ClipboardCheck className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 4: Quality Check
          </h3>
          <p className="text-gray-600">
            Perform physical inspection of the package
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pass/Fail Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quality Check Result
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPassed(true)}
                className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  passed
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setPassed(false)}
                className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  !passed
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Fail</span>
              </button>
            </div>
          </div>

          {/* Issues (optional) */}
          <div>
            <label htmlFor="issues" className="block text-sm font-medium text-gray-700 mb-2">
              Issues Found (optional)
            </label>
            <textarea
              id="issues"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              placeholder="Enter any issues, one per line..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <ClipboardCheck className="w-5 h-5" />
                <span>Submit QC Report</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}