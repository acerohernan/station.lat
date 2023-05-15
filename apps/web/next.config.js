const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["'@station.lat/ui"],
};

module.exports = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching,
})(nextConfig);
