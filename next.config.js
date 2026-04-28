/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only build the /admin route, leave static HTML pages as-is
  basePath: '',
  output: 'standalone',
}

module.exports = nextConfig
