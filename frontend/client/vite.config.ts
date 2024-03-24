import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

dotenv.config();

const VITE_PORT = Number(process.env.VITE_PORT ?? 5100);

export default defineConfig({
    base: "/",
    plugins: [react(), checker({ typescript: true })],
    define: {
        "process.env": {},
    },
    server: {
        port: VITE_PORT,
        hmr: {
            port: VITE_PORT,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/_mantine";',
            },
        },
    },
});
