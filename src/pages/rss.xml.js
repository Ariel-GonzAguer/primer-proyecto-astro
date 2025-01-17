import rss from "@astrojs/rss";
// import { pagesGlobToRssItems } from '@astrojs/rss'; quitar por content collection
import { getCollection } from "astro:content"; // agregar para content collection

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    site: context.site,
    // items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")), quitar para content collection
    // ↓↓ agregar para content collection
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
} 
