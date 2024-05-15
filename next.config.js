// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '.');
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
};



// const nextConfig = {
//   webpack: (config) => {
//       return config;
//     },
//   experimental: {
//       esmExternals: "loose", // <-- add this
//      serverComponentsExternalPackages: ["mongoose"] 
//   }
//   }
