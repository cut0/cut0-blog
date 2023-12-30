import path from "path";
import fs from "fs";
import m2h from "zenn-markdown-html";
import { createClient } from "microcms-js-sdk";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "../src");

const main = async () => {
  const data = await createClient({
    serviceDomain: process.env.PUBLIC_SERVICE_DOMAIN,
    apiKey: process.env.PUBLIC_API_KEY,
  }).getList({ endpoint: "blog-contents" });

  const articleList = data.contents.map((article) => ({
    ...article,
    body: m2h.default(article.body, {
      embedOrigin: "https://embed.zenn.studio",
    }),
  }));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(
    path.join(OUTPUT_DIR, "out.json"),
    JSON.stringify({ data: articleList }),
    (err, data) => {
      if (err) console.error(err);
      else console.log("write completed");
    },
  );
};

main();
