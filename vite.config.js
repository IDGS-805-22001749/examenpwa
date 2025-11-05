import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Estrategia de actualización: 'autoUpdate' revisa si hay una nueva
      // versión en cada carga de página y la aplica automáticamente.
      registerType: 'autoUpdate',

      // Configuración del Web App Manifest (manifest.json)
      manifest: {
        name: 'Mi App CRUD PWA', // Nombre completo de la app
        short_name: 'AppCRUD', // Nombre corto (para el ícono en home)
        description: 'Una aplicación PWA para gestionar un CRUD simple.',
        theme_color: '#ffffff', // Color de la barra de la app
        background_color: '#ffffff', // Color de fondo de la splash screen
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png', // Icono para Android
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // Icono para Android (más grande)
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // Icono para máscara (Android)
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});