import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const port = parseInt(process.env.PORT ?? "3000");

const app = new Hono();

app.get("*", async (c) => {
  if (c.req.url === "https://cut0-blog.vercel.app") {
    const url = new URL(c.req.url);

    const newHostname = "cut0.blog.app";
    url.hostname = newHostname;

    c.redirect(url.toString(), 301);
  }
});

app.use(
  "*",
  async (c, next) => {
    await next();

    c.res.headers.append(
      "Cache-Control",
      "public, max-age=300, s-maxage=86400",
    );
  },
  serveStatic({
    root: "../../dist",
  }),
);

serve({ fetch: app.fetch, port }, () => {
  console.log(`listening on http://localhost:${port}/`);
});
