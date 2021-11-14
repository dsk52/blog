/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  pageExtensions: ['jsx', 'ts', 'tsx'],

  async redirects() {
    return [
      {
        source: '/post',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
