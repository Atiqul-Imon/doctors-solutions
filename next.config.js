const path = require('path');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure PDFKit fonts are accessible in server build
      // Copy fonts to .next/server directory so PDFKit can find them
      const CopyWebpackPlugin = require('copy-webpack-plugin');
      
      // Add copy plugin to copy PDFKit fonts to server build
      config.plugins = config.plugins || [];
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'public', 'fonts', 'pdfkit'),
              to: path.join(__dirname, '.next', 'server', 'vendor-chunks', 'data'),
              noErrorOnMissing: true,
            },
          ],
        })
      );
    }
    
    // Ensure PDFKit fonts are available
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  },
}

module.exports = nextConfig

