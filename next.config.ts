// next.config.ts
import path from 'path';
import { Configuration } from 'webpack';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Add PDF.js worker handling
    config.module?.rules?.push({
      test: /pdf\.worker\.js$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/chunks/[name].[hash].[ext]',
          },
        },
      ],
    });

    if (!isServer && config.resolve) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }

    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);