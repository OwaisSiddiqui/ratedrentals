module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    images: {
      unoptimized: true,
      domains: ['images.rentals.ca'],
    },
    eslint: {
      dirs: [
        'app',
        'components',
        'context',
        'features',
        'pages',
        'pubic',
        'utils',
      ],
    },
    experimental: {
      images: {
        allowFutureImage: true,
      },
    },
    async redirects() {
      return [
        {
          source: '/:city/addresses/:address',
          destination: '/:city/:address',
          permanent: true,
        },
        {
          source: '/:city/address/:address',
          destination: '/:city/:address',
          permanent: true,
        },
      ]
    },
  }

  /**
   * @type {import('next').NextConfig}
   */
  return nextConfig
}
