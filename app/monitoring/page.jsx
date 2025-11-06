"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { l1Client, getShardClient } from "@/lib/api-client";
import SystemOverview from "@/components/monitoring/SystemOverview";
import ArchitectureDiagram from "@/components/monitoring/ArchitectureDiagram";
import ShardCard from "@/components/monitoring/ShardCard";
import L1NodeCard from "@/components/monitoring/L1NodeCard";
import RecentSessions from "@/components/monitoring/RecentSessions";
import LiveMetrics from "@/components/monitoring/LiveMetrics";

export default function MonitoringPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [shards, setShards] = useState([]);
  const [l1Status, setL1Status] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [nowMs, setNowMs] = useState(0);

  // Fetch all monitoring data
  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError(null);

    try {
      // Fetch L1 shards
      const shardsPayload = await l1Client.getShards();
      const shardsData = shardsPayload.shards;

      // Fetch sessions for each shard and add count
      const shardsWithCounts = await Promise.all(
        shardsData.map(async (shard) => {
          try {
            const sessions = await l1Client.getSessionsByShard(shard.ShardID);
            return {
              ...shard,
              SessionCount: sessions.length,
            };
          } catch (err) {
            console.error(`Failed to fetch sessions for ${shard.shard_id}:`, err);
            return {
              ...shard,
              SessionCount: 0,
            };
          }
        })
      );
      setShards(shardsWithCounts);
      setNowMs(Date.now());

      // Fetch L1 node status
      const l1Data = await l1Client.getNodeStatus();
      l1Data.status = "active";
      setL1Status(l1Data);

      // Fetch recent sessions from first shard
      if (shardsWithCounts.length > 0) {
        const firstShardId = shardsWithCounts[0].ShardID;
        const sessions = await l1Client.getSessionsByShard(firstShardId);
        sessions.map(s => {
          s.ShardID = firstShardId;
          return s;
        })
        setRecentSessions(sessions);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch monitoring data. Make sure L1 and L2 services are running.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchData(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Create L1 node data from validators
  const l1Nodes = [];
  if (l1Status?.validators && l1Status.validators.length > 0) {
    // Use real validator data
    l1Status.validators.forEach((validator, index) => {
      l1Nodes.push({
        node_id: validator.address.substring(0, 7) + "...",
        status: index === 0 ? l1Status.status : "active", // First node is the one we're connected to
        block_height: l1Status.block_height || 0,
        is_validator: true,
        peers: index === 0 ? l1Status.num_peers_total : null,
        uptime: index === 0 ? l1Status.uptime : null,
        voting_power: validator.voting_power,
      });
    });
  } else {
    // Fallback to single node if validator data not available
    l1Nodes.push({
      node_id: l1Status?.node_id?.substring(0, 12) + "..." || "node-0",
      status: l1Status?.node_status || "unknown",
      block_height: l1Status?.block_height || 0,
      is_validator: true,
      peers: l1Status?.num_peers_total || 0,
      uptime: l1Status?.uptime || "N/A",
    });
  }

  // Calculate stats
  const stats = {
    totalShards: shards.length,
    activeShards: shards.filter((s) => s.Status === "active").length,
    totalValidators: l1Status?.validator_count || l1Nodes.length,
    activeValidators: l1Nodes.filter((n) => n.status === "active" || n.status === "online").length,
    totalSessions: shards.reduce((sum, shard) => sum + (shard.SessionCount || 0), 0),
    blockHeight: l1Status?.block_height || 0,
  };

  // Mock metrics
  const metrics = {
    avgResponseTime: Math.floor(Math.random() * 500) + 100,
    sessionsPerHour: Math.floor(Math.random() * 50) + 10,
    throughput: Math.floor(Math.random() * 100) + 20,
    responseTimeTrend: 0,
    sessionsTrend: 5,
    throughputTrend: 3,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Monitoring</h1>
          <p className="text-gray-600">Real-time view of shards and blockchain status</p>
        </div>

        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* System Overview Stats */}
      <SystemOverview stats={stats} />

      {/* Architecture Diagram */}
      <ArchitectureDiagram
        shards={shards}
        l1Nodes={l1Nodes}
      />

      {/* Shards Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Layer 2 Shards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shards.map((shard) => (
            <ShardCard
              key={shard.L2NodeID}
              shard={shard}
              now={nowMs}
            />
          ))}
        </div>
      </div>

      {/* L1 Nodes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Layer 1 Validators</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {l1Nodes.map((node, index) => (
            <L1NodeCard
              key={node.node_id}
              node={node}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="mb-8">
        <LiveMetrics metrics={metrics} />
      </div>

      {/* Recent Sessions */}
      <RecentSessions sessions={recentSessions} />
    </div>
  );
}

