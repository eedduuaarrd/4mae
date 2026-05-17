import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { waitlistApiPlugin } from "./vite-plugin-waitlist-api.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), waitlistApiPlugin()],
    base: env.VITE_BASE_PATH || "/",
  };
});
