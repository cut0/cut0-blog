import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const port = parseInt(process.env.PORT ?? "3000");

const app = new Hono();

app.get("*", async (c, next) => {
  const legacyHostList = [
    "cut0-blog.vercel.app",
    "cut0-blog.web.app",
    "cut0-blog.firebaseapp.com",
  ];

  const url = new URL(c.req.url);

  if (legacyHostList.includes(url.hostname)) {
    const newHostname = "blog.cut0.app";
    url.hostname = newHostname;

    return c.redirect(url.toString(), 301);
  }
  await next();

  return;
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
