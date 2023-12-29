// import compress from "astro-compress";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default {
  plugins: [],
  integrations: [
    // compress(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
};
