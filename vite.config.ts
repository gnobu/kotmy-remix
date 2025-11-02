// vite.config.ts

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, type UserConfig } from "vite";
// Import the plugin that handles path aliases (tilde imports like '~/components')
import tsconfigPaths from "vite-tsconfig-paths";
// Import the official Vercel preset
import { vercelPreset } from "@vercel/remix/vite"; 

// Install global polyfills (standard for Remix)
installGlobals(); 

export default defineConfig({
  plugins: [
    remix({
      // 🚨 CRITICAL: Use the Vercel preset to fix the module system mismatch
      presets: [vercelPreset()], 
      // You can also add V3 Future Flags here if you want to opt-in:
      // future: { 
      //   v3_fetcherPersist: true,
      //   v3_relativeSplatPath: true,
      //   // ... others
      // }
    }),
    // 💡 Potential fix for your previous 'import tsconfigPaths' issue:
    // This plugin often needs to be imported as a default export
    // and then called as a function here:
    (tsconfigPaths as typeof tsconfigPaths)(),
  ],
}) satisfies UserConfig;
