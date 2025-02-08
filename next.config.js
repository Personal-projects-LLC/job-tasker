/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Временно отключаем ESLint во время сборки
  },
  experimental: {
    esmExternals: true,
  },
};

export default config;
