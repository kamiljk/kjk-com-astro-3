# Project Architecture Documentation

This document provides an overview of the Astro project structure, detailing the purpose of each file, how they interact, and what to edit for specific tasks.

## File Structure Overview

```
astro.config.mjs
package.json
README.md
tailwind.config.js
tsconfig.json
public/
	favicon.svg
src/
	assets/
		astro.svg
		background.svg
	components/
		Welcome.astro
	content/
		test.md
	layouts/
		Layout.astro
	lib/
		content-utils.ts
	pages/
		index.astro
		test.astro
	styles/
		global.css
```

## File Descriptions

### Root Files

- **astro.config.mjs**: Configuration file for the Astro framework. Includes integrations like Tailwind CSS.
- **package.json**: Defines project dependencies and scripts for development, building, and previewing.
- **README.md**: Project documentation and setup instructions.
- **tailwind.config.js**: Configuration for Tailwind CSS, specifying content paths and theme extensions.
- **tsconfig.json**: TypeScript configuration file, extending Astro's strict settings.

### Public Folder

- **favicon.svg**: The favicon for the website, displayed in browser tabs.

### `src` Folder

#### Assets

- **astro.svg**: Logo for Astro, used in the `Welcome` component.
- **background.svg**: Background image for the `Welcome` component.

#### Components

- **Welcome.astro**: A reusable component that displays a hero section with links and a background image.

#### Content

- **test.md**: Markdown file for testing content rendering. Can be replaced with actual content files.

#### Layouts

- **Layout.astro**: The main layout file providing the HTML structure for pages. Includes a `<slot />` for injecting page-specific content.

#### Library

- **content-utils.ts**: Utility functions for handling content. Includes `getAllPosts()` to fetch and parse Markdown files from the `content` directory.

#### Pages

- **index.astro**: The homepage of the site. Uses the `Layout` and `Welcome` components.
- **test.astro**: A test page demonstrating Tailwind CSS usage.

#### Styles

- **global.css**: Global styles for the project, importing Tailwind CSS.

## File Interactions

1. **Layouts and Pages**:
   - Pages like `index.astro` and `test.astro` use `Layout.astro` to provide a consistent structure.
   - Components like `Welcome.astro` are included within pages to add reusable UI elements.

2. **Content and Utilities**:
   - Markdown files in the `content` folder are processed by `content-utils.ts` to extract metadata and content.
   - The `getAllPosts()` function can be used to fetch all posts for dynamic rendering.

3. **Styling**:
   - Tailwind CSS is configured in `tailwind.config.js` and imported globally via `global.css`.

## Editing Guide

- **To Add a New Page**:
  1. Create a new `.astro` file in the `pages` folder.
  2. Use `Layout.astro` for consistent structure.

- **To Add a New Component**:
  1. Create a new `.astro` file in the `components` folder.
  2. Import and use the component in pages or layouts as needed.

- **To Add New Content**:
  1. Add a new Markdown file in the `content` folder.
  2. Use `content-utils.ts` to fetch and display the content dynamically.

- **To Update Global Styles**:
  1. Edit `global.css` to add or modify styles.
  2. Update `tailwind.config.js` for custom Tailwind configurations.

- **To Configure the Project**:
  1. Update `astro.config.mjs` for Astro-specific settings.
  2. Modify `package.json` to add or update dependencies and scripts.

## Notes

This document is a starting point for understanding the project structure. As the project evolves, update this file to reflect changes.