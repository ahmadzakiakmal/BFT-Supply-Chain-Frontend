"use client";

import { Server, Database, ArrowDown } from "lucide-react";

export default function ArchitectureDiagram({ shards, l1Nodes }) {
  const L1_ENDPOINTS = [
    process.env.NEXT_PUBLIC_L1_N0_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N1_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N2_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N3_ENDPOINT,
  ];
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>

      <div className="space-y-8">
        {/* Layer 2 - Shards */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-lg font-semibold text-sm">Layer 2</div>
            <h3 className="text-lg font-semibold text-gray-900">Independent Shards</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shards.map((shard) => (
              <div
                key={shard.L2NodeID}
                className={`p-4 rounded-lg border-2 ${
                  shard.Status === "active" ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="w-5 h-5 text-green-700" />
                    <div>
                      <p className="font-semibold text-gray-900">{shard.L2NodeID}</p>
                      <p className="text-xs text-gray-600">{shard.ClientGroup}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Sessions</p>
                    <p className="font-bold text-green-700">{shard.SessionCount || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-8 h-8 text-gray-400 animate-bounce" />
            <span className="text-sm text-gray-600 font-medium mt-2">Commit Sessions</span>
          </div>
        </div>

        {/* Layer 1 - BFT Consensus */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm">Layer 1</div>
            <h3 className="text-lg font-semibold text-gray-900">BFT Consensus Network</h3>
          </div>

          <div className="p-6 rounded-lg border-2 border-blue-300 bg-blue-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {l1Nodes.map((node, index) => (
                <a
                  href={L1_ENDPOINTS[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={node.node_id || index}
                  className="flex flex-col items-center p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-blue-300 transition-colors"
                >
                  <Database className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-xs font-semibold text-gray-900">{node.node_id || `Node ${index + 1}`}</p>
                  <p className="text-xs text-gray-600">Block {node.block_height || 0}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full mt-1 ${
                      node.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {node.status || "active"}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-blue-900 text-center">
                <strong>Byzantine Fault Tolerance:</strong> Requires {Math.ceil((l1Nodes.length * 2) / 3)} nodes for
                consensus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
