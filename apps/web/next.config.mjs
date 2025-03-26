/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dutiful-cheetah-794.convex.cloud",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "necessary-bloodhound-36.convex",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
