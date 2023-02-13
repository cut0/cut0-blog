const path = require("path");
const fs = require("fs");

const m2h = require("zenn-markdown-html");
const { createClient } = require("microcms-js-sdk");

require("dotenv").config();

const DIR = path.join(__dirname, "article-raws");

const main = async () => {
  const data = await createClient({
    serviceDomain: process.env.PUBLIC_SERVICE_DOMAIN,
    apiKey: process.env.PUBLIC_API_KEY,
  }).getList({ endpoint: "blog-contents" });

  const articleList = data.contents.map((article) => ({
    ...article,
    body: m2h.default(article.body),
  }));

  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  fs.writeFile(
    path.join(DIR, "out.json"),
    JSON.stringify({ data: articleList }),
    (err, data) => {
      if (err) console.error(err);
      else console.log("write end");
    },
  );
};

main();
