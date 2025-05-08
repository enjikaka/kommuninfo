import lume from "lume/mod.ts";
import markdown from "lume/plugins/markdown.ts";

const site = lume({
  src: "./_data",
});

site.use(markdown());

export default site;
