import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_WS_URL: process.env.LIVEKIT_WS_URL,
  },
};

export default nextConfig;
