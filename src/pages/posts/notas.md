---
layout: "../../layouts/MarkdownPostLayout.astro" # When you include the layout frontmatter property in an .md file, all of your frontmatter YAML values are available to the layout file.
title: "Notas del tutorial"
pubDate: 2025-12-01
description: "notas sobre Astro."
author: "Astro Learner"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blogging", "learning in public"]
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
   
8. Siempre agrear al layout para los archivos .md `<meta charset="utf-8" />` para no tener errores en los caracteres especiales
