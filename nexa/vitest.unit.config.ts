import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    globals: false,
    include: ["src/**/*.unit.test.ts", "src/**/*.unit.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage/unit",
      include: [
        "src/lib/**/*.{ts,tsx}",
        "src/services/**/*.{ts,tsx}",
      ],
      exclude: [
        "src/lib/**/*.test.{ts,tsx}",
        "src/services/**/*.test.{ts,tsx}",
        "src/lib/**/*.component.test.{ts,tsx}",
        "src/services/**/*.component.test.{ts,tsx}",
        "src/test/**",
        "src/types/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
