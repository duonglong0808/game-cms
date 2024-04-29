/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
    API_GAME_DICE: 'http://localhost:9991/api',
    HOST_KU: 'https://vn.vc3559k.net/api',
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;
