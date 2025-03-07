import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 5173, // Use a porta padrão do Vite
    strictPort: true, // Garante que a porta não mude automaticamente
    allowedHosts: "all", // Permite acesso de qualquer dispositivo na rede
    https: true // Em desenvolvimento, rodamos sem HTTPS
  }
})
