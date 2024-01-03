import compress from "astro-compress";
import partytown from "@astrojs/partytown";
import node from "@astrojs/node";

// https://astro.build/config
export default {
  outDir: "../../dist",
  output: "static",
  adapter: node({
    mode: "middleware",
  }),
  prefetch: true,
  plugins: [],
  integrations: [
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    compress(),
  ],
};
