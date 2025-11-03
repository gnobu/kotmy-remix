// vite.config.ts

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite"; 

installGlobals(); 

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()], 
      
    }),
    
    (tsconfigPaths as typeof tsconfigPaths)(),
  ],
}) satisfies UserConfig;
