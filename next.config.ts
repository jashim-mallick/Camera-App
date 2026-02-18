import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	reactCompiler: true,
	typedRoutes: true,
	allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
