/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.io'],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    config.plugins.push(
      // polyfill 'node:buffer' and 'node:stream' used by file-type
      new webpack.NormalModuleReplacementPlugin(/node:/, resource => {
        const mod = resource.request.replace(/^node:/, '');
        switch (mod) {
          case 'buffer':
            resource.request = 'buffer';
            break;
          case 'stream':
            resource.request = 'readable-stream';
            break;
          default:
            throw new Error(`Not found ${mod}`);
        }
      }),
    );

    return config;
  },
  ...nextConfig,
});
