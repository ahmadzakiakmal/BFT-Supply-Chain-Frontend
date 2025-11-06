/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  
  // Environment variables that should be available at runtime
  env: {
    NEXT_PUBLIC_SHARD_A_ENDPOINT: process.env.NEXT_PUBLIC_SHARD_A_ENDPOINT,
    NEXT_PUBLIC_SHARD_B_ENDPOINT: process.env.NEXT_PUBLIC_SHARD_B_ENDPOINT,
    NEXT_PUBLIC_L1_ENDPOINT: process.env.NEXT_PUBLIC_L1_ENDPOINT,
    NEXT_PUBLIC_L1_N0_RPC: process.env.NEXT_PUBLIC_L1_N0_RPC,
    NEXT_PUBLIC_L1_N1_RPC: process.env.NEXT_PUBLIC_L1_N1_RPC,
    NEXT_PUBLIC_DEFAULT_SHARD: process.env.NEXT_PUBLIC_DEFAULT_SHARD,
  },
};

export default nextConfig;