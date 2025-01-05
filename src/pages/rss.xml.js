// import rss, { pagesGlobToRssItems } from "@astrojs/rss";

// export async function GET(context) {
//   return rss({
//     title: "Astro Learner | Blog",
//     description: "My journey learning Astro",
//     site: context.site,
//     items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
//     customData: `<language>en-us</language>`,
//   });
// }

import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function GET(context) {
  const postImportResult = import.meta.glob("../posts/**/*.md", {
    eager: true,
  });
  const posts = Object.values(postImportResult);
  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    site: context.site,
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      description: sanitizeHtml(post.compiledContent()),
      pubDate: post.frontmatter.pubDate,
      customData: `<content:encoded><![CDATA[${sanitizeHtml(post.compiledContent())}]]></content:encoded>`,
    })),
    customData: `<language>en-us</language>`,
  });
}
