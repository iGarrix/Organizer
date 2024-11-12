import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Orginizer',
    short_name: 'Orginizer',
    description: 'Originize your workflow quickly',
    icons: [
      {
        src: '/pwa-image-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-image-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
