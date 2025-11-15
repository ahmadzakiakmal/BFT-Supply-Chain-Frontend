'use client';

import { useState } from 'react';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ValidatePackageStep({ onValidate, loading, sessionData }) {
  const [signature, setSignature] = useState(sessionData.signature || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signature.trim()) {
      onValidate(signature.trim());
    }
  };

  const packageId = sessionData?.packageInfo?.package_id;
  const validationResult = sessionData?.validationResult;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Step 3: Validate Package
          </h3>
          <p className="text-gray-600">
            Verify supplier signature and authenticity
          </p>
        </div>

        {!validationResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Signature
              </label>
              <input
                id="signature"
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Enter supplier signature"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Signature is automatically filled
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !signature.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Validate Signature</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className={`p-4 rounded-lg border-2 ${
            validationResult.is_trusted 
              ? 'bg-green-50 border-green-300' 
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <div className="flex items-start space-x-3">
              {validationResult.is_trusted ? (
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`font-semibold mb-2 ${
                  validationResult.is_trusted ? 'text-green-900' : 'text-yellow-900'
                }`}>
                  {validationResult.message}
                </h4>
                <div className={`text-sm space-y-1 ${
                  validationResult.is_trusted ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  <p><strong>Package ID:</strong> {validationResult.package_id}</p>
                  <p><strong>Trusted Supplier:</strong> {validationResult.is_trusted ? 'Yes ✓' : 'No ✗'}</p>
                  <p><strong>Status:</strong> {validationResult.status}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}