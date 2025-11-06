"use client";

import { Clock, Package, CheckCircle } from "lucide-react";
import { truncateHash } from "@/lib/utils";

export default function RecentSessions({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No recent sessions</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Recent Sessions</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Committed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TxHash</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Block Height
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.slice(0, 10).map((session) => (
              <tr
                key={session.Transaction.SessionID}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {truncateHash(session.Transaction.SessionID, 6)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{session.OperatorID}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      session.Status === "committed"
                        ? "bg-green-100 text-green-800"
                        : session.Status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {session.Status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {session.Status === "committed" ? (
                    <CheckCircle className="mx-auto w-5 h-5 text-green-600" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 underline">
                  <a
                    href={`${process.env.NEXT_PUBLIC_L1_N0_RPC}/tx?hash=0x${session.Transaction.TxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncateHash(session.Transaction.TxHash, 6)}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 underline">
                  <a
                    href={`${process.env.NEXT_PUBLIC_L1_N1_RPC}/block?height=${session.Transaction.BlockHeight}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {session.Transaction.BlockHeight}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(session.CreatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

