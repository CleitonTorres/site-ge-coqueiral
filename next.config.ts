import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Somente configurações consumidas no navegador. Tudo em `env` é público.
  // Credenciais de MongoDB, Google Cloud, e-mail e Instagram ficam em process.env no servidor.
  env: {
    ROOT_URL: process.env.ROOT_URL || 'https://19.escoteiroses.org.br',
    SITE_URL: process.env.SITE_URL || process.env.ROOT_URL || 'https://19.escoteiroses.org.br',
    URL_SERVICES: process.env.URL_SERVICES || '/api/services',
    URL_AUTH: process.env.URL_AUTH || '/api/auth',
    URL_UPLOAD: process.env.URL_UPLOAD,
    API_KEY_GOOGLE: process.env.API_KEY_GOOGLE,
    RECAPTCHA_KEY_SITE: process.env.RECAPTCHA_KEY_SITE,
    // Compatibilidade com os fluxos legados, que já utilizam estes valores no cliente.
    // Não representam segredos protegidos; sua retirada exige migrar esses fluxos.
    AUTORIZATION: process.env.AUTORIZATION,
    TOKEN_APP: process.env.TOKEN_APP,
    PASSWORD: process.env.PASSWORD,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/cleitontorres.png',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/42627426?v=4',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-gig4-1.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-gig4-2.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-2.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-1.cdninstagram.com',
        port: '',
      },{
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },{
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com'
      }
    ],
  },
  productionBrowserSourceMaps: false
};

export default nextConfig;
 
