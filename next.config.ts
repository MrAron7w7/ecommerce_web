import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignora errores de compilación de TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora errores de ESLint durante el build
  },
};

export default nextConfig;
