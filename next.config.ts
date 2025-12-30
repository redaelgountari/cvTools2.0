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

    // Resolve PDF.js worker
    if (config.resolve?.alias) {
      config.resolve.alias['pdfjs-dist/build/pdf.worker'] = path.resolve(
        process.cwd(),
        './node_modules/pdfjs-dist/build/pdf.worker.js'
      );
    }

    // Handle fallback for client-side
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

export default nextConfig;