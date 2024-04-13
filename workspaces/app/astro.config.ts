import compress from "astro-compress";
import partytown from "@astrojs/partytown";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  outDir: "../../dist",
  output: "static",
  adapter: node({
    mode: "middleware",
  }),
  prefetch: true,
  integrations: [
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    compress(),
  ],
});
