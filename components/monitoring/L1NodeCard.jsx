"use client";

import { Database, Activity, Blocks, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function L1NodeCard({ node, index }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "syncing":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-red-600 bg-red-100";
    }
  };

  const L1_ENDPOINTS = [
    process.env.NEXT_PUBLIC_L1_N0_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N1_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N2_ENDPOINT,
    process.env.NEXT_PUBLIC_L1_N3_ENDPOINT,
  ];

  return (
    <a
      href={L1_ENDPOINTS[index]}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 hover:shadow-blue-300/60 transition-colors block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-blue-100">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{node.node_id}</h3>
            {node.is_validator && (
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-600">Validator</span>
              </div>
            )}
          </div>
        </div>

        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", getStatusColor(node.status))}>
          {node.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center space-x-1">
            <Blocks className="w-4 h-4" />
            <span>Block Height:</span>
          </span>
          <span className="font-bold text-gray-900">{node.block_height?.toLocaleString()}</span>
        </div>
      </div>
    </a>
  );
}
