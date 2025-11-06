"use client";

import { X, Package, User, Clock, CheckCircle, Hash, Database, ExternalLink, FileText } from "lucide-react";
import { truncateHash } from "@/lib/utils";

export default function SessionDetailModal({ session, onClose }) {
  if (!session) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Session Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Session Information</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Session ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">
                  {session.Transaction?.SessionID || session.SessionID}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Operator ID</p>
                <p className="font-semibold text-gray-900">{session.OperatorID}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    session.Status === "committed"
                      ? "bg-green-100 text-green-800"
                      : session.Status === "active"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {session.Status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="text-sm text-gray-900">{new Date(session.CreatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Package Info */}
          {session.Package && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Package Details</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Package ID</p>
                  <p className="font-mono text-sm text-gray-900">{session.Package.PackageID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Supplier</p>
                  <p className="text-sm text-gray-900">{session.Package.Supplier?.Name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Package Status</p>
                  <p className="text-sm text-gray-900">{session.Package.Status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Signature</p>
                  <p className="font-mono text-xs text-gray-900 break-all">
                    {truncateHash(session.Package.Signature, 8)}
                  </p>
                </div>
              </div>

              {/* Items */}
              {session.Package.Items && session.Package.Items.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Items ({session.Package.Items.length})</p>
                  <div className="space-y-2">
                    {session.Package.Items.map((item) => (
                      <div
                        key={item.ItemID}
                        className="bg-white rounded p-3 text-sm"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">{item.Description}</span>
                          <span className="text-gray-600">Qty: {item.Quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* QC Record */}
          {session.QCRecord && (
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Quality Check</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">QC ID</p>
                  <p className="font-mono text-sm text-gray-900">{session.QCRecord.QCID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Result</p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      session.QCRecord.Passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {session.QCRecord.Passed ? "Passed" : "Failed"}
                  </span>
                </div>
                {session.QCRecord.Issues && session.QCRecord.Issues.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Issues</p>
                    <ul className="list-disc list-inside text-sm text-gray-900">
                      {session.QCRecord.Issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Label */}
          {session.Label && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Hash className="w-5 h-5" />
                <span>Shipping Label</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Label ID</p>
                  <p className="font-mono text-sm text-gray-900">{session.Label.LabelID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-mono text-sm text-gray-900">{session.Label.TrackingNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Courier</p>
                  <p className="text-sm text-gray-900">{session.Label.Courier?.Name || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Blockchain Info */}
          {session.Transaction && (
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span>Blockchain Record</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Transaction Hash</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm text-gray-900 break-all">{session.Transaction.TxHash}</p>
                    <a
                      href={`${process.env.NEXT_PUBLIC_L1_N0_RPC}/tx?hash=0x${session.Transaction.TxHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="hidden">
                  <p className="text-sm text-gray-600">Session Data</p>
                  <div className="flex items-center space-x-2">
                    <DataViewer data={session.data} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Block Height</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-900">{session.Transaction.BlockHeight}</p>
                    <a
                      href={`${process.env.NEXT_PUBLIC_L1_N1_RPC}/block?height=${session.Transaction.BlockHeight}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shard ID</p>
                  <p className="font-semibold text-gray-900">{session.ShardID}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Committed At</p>
                  <p className="text-sm text-gray-900">{new Date(session.CreatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Data</span>
            </h3>
          <div className="flex items-center space-x-2">
            <DataViewer data={session.data} />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// --- helpers for displaying session.data ---
function prettyLabel(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function sanitizeIso(value) {
  if (typeof value === "string") {
    // fix accidental spaces inside ISO timestamps like "2025-11-06T01: 43: 02.232409Z"
    return value.replace(/\s+/g, "");
  }
  return value;
}

function tryParseJson(value) {
  if (typeof value === "string") {
    // attempt to parse JSONified strings (e.g., issues: "[\"nice\"]")
    try {
      const trimmed = value.trim();
      if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        return JSON.parse(trimmed);
      }
    } catch {
      // ignore
    }
  }
  return value;
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function formatPrimitive(value) {
  // format dates if they look ISO-like
  if (typeof value === "string") {
    const sanitized = sanitizeIso(value);
    const maybeDate = new Date(sanitized);
    if (!Number.isNaN(maybeDate.getTime()) && /T\d{2}:\d{2}/.test(sanitized)) {
      return maybeDate.toLocaleString();
    }
  }
  if (typeof value === "boolean") return value ? "True" : "False";
  if (value === null || value === undefined) return "—";
  return String(value);
}

// simple row (label left, value right) to match your other sections
function DataRow({ label, children }) {
  return (
    <div className="flex items-start justify-between text-sm bg-white rounded p-3 border border-gray-200">
      <p className="text-gray-600 pr-3">{label}</p>
      <div className="font-medium text-gray-900 text-right break-all">{children}</div>
    </div>
  );
}

function DataViewer({ data }) {
  if (!data || !isPlainObject(data)) {
    return <p className="text-sm text-gray-500">No data</p>;
  }

  return (
    <div className="space-y-2 w-full">
      {Object.entries(data).map(([key, rawVal]) => {
        // normalize oddities
        const parsed = tryParseJson(rawVal);
        const val = sanitizeIso(parsed);

        if (Array.isArray(val)) {
          return (
            <div
              key={key}
              className="space-y-2"
            >
              <p className="text-sm text-gray-600">
                {prettyLabel(key)} ({val.length})
              </p>
              <div className="space-y-2">
                {val.map((item, idx) => (
                  <div
                    key={`${key}-${idx}`}
                    className="bg-white rounded p-3 border border-gray-200 text-sm"
                  >
                    {isPlainObject(item) ? (
                      // nested object item
                      <div className="space-y-2">
                        {Object.entries(item).map(([k2, v2]) => (
                          <DataRow
                            key={k2}
                            label={prettyLabel(k2)}
                          >
                            {isPlainObject(v2) || Array.isArray(v2) ? (
                              <div className="text-left">
                                <pre className="text-xs whitespace-pre-wrap break-all">
                                  {JSON.stringify(v2, null, 2)}
                                </pre>
                              </div>
                            ) : (
                              formatPrimitive(v2)
                            )}
                          </DataRow>
                        ))}
                      </div>
                    ) : (
                      // primitive array item
                      <span className="text-gray-900">{formatPrimitive(item)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (isPlainObject(val)) {
          // nested object: render a titled group with a light panel
          return (
            <div
              key={key}
              className="space-y-2"
            >
              <p className="text-sm text-gray-600">{prettyLabel(key)}</p>
              <div className="bg-gray-50 rounded p-3 space-y-2 border border-gray-200">
                {Object.entries(val).map(([k2, v2]) => (
                  <DataRow
                    key={`${key}-${k2}`}
                    label={prettyLabel(k2)}
                  >
                    {isPlainObject(v2) || Array.isArray(v2) ? (
                      <div className="text-left">
                        <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(v2, null, 2)}</pre>
                      </div>
                    ) : (
                      formatPrimitive(v2)
                    )}
                  </DataRow>
                ))}
              </div>
            </div>
          );
        }

        // primitive
        return (
          <DataRow
            key={key}
            label={prettyLabel(key)}
          >
            {formatPrimitive(val)}
          </DataRow>
        );
      })}
    </div>
  );
}

