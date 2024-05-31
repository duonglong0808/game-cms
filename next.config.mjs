/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
    API_GAME_DICE: 'http://localhost:9991/api',
    HOST_KU: 'https://vn.vc3559k.net/api',
  },

  // dev environment
  // env: {
    //   API_URL: 'https://api.vk169.net/api',
    //   API_GAME_DICE: 'https://game.api.vk169.net/api',
    //   HOST_KU: 'https://vn.vc3559k.net/api',
    // },
    
    // Production environment
  // env: {
  //   API_URL: 'https://api.ku3933d.net/api',
  //   API_GAME_DICE: 'https://api-game.ku3933d.net/api',
  //   HOST_KU: 'https://vn.vc3559k.net/api',
  // },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;
