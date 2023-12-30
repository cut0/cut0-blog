import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const port = parseInt(process.env.PORT ?? "3000");

const app = new Hono();

app.use(
  "*",
  serveStatic({
    root: "../../dist",
  }),
);

serve({ fetch: app.fetch, port }, () => {
  console.log(`slistening on http://localhost:${port}/`);
});
