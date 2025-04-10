# Project Architecture Documentation

This document provides an overview of the Astro project structure, detailing the purpose of each file, how they interact, and what to edit for specific tasks.

## Project Structure

Here is a tree diagram of the project's architecture:

```
project-root
├── public
│   ├── bits
│   │   ├── badghost
│   │   ├── chaos-pendulum
│   │   ├── ...other games...
│   └── favicon.svg
├── src
│   ├── content
│   │   ├── docs
│   │   │   ├── actor-network-theory.md
│   │   │   ├── ...other docs...
│   ├── pages
│   │   ├── index.astro
│   │   ├── games.astro
│   │   └── docs
│   │       └── [slug].astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── components
│   │   └── Welcome.astro
│   └── lib
│       └── content-utils.ts
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Relationships Between Files

### Dynamic Routing for Docs

```
src/content/docs/*.md
   └── Rendered dynamically by:
       └── src/pages/docs/[slug].astro
           └── Uses Layout:
               └── src/layouts/Layout.astro
```

**Explanation:**
- **`src/pages/docs/[slug].astro`**: Dynamically renders Markdown files from the `src/content/docs` folder. The `[slug]` parameter matches the filename of the Markdown file, allowing for dynamic routing.
- **`src/layouts/Layout.astro`**: Provides a consistent structure for all pages, including a header, footer, and main content area. It ensures that the dynamic content is wrapped in a cohesive design.

**Visual Representation:**
```
Layout.astro
├── Header
├── Main Content
│   └── [slug].astro
│       └── Markdown Content (from src/content/docs)
└── Footer
```

---

### Games Page and Public Assets

```
public/bits/
   ├── badghost/
   ├── chaos-pendulum/
   ├── ...other games...
   └── Linked by:
       └── src/pages/games.astro
           └── Uses Layout:
               └── src/layouts/Layout.astro
```

**Explanation:**
- **`public/bits/`**: Contains the assets and HTML files for interactive games. Each game is stored in its own folder.
- **`src/pages/games.astro`**: Lists all the games available in the `public/bits` folder and provides links to play them.
- **`src/layouts/Layout.astro`**: Ensures the games page has a consistent design with the rest of the site.

**Visual Representation:**
```
Layout.astro
├── Header
├── Main Content
│   └── games.astro
│       └── Links to Games (from public/bits)
└── Footer
```

---

### Homepage

```
src/pages/index.astro
   └── Uses Layout:
       └── src/layouts/Layout.astro
   └── Includes Component:
       └── src/components/Welcome.astro
```

**Explanation:**
- **`src/pages/index.astro`**: The landing page of the site. It introduces the site and provides navigation links to key sections like "Docs" and "Games."
- **`src/components/Welcome.astro`**: A reusable component that displays a hero section with a background image and links to external resources.
- **`src/layouts/Layout.astro`**: Wraps the homepage content in a consistent layout with a header and footer.

**Visual Representation:**
```
Layout.astro
├── Header
├── Main Content
│   └── index.astro
│       └── Welcome.astro (Hero Section)
└── Footer
```

---

### Content Utilities

```
src/lib/content-utils.ts
   └── Fetches and processes Markdown files from:
       └── src/content/docs/
```

**Explanation:**
- **`src/lib/content-utils.ts`**: Contains utility functions for reading and parsing Markdown files. It uses the `gray-matter` library to extract frontmatter metadata and content from the files.
- **`src/content/docs/`**: Stores the Markdown files that are dynamically rendered on the site.

**Visual Representation:**
```
content-utils.ts
└── Reads Markdown Files
    └── src/content/docs/
        ├── actor-network-theory.md
        ├── ...other docs...
```

---

### Frontmatter Date Format

All `date` fields in Markdown frontmatter must use the ISO 8601 format. For example:

```yaml
date: "2025-04-09T00:00:00Z"
```

This ensures compatibility with the content schema and consistent parsing across the project.

---

## Editing Guide

- **To Add a New Page**:
  1. Create a new `.astro` file in the `src/pages` folder.
  2. Use `Layout.astro` for consistent structure.

- **To Add a New Game**:
  1. Add the game files to a new folder in `public/bits`.
  2. Update `src/pages/games.astro` to include a link to the new game.

- **To Add New Documentation**:
  1. Add a new Markdown file in `src/content/docs`.
  2. Access it dynamically via `/docs/<slug>`.

- **To Add a New Component**:
  1. Create a new `.astro` file in the `components` folder.
  2. Import and use the component in pages or layouts as needed.

- **To Add New Content**:
  1. Add a new Markdown file in the `content/docs` folder.
  2. Access it dynamically via `/docs/<slug>`.

- **To Update Global Styles**:
  1. Edit `global.css` to add or modify styles.
  2. Update `tailwind.config.js` for custom Tailwind configurations.

- **To Configure the Project**:
  1. Update `astro.config.mjs` for Astro-specific settings.
  2. Modify `package.json` to add or update dependencies and scripts.

---

## Notes

This document is a starting point for understanding the project structure. As the project evolves, update this file to reflect changes.