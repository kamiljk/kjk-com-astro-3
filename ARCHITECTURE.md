# Project Architecture Documentation

This document provides an overview of the Astro project structure, focusing on clear visuals and concise explanations to aid understanding.

## Project Structure

```
project-root
├── public
│   ├── bits
│   │   ├── badghost
│   │   ├── chaos-pendulum
│   │   ├── chaos-pendulum-graph
│   │   ├── electro-ball
│   │   ├── particleparty
│   │   ├── tritunnel
│   └── favicon.svg
├── src
│   ├── content
│   │   ├── docs
│   │   │   ├── temporality.md
│   │   │   ├── ...other docs...
│   ├── pages
│   │   ├── index.astro
│   │   ├── games.astro
│   │   └── docs
│   │       └── [slug].astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── components
│   │   ├── Welcome.astro
│   │   └── TestSpecimen.astro
│   └── lib
│       └── content-utils.ts
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── ARCHITECTURE.md
```

---

## Visual Relationships Between Components

### Dynamic Routing for Docs

```
[slug].astro
   ├── Reads Markdown from:
   │      src/content/docs/*.md
   ├── Uses Layout:
   │      Layout.astro
   │         ├── Header
   │         ├── Main Content
   │         │      └── Markdown Content
   │         └── Footer
```

**Explanation:**
- **`[slug].astro`** dynamically renders Markdown files from `src/content/docs`. The `[slug]` matches the filename.
- **`Layout.astro`** provides a consistent structure with a header, main content, and footer.

---

### Games Page and Public Assets

```
games.astro
   ├── Links to Games in:
   │      public/bits/
   │         ├── badghost/
   │         ├── chaos-pendulum/
   │         ├── chaos-pendulum-graph/
   │         ├── electro-ball/
   │         ├── particleparty/
   │         └── tritunnel/
   ├── Uses Layout:
   │      Layout.astro
   │         ├── Header
   │         ├── Main Content
   │         │      └── Game Links
   │         └── Footer
```

**Explanation:**
- **`games.astro`** lists games stored in `public/bits` and links to their respective folders.
- **`Layout.astro`** ensures a consistent design for the games page.

---

### Homepage

```
index.astro
   ├── Uses Layout:
   │      Layout.astro
   │         ├── Header
   │         ├── Main Content
   │         │      └── Welcome.astro (Hero Section)
   │         └── Footer
```

**Explanation:**
- **`index.astro`** is the landing page, introducing the site and linking to key sections.
- **`Welcome.astro`** is a reusable component for the hero section.
- **`Layout.astro`** wraps the homepage content in a consistent layout.

---

### Test Specimen Component

```
TestSpecimen.astro
   ├── Temporary CSS Testing
   └── Visual Debugging
```

**Explanation:**
- **`TestSpecimen.astro`** is a temporary component for testing CSS styles and debugging layouts.

---

### Content Utilities

```
content-utils.ts
   ├── Reads Markdown Files from:
   │      src/content/docs/
   │         ├── temporality.md
   │         ├── ...other docs...
```

**Explanation:**
- **`content-utils.ts`** processes Markdown files from `src/content/docs` using utilities like `gray-matter`.

---

### Frontmatter Date Format

```
All `date` fields in Markdown frontmatter must use the ISO 8601 format.
Example:

date: "2025-04-09T00:00:00Z"
```

**Explanation:**
- ISO 8601 ensures consistent date parsing across the project.

---

### CSS Approach

The project uses a combination of global and component-specific styles to ensure flexibility and maintainability. Below is an overview of the CSS approach:

#### Global Styles

```
styles/global.scss
```
- **Purpose**: Contains global styles that apply across the entire site, such as:
  - Base typography (e.g., font sizes, line heights)
  - Color variables and themes
  - Utility classes for spacing, alignment, and visibility
- **Framework**: Tailwind CSS is configured in `tailwind.config.js` for utility-first styling. Customizations are added in `global.scss`.

#### Component-Specific Styles

```
src/components/
   ├── Welcome.astro
   ├── TestSpecimen.astro
```
- **Purpose**: Each component can include scoped styles for unique visual elements.
- **Example**: `TestSpecimen.astro` includes temporary styles for testing and debugging CSS layouts.

#### Tailwind CSS Configuration

```
tailwind.config.js
```
- **Purpose**: Configures Tailwind CSS for the project.
- **Customizations**:
  - Extends the default theme with custom colors, fonts, and spacing.
  - Enables JIT (Just-In-Time) mode for faster builds and smaller CSS bundles.

#### CSS Workflow

1. **Global Changes**:
   - Edit `styles/global.scss` for site-wide updates.
   - Update `tailwind.config.js` for new utility classes or theme extensions.

2. **Component-Specific Changes**:
   - Add scoped styles directly within `.astro` components using `<style>` tags.
   - Use Tailwind utility classes for rapid prototyping and consistent design.

3. **Testing and Debugging**:
   - Use `TestSpecimen.astro` to experiment with new styles or debug layout issues.

**Example:** Adding a new color to the theme:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        customBlue: '#1E40AF',
      },
    },
  },
};
```

**Example:** Using the new color in a component:
```html
<div class="bg-customBlue text-white p-4">
  This is a custom blue background.
</div>
```

---

## Editing Guide

```
To Add a New Page:
1. Create a new `.astro` file in the `src/pages` folder.
2. Use `Layout.astro` for consistent structure.

To Add a New Game:
1. Add the game files to a new folder in `public/bits`.
2. Update `games.astro` to include a link to the new game.

To Add New Documentation:
1. Add a new Markdown file in `src/content/docs`.
2. Access it dynamically via `/docs/<slug>`.

To Add a New Component:
1. Create a new `.astro` file in the `components` folder.
2. Import and use the component in pages or layouts as needed.

To Update Global Styles:
1. Edit `global.scss` to add or modify styles.
2. Update `tailwind.config.js` for custom Tailwind configurations.
```

---

## Notes

This document is designed with a focus on visual clarity and concise explanations to support neurodivergent readers. Update it as the project evolves.