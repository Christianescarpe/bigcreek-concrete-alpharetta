const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/concrete-walkway',
        destination: '/concrete-walkways/',
        permanent: true,
      },
      {
        source: '/concrete-driveway',
        destination: '/concrete-driveways/',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};

module.exports = nextConfig;
