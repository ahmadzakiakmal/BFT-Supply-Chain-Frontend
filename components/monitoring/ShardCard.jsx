"use client";

import { Server, Activity, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShardCard({ shard, now }) {
  const isActive = shard.Status === "active";

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-6 border-2 transition-all",
        isActive ? "border-green-300" : "border-red-300"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn("p-3 rounded-lg", isActive ? "bg-green-100" : "bg-red-100")}>
            <Server className={cn("w-6 h-6", isActive ? "text-green-600" : "text-red-600")} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{shard.L2NodeID}</h3>
            <p className="text-sm text-gray-500">{shard.ClientGroup}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {isActive ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Active</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Offline</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Node ID:</span>
          <span className="font-mono text-gray-900">{shard.L2NodeID}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Endpoint:</span>
          <span className="font-mono text-xs text-gray-900">{shard.ClientGroup == "group-a" ? process.env.NEXT_PUBLIC_SHARD_A_ENDPOINT : process.env.NEXT_PUBLIC_SHARD_B_ENDPOINT}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center space-x-1">
            <Activity className="w-4 h-4" />
            <span>Active Sessions:</span>
          </span>
          <span className="font-bold text-blue-600">{shard.SessionCount || 0}</span>
        </div>

        {shard.CreatedAt && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Uptime:</span>
            </span>
            <span className="font-semibold text-gray-900">
              {(() => {
                const createdAt = new Date(shard.CreatedAt).getTime();
                const diffMs = now - createdAt;

                // convert to hours, minutes, seconds
                const seconds = Math.floor(diffMs / 1000) % 60;
                const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
                const hours = Math.floor(diffMs / (1000 * 60 * 60));

                return `${hours}h ${minutes}m ${seconds}s`;
              })()}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <a
          href={shard.ClientGroup == "group-a" ? process.env.NEXT_PUBLIC_SHARD_A_ENDPOINT : process.env.NEXT_PUBLIC_SHARD_B_ENDPOINT}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Shard Details →
        </a>
      </div>
    </div>
  );
}
