import Link from 'next/link';
import { Package, Monitor, History, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          BFT Warehouse Management System
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Two-Layer Byzantine Fault-Tolerant Architecture
        </p>
        <p className="text-gray-500">
          Secure, scalable package processing with blockchain commitment
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Layer 2 */}
          <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Layer 2: Independent Shards
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Fast Processing:</strong> Quick local consensus</li>
              <li>• <strong>Grouped Clients:</strong> Geographic/organizational sharding</li>
              <li>• <strong>Independent Nodes:</strong> No inter-shard consensus needed</li>
              <li>• <strong>Real-time Response:</strong> Immediate operator feedback</li>
            </ul>
          </div>

          {/* Layer 1 */}
          <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Layer 1: BFT Consensus
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Immutable Storage:</strong> Tamper-proof blockchain</li>
              <li>• <strong>Byzantine Fault Tolerance:</strong> 4+ validators</li>
              <li>• <strong>Cross-Shard Audit:</strong> All sessions recorded</li>
              <li>• <strong>Final Commitment:</strong> Permanent transaction records</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Operator Interface */}
        <Link href="/operator">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-300 h-full">
            <div className="flex items-center justify-between mb-4">
              <Package className="h-10 w-10 text-blue-600" />
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Operator Interface
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Process packages through the complete 6-step workflow
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✓ Start Session</li>
              <li>✓ Scan Package</li>
              <li>✓ Validate & QC</li>
              <li>✓ Create Label</li>
              <li>✓ Commit to L1</li>
            </ul>
          </div>
        </Link>

        {/* Monitoring Dashboard */}
        <Link href="/monitoring">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-300 h-full">
            <div className="flex items-center justify-between mb-4">
              <Monitor className="h-10 w-10 text-green-600" />
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              System Monitoring
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Real-time view of shards and blockchain status
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✓ Shard Health</li>
              <li>✓ Node Status</li>
              <li>✓ Active Sessions</li>
              <li>✓ Live Metrics</li>
            </ul>
          </div>
        </Link>

        {/* Session History */}
        <Link href="/history">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-300 h-full">
            <div className="flex items-center justify-between mb-4">
              <History className="h-10 w-10 text-purple-600" />
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Session History
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Audit trail and transaction verification
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✓ Session Logs</li>
              <li>✓ Blockchain Verify</li>
              <li>✓ Audit Trail</li>
              <li>✓ Search & Filter</li>
            </ul>
          </div>
        </Link>
      </div>

      {/* Key Benefits */}
      <div className="bg-linear-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">Fast</div>
            <p className="text-sm text-gray-600">Sub-second L2 response times</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">Secure</div>
            <p className="text-sm text-gray-600">Byzantine fault tolerance</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">Scalable</div>
            <p className="text-sm text-gray-600">Independent shard processing</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">Auditable</div>
            <p className="text-sm text-gray-600">Immutable blockchain records</p>
          </div>
        </div>
      </div>
    </div>
  );
}