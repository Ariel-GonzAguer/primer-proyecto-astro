---
layout: "@layouts/MarkdownPostLayout.astro" # When you include the layout frontmatter property in an .md file, all of your frontmatter YAML values are available to the layout file.
title: "Notas del tutorial"
pubDate: 2025-12-01
description: "notas sobre Astro."
author: "Ariel-Astro-Learner"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blogging", "learning in public", "notas personales"]
---

1. para crear rutas para las páginas, agregar archivos .astro a carpeta pages.

2. el js se escribe entre --- y ---, para después poder usarlo dentro del html.
3. las props se crean en el componente hijo con

```
const {propARecibir} = Astro.props;
```

y se pasan como props al componente padre

```
---
import BaseLayout from '../layouts/BaseLayout.astro';
const pageTitle: string = "Home Page"; // se da el valor a la prop en el componente padre
---
<BaseLayout pageTitle={pageTitle}> // el hijo recibe la prop que esperaba con el valor del componente padre
  <h2>My awesome blog subtitle</h2>
</BaseLayout>
```

4. El <slot / > permite inyectar (o “colocar”) contenido secundario (hijos) escrito entre las etiquetas de apertura y cierre < Component >< /Component> en cualquier archivo `Component.astro`.

5. slot con nombre  
   Un componente layout Astro también puede tener slot con nombre. Esto le permite pasar solo elementos HTML con el nombre del slot correspondiente a la ubicación exacta del slot. Los slot se nombran utilizando el atributo `name`:

```
<!-- src/layouts/Wrapper.astro -->
---
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { title } = Astro.props;
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header" />  <!--  children with the `slot="after-header"` attribute will go here -->
  <Logo />
  <h1>{title}</h1>
  <slot />  <!--  children without a `slot`, or with `slot="default"` attribute will go here -->
  <Footer />
  <slot name="after-footer" />  <!--  children with the `slot="after-footer"` attribute will go here -->
</div>

```

Despúes se usa el atributo `slot` en el componente hijo para indicar en que lugar se debe colocar el contenido.

```
<!-- src/pages/fred.astro -->
---
import Wrapper from '../components/Wrapper.astro';
---
<Wrapper title="Fred's Page">
  <img src="https://my.photo/fred.jpg" slot="after-header" />
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

6. Al usar un componente Layout, se aplicará a toda la página los estilos definidos en el componente Layout, en este proyecto, los estilos de `global.css`.  
   Para mantener los estilos de la página individual (como en about.astro) se mueve la etiqueta **<style / >** dentro del componente Layout, y se agrega el atributo **is:global**, por ejemplo:

```
<style   is:global   define:vars={{ skillColor, fontWeight, textCase}}>
...
<style/>
```

7. Cuando incluye la propiedad frontmatter `layout` en un archivo .md, todos los valores YAML de frontmatter están disponibles para el archivo de diseño.
8. Siempre agrear al layout para los archivos .md `<meta charset="utf-8" />` para no tener errores en los caracteres especiales.

9. Muestra dinámicamente una lista:
   `import.meta.glob()` devolverá un array de objetos. Ejemplo:
   ` const allPosts: MarkdownInstance<any>[] = Object.values(import.meta.glob('./posts/*.md', { anxious: true }));`
   Devuelve información sobre todos tus archivos Markdown. El tipo de la constante que almacena esta información es `MarkdownInstance<any>[]`.

10. Los archivos Markdown cargados con `import.meta.glob()` devuelven la siguiente interfaz `MarkdownInstance`:

```
export interface MarkdownInstance<T extends Record<string, any>> {
/* Any data specified in this file's YAML frontmatter */
frontmatter: T;
/* The absolute file path of this file */
file: string;
/* The rendered path of this file */
url: string | undefined;
/* Astro Component that renders the contents of this file */
Content: AstroComponentFactory;
/** (Markdown only) Raw Markdown file content, excluding layout HTML and YAML frontmatter */
rawContent(): string;
/** (Markdown only) Markdown file compiled to HTML, excluding layout HTML */
compiledContent(): string;
/* Function that returns an array of the h1...h6 elements in this file */
getHeadings(): Promise<{ depth: number; slug: string; text: string }[]>;
default: AstroComponentFactory;
}
```

11. La función `getStaticPaths` devuelve una arreglo de rutas de página, y todas las páginas en esas rutas usarán la misma plantilla definida en el archivo.
    Una función `getStaticPaths` siempre debe devolver una lista de objetos que contengan `params` (cómo llamar a cada ruta de página) y, opcionalmente, cualquier `props` (datos que desea pasar a esas páginas).

12. Patrón `/pages/folder/index.astro`: el archivo `index.astro` dentro de cada `folder` de la carpeta `pages` es el que se renderiza cuando se accede a la ruta de la carpeta.

13. @astrojs/rss: Astro ofrece un paquete personalizado para agregar rápidamente un feed RSS a su sitio web.
    Este paquete oficial genera un documento no-HTML con información sobre todas las publicaciones de su blog que pueden leer lectores de feeds como Feedly, The Old Reader y otros. Este documento se actualiza cada vez que se reconstruye su sitio.
    Las personas pueden suscribirse a su feed en un lector de feeds y recibir una notificación cuando publique una nueva publicación de blog en su sitio, lo que lo convierte en una característica popular de los blogs.

- npm install @astrojs/rss
- crear el archivo `rss.xml` en la carpeta `src/pages`:

```
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
return rss({
 title: "Astro Learner | Blog",
 description: "My journey learning Astro",
 site: context.site,
 items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
 customData: `<language>en-us</language>`,
});
}
```
- agregar `site: "https://astro0.netlify.app/"` en el archivo `astro.config.mjs`.
- agregar al feed `https://mi-sitio/.com.rss.xml`
