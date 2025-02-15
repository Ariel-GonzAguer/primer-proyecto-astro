---
# layout: "@layouts/MarkdownPostLayout.astro" # When you include the layout frontmatter property in an .md file, all of your frontmatter YAML values are available to the layout file.
title: "Content collection - tutorial"
pubDate: 2025-15-01
description: "Content collection - tutorial."
author: "Ariel-Astro-Learner"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blogging", "learning in public", "notas personales"]
---

## De blog posts a content collection

1. Actualización de dependencias
   se ejecutan en la terminal:
   `npx @astrojs/upgrade`

2. Cree un archivo src/content.config.ts para definir un esquema para su colección de publicaciones. Para que Astro reconozca su esquema, cierre la terminal `(CTRL + C)` y reinicie el servidor de desarrollo para continuar con el tutorial. Esto definirá el módulo `astro:content`.

3. Crea un archivo de página llamado en `src/pages/posts/` llamado `[...slug].astro`. Tus archivos Markdown y MDX ya no se convierten automáticamente en páginas mediante el enrutamiento basado en archivos de Astro cuando están dentro de una colección, por lo que debes crear una página responsable de generar cada publicación de blog individual.

4. Agregue el siguiente código para consultar su colección y hacer que el slug de cada publicación del blog y el contenido de la página estén disponibles para cada página que generará:

```
`src/pages/posts/[...slug].astro`
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
const posts = await getCollection('blog');
return posts.map(post => ({
  params: { slug: post.id }, props: { post },
}));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
```

5. Renderiza tus posts <Content /> dentro del diseño para páginas Markdown. Esto te permite especificar un diseño común para todas tus publicaciones.

```
 `src/pages/posts/[...slug].astro`
 ---
import { getCollection, render } from 'astro:content';
import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro'; //+ agregar

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id }, props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<MarkdownPostLayout frontmatter={post.data}> //+ agregar
  <Content /> //+ agregar
</MarkdownPostLayout> //+ agregar
```

6. Elimina la propiedad `layout` del frontmatter de cada post individual. Ahora, tu contenido se envuelve en un diseño cuando se muestra y esta propiedad ya no es necesaria.

7. Reemplace `import.meta.glob()` con `getCollection()` en los archivos .md

8. También deberá actualizar las referencias a los datos retornados para cada post. Ahora encontrará los valores de frontmatter en la propiedad de datos de cada objeto. Además, cuando utilice colecciones, cada objeto de publicación tendrá un `slug` de página, no una URL completa.

9. Ahora hay que aplicar los mismos cambios a `src/pages/tags/[tag].astro` y `src/pages/tags/index.astro`:

   - Cambiar `import.meta.glob()` por `getCollection()`.
   - Acceder a los datos del frontmatter de cada post con `post.data` en lugar de `post.frontmatter`.
   - cambiar la url de cada post con `/posts/${post.id}/` en lugar de `post.url`.

10. Actualice los valores del frontmatter para que coincidan con su esquema. Ahora pubDate es un objeto Date, no una cadena. Hay que usar el método `.toLocaleDateString()` para convertirlo en una cadena.

11. Actualizar la función de RSS. 