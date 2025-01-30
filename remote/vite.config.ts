import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { dependencies } from "./package.json";

export default defineConfig(() => {
  return {
    build: {
      target: "chrome89",
      emptyOutDir: true,
    },
    plugins: [
      federation({
        filename: "remoteEntry.js",
        name: "remote",
        exposes: {
          "./remote-app": "./src/App.tsx",
        },
        remotes: {},
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
          "react-dom": {
            requiredVersion: dependencies["react-dom"],
            singleton: true,
          },
          "styled-components": {
            requiredVersion: dependencies["styled-components"],
            singleton: true,
          },
        },
      }),
      react(),
    ],
  };
});
