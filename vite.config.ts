import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();

      // Return a middleware function that handles Express routes
      return () => {
        // Use Express for API routes
        server.middlewares.use("/api", app);

        // SPA fallback - serve index.html for all non-API routes
        server.middlewares.use((req, res, next) => {
          // If it's an API route, let Express handle it
          if (req.url.startsWith("/api")) {
            return next();
          }
          // For everything else, let Vite handle it (SPA routing)
          next();
        });
      };
    },
  };
}
