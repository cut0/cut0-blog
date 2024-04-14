import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const port = parseInt(process.env.PORT ?? "3000");

const app = new Hono();

app.use(
  "*",
  async (c, next) => {
    await next();
    // const path = c.req.path;
    // if (/\.(html|css|js|png|jpg)$/.test(path)) {
    // Cache-Control ヘッダーを設定
    // }
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
  console.log(`slistening on http://localhost:${port}/`);
});
