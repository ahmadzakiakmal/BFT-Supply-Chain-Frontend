'use client';

import { Database, Loader2, CheckCircle } from 'lucide-react';
import { truncateHash } from '@/lib/utils';

export default function CommitSessionStep({ onCommit, loading, sessionData }) {
  const commitResult = sessionData?.commitResult;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 6: Commit to Blockchain
          </h3>
          <p className="text-gray-600">
            Finalize session and store on Layer 1
          </p>
        </div>

        {!commitResult ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Ready to Commit</h4>
              <p className="text-sm text-blue-800">
                All steps completed! Click below to commit this session to the Layer 1 blockchain for permanent, tamper-proof storage.
              </p>
            </div>

            <button
              onClick={onCommit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Committing to L1...</span>
                </>
              ) : (
                <>
                  <Database className="w-6 h-6" />
                  <span>Commit to Layer 1</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h4 className="font-bold text-green-900 text-lg">Session Committed!</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Transaction Hash</p>
                  <p className="font-mono font-semibold text-green-900 break-all">
                    {commitResult.tx_hash}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Block Height</p>
                  <p className="font-semibold text-green-900">{commitResult.block_height}</p>
                </div>
                <div>
                  <p className="text-gray-600">Shard ID</p>
                  <p className="font-semibold text-green-900">{commitResult.shard_id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                    {commitResult.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}