import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from "vite-plugin-checker";
import dotenv from 'dotenv'

dotenv.config();

const VITE_PORT = Number(process.env.VITE_PORT ?? 5100);

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    checker({ typescript: true })
  ],
  define: {
    "process.env": {}
  },
  server: {
    port: VITE_PORT,
    hmr: {
      port: VITE_PORT
    }
  }
})
