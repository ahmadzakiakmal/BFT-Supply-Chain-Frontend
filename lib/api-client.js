import axios from "axios";

export class ShardAPIClient {
  constructor(shardEndpoint) {
    this.shardEndpoint = shardEndpoint;
    this.client = axios.create({
      baseURL: shardEndpoint,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Get shard information
  async getShardInfo() {
    const response = await this.client.get("/info");
    return response.data;
  }

  // 1. Create Session
  async createSession(operatorId) {
    const response = await this.client.post("/session/start", {
      operator_id: operatorId,
    });
    return response.data;
  }

  // 2. Scan Package
  async scanPackage(sessionId, packageId) {
    const response = await this.client.post(`/session/${sessionId}/scan`, {
      package_id: packageId,
    });
    return response.data;
  }

  // 3. Validate Package
  async validatePackage(sessionId, signature, packageId) {
    const response = await this.client.post(`/session/${sessionId}/validate`, {
      signature,
      package_id: packageId,
    });
    return response.data;
  }

  // 4. Quality Check
  async performQualityCheck(sessionId, passed, issues) {
    const response = await this.client.post(`/session/${sessionId}/qc`, {
      passed,
      issues,
    });
    return response.data;
  }

  // 5. Create Label
  async createLabel(sessionId, courierId) {
    const response = await this.client.post(`/session/${sessionId}/label`, {
      courier_id: courierId,
    });
    return response.data;
  }

  // 6. Commit to L1
  async commitSession(sessionId) {
    const response = await this.client.post(`/session/${sessionId}/commit`);
    return response.data;
  }

  // Get session details
  async getSession(sessionId) {
    const response = await this.client.get(`/session/${sessionId}`);
    return response.data;
  }
}

// Singleton instances for different shards
const shardClients = {};

export function getShardClient(shardId) {
  if (!shardClients[shardId]) {
    const endpoints = {
      "shard-a": process.env.NEXT_PUBLIC_SHARD_A_ENDPOINT || "http://localhost:7000",
      "shard-b": process.env.NEXT_PUBLIC_SHARD_B_ENDPOINT || "http://localhost:7001",
    };

    shardClients[shardId] = new ShardAPIClient(endpoints[shardId]);
  }

  return shardClients[shardId];
}

// L1 API Client
export class L1APIClient {
  constructor(l1Endpoint) {
    this.client = axios.create({
      baseURL: l1Endpoint,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Get all shards
  async getShards() {
    const response = await this.client.get("/l1/shards");
    return response.data.data || [];
  }

  // Get sessions by shard
  async getSessionsByShard(shardId) {
    const response = await this.client.get(`/l1/sessions/shard/${shardId}`);
    
    return response.data.data || [];
  }

  // Get sessions by group
  async getSessionsByGroup(groupId) {
    const response = await this.client.get(`/l1/sessions/group/${groupId}`);
    return response.data.data || [];
  }

  // Get L1 node status
  async getNodeStatus() {
    const response = await this.client.get("/debug");
    return response.data;
  }
}

export const l1Client = new L1APIClient(process.env.NEXT_PUBLIC_L1_N0_ENDPOINT || "http://localhost:5000");
