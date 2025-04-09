# Project Architecture Documentation

<<<<<<< HEAD
This document provides an overview of the Astro project structure, detailing the purpose of each file, how they interact, and what to edit for specific tasks.

## Project Structure

Here is a tree diagram of the project's architecture:
=======
This document provides a comprehensive overview of the Astro project structure, detailing the purpose of each file, how they interact, and what to edit for specific tasks. It is organized to guide developers logically through the project's components, schema, and workflows.

---

## Introduction

This project is built using Astro, a modern static site generator. The architecture is designed to dynamically render Markdown content, host interactive games, and provide a consistent user experience through reusable components and global styles. This document explains the project's structure, schema, and interactions to help developers understand and extend the system.

---

## Project Structure

Here is a high-level view of the project's directory structure:
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

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

<<<<<<< HEAD
=======
## Schema Overview

The project uses a structured frontmatter schema to define metadata for content files. This schema is defined in `frontmatter.json` and ensures consistency across all Markdown files.

### Schema Definition

| Field Name         | Type       | Description                                                                 |
|--------------------|------------|-----------------------------------------------------------------------------|
| `title`            | `string`   | The title of the content.                                                  |
| `pubDate`          | `datetime` | The publication date of the content.                                       |
| `created`          | `datetime` | The creation date of the content.                                          |
| `last_tended`      | `datetime` | The last date the content was updated or reviewed.                         |
| `epistemic_status` | `string`   | Describes the epistemic status (e.g., draft, final) of the content.        |
| `scale`            | `string`   | A descriptor for the scale of the content.                                 |
| `maturity`         | `string`   | Indicates the maturity level of the content.                               |
| `source`           | `string`   | The source or origin of the content.                                       |
| `fmContentType`    | `string`   | Specifies the content type for frontmatter processing.                     |

### Example Frontmatter Block

```yaml
---
title: "Actor-Network Theory"
pubDate: "2023-03-21T00:00:00Z"
created: "2023-01-15T00:00:00Z"
last_tended: "2025-04-01T00:00:00Z"
epistemic_status: "final"
scale: "conceptual"
maturity: "stable"
source: "academic papers"
fmContentType: "default"
---
```

---

## Astro Interactions with the Schema

Astro plays a critical role in interpreting and utilizing the schema defined in the frontmatter. Below is a detailed explanation of how Astro interacts with the schema and processes frontmatter metadata.

### How Astro Reads the Schema

1. **Dynamic Routing**:
   - Astro uses the `[slug].astro` file in `src/pages/docs/` to dynamically route and render Markdown files from `src/content/docs/`.
   - The `[slug]` parameter in the file name corresponds to the filename of the Markdown file, allowing Astro to dynamically match and render the appropriate content.

2. **Frontmatter Parsing**:
   - Astro automatically parses the frontmatter metadata in Markdown files using its built-in support for YAML frontmatter.
   - The parsed metadata is made available as a `frontmatter` object in the Astro component, which can be accessed and used to render dynamic content.

3. **Content Utilities**:
   - The `src/lib/content-utils.ts` file provides additional processing for frontmatter metadata, such as extracting specific fields or transforming data for use in components.

4. **Publication Date (`pubDate`)**:
   - The `pubDate` field is used in `src/pages/docs/[slug].astro` to display the publication date of the content.
   - Example usage in `[slug].astro`:
     ```astro
     <p>Published on: {new Date(data.pubDate).toLocaleDateString()}</p>
     ```

### How Astro Uses the Schema

1. **Rendering Metadata**:
   - Metadata fields defined in the frontmatter (e.g., `title`, `created`, `epistemic_status`) are rendered dynamically in the `src/pages/docs/[slug].astro` file.

2. **Dynamic Content Injection**:
   - Astro uses the `content` field from the frontmatter to inject the main body of the Markdown file into the page.

3. **Global Styling**:
   - Astro ensures that all dynamically rendered pages use the global styles defined in `src/styles/global.css`.

---

>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)
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
<<<<<<< HEAD
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
=======
- **Markdown Files**: Contain the content for the documentation pages.
- **Dynamic Page**: Dynamically renders Markdown content based on the filename.
- **Layout**: Wraps the dynamically rendered content in a consistent structure.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

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
<<<<<<< HEAD
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
=======
- **Game Assets**: Static assets for games are stored in `public/bits/`.
- **Games Page**: Lists all the games and provides links to play them.
- **Layout**: Ensures the games page has a consistent design.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

### Homepage

```
src/pages/index.astro
   └── Uses Layout:
       └── src/layouts/Layout.astro
   └── Includes Component:
       └── src/components/Welcome.astro
```

**Explanation:**
<<<<<<< HEAD
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
=======
- **Homepage**: The landing page of the site, introducing the site and providing navigation links.
- **Welcome Component**: Displays a hero section with a background image and links to external resources.
- **Layout**: Wraps the homepage content in a consistent layout.

---

## Interaction Between Components

### Dynamic Content Flow
1. **Markdown Files**: Content is written in Markdown files located in `src/content/docs/`.
2. **Content Utilities**: The `content-utils.ts` file processes these Markdown files, extracting metadata and content.
3. **Dynamic Pages**: The processed content is rendered dynamically by `src/pages/docs/[slug].astro`.
4. **Layout**: The `Layout.astro` file wraps the dynamic pages, ensuring a consistent design.
5. **Global Styles**: The `global.css` file provides consistent styling across all pages.

### Static Assets Flow
1. **Game Assets**: Static assets for games are stored in `public/bits/`.
2. **Games Page**: The `games.astro` file links to these assets, allowing users to access the games.
3. **Layout**: The `Layout.astro` file ensures the games page has a consistent design.
4. **Global Styles**: The `global.css` file provides consistent styling for the games page.

---

## Parity Across Systems

In this project, certain elements require parity across multiple systems to ensure consistency and proper functionality. Below are the key areas where parity is essential:

### 1. Frontmatter Schema

- **Files Involved**:
  - `frontmatter.json`: Defines the schema for frontmatter fields.
  - Markdown files in `src/content/docs/`: Contain frontmatter metadata adhering to the schema.
  - `src/content.config.mjs`: Validates and processes frontmatter fields like `pubDate`.
  - `src/pages/docs/[slug].astro`: Dynamically renders content using frontmatter fields.

- **Reason for Parity**:
  - The schema defined in `frontmatter.json` must align with the fields used in Markdown files and the components that render them. For example, if a field like `pubDate` is added to the schema, it must also be supported in `content.config.mjs` and used in `[slug].astro`.

- **How to Maintain Parity**:
  1. Update `frontmatter.json` when adding or modifying fields.
  2. Ensure all Markdown files include the required fields.
  3. Update `content.config.mjs` and any components or pages that use the new or modified fields.

### 2. Global Styles

- **Files Involved**:
  - `src/styles/global.css`: Defines global styles for the project.
  - `src/layouts/Layout.astro`: Applies global styles to all pages.

- **Reason for Parity**:
  - Global styles must be consistently applied across all pages to ensure a cohesive design.

- **How to Maintain Parity**:
  1. Update `global.css` for any new styles.
  2. Ensure `Layout.astro` includes the updated styles.

### 3. Component Usage

- **Files Involved**:
  - `src/components/Welcome.astro`: A reusable component used on the homepage.
  - `src/pages/index.astro`: Includes the `Welcome` component.

- **Reason for Parity**:
  - Components must be used consistently to avoid duplication and ensure maintainability.

- **How to Maintain Parity**:
  1. Use components like `Welcome.astro` wherever applicable.
  2. Update the component itself to propagate changes across all pages where it is used.

### 4. Game Assets and Pages

- **Files Involved**:
  - `public/bits/`: Contains assets and HTML files for games.
  - `src/pages/games.astro`: Lists and links to games in `public/bits/`.

- **Reason for Parity**:
  - The list of games in `games.astro` must match the folders and files in `public/bits/`.

- **How to Maintain Parity**:
  1. Add new game assets to `public/bits/`.
  2. Update `games.astro` to include links to the new games.

### 5. Configuration Files

- **Files Involved**:
  - `astro.config.mjs`: Configures Astro-specific settings.
  - `tailwind.config.js`: Configures Tailwind CSS settings.

- **Reason for Parity**:
  - Configuration files must align with the project's structure and dependencies.

- **How to Maintain Parity**:
  1. Update configuration files when adding new dependencies or changing project settings.
  2. Ensure all team members use the same configuration to avoid inconsistencies.

---

## Compliance Enforcement

This section outlines the rules and logic for ensuring compliance with the project's schema and standards. These rules apply to all Markdown files, configuration files, and project components.

### 1. Frontmatter Schema Compliance

#### Rules:
- All Markdown files in `src/content/docs/` must include the following frontmatter fields:
  - `title`: A string representing the title of the content.
  - `pubDate`: A valid ISO 8601 datetime string indicating the publication date.
  - `created`: A valid ISO 8601 datetime string indicating the creation date.
  - `last_tended`: A valid ISO 8601 datetime string indicating the last review or update date.
  - `epistemic_status`: A string describing the epistemic status (e.g., "Initial capture", "Final").
  - `scale`: A string describing the scale of the content (e.g., "micro", "macro").
  - `maturity`: A string indicating the maturity level (e.g., "seed", "stable").
  - `source`: A string specifying the source or origin of the content.
  - `fmContentType`: A string specifying the content type (e.g., "definition", "article").

#### Enforcement Logic:
- Use a validation script in `src/lib/content-utils.ts` to check for missing or invalid fields.
- Example validation logic:
  ```typescript
  export function validateFrontmatter(frontmatter) {
    const requiredFields = [
      'title',
      'pubDate',
      'created',
      'last_tended',
      'epistemic_status',
      'scale',
      'maturity',
      'source',
      'fmContentType',
    ];
    const missingFields = requiredFields.filter(field => !frontmatter[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required frontmatter fields: ${missingFields.join(', ')}`);
    }
    ['pubDate', 'created', 'last_tended'].forEach(field => {
      if (isNaN(Date.parse(frontmatter[field]))) {
        throw new Error(`Invalid datetime format for field: ${field}`);
      }
    });
  }
  ```

---

### 2. File Naming and Structure Compliance

#### Rules:
- All Markdown files in `src/content/docs/` must use kebab-case for filenames.
- Filenames must match the `title` field in the frontmatter, converted to kebab-case.
- Files must be placed in the appropriate directory based on their content type.

#### Enforcement Logic:
- Use a script to check for filename and directory mismatches.
- Example logic:
  ```typescript
  import path from 'path';

  export function validateFilename(filePath, frontmatter) {
    const expectedFilename = `${frontmatter.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    const actualFilename = path.basename(filePath);
    if (expectedFilename !== actualFilename) {
      throw new Error(`Filename mismatch: expected "${expectedFilename}", got "${actualFilename}"`);
    }
  }
  ```

---

### 3. Global Styling Compliance

#### Rules:
- All pages must use the global styles defined in `src/styles/global.css`.
- Custom styles must be added to `global.css` or scoped to specific components.

#### Enforcement Logic:
- Use a linter to ensure all `.astro` files import `global.css`.
- Example rule for ESLint:
  ```json
  {
    "rules": {
      "import/no-unresolved": [
        "error",
        {
          "ignore": ["src/styles/global.css"]
        }
      ]
    }
  }
  ```

---

### 4. Component Usage Compliance

#### Rules:
- Reusable components must be placed in `src/components/`.
- Components must follow PascalCase naming conventions.
- Components must be imported and used consistently across pages.

#### Enforcement Logic:
- Use a linter to enforce naming conventions and consistent imports.
- Example rule for ESLint:
  ```json
  {
    "rules": {
      "react/jsx-pascal-case": "error"
    }
  }
  ```

---

### 5. Configuration Compliance

#### Rules:
- Configuration files (`astro.config.mjs`, `tailwind.config.js`, etc.) must align with the project's structure and dependencies.
- Changes to configuration files must be documented in `ARCHITECTURE.md`.

#### Enforcement Logic:
- Use a pre-commit hook to validate configuration files.
- Example using Husky:
  ```bash
  #!/bin/sh
  npx eslint . --ext .js,.mjs
  ```

---

### 6. Content Review Workflow

#### Rules:
- All content must be reviewed and updated periodically.
- The `last_tended` field in the frontmatter must be updated after each review.

#### Enforcement Logic:
- Use a script to flag content that has not been reviewed within a specified timeframe.
- Example logic:
  ```typescript
  export function checkReviewDate(frontmatter) {
    const lastTended = new Date(frontmatter.last_tended);
    const now = new Date();
    const daysSinceLastTended = (now - lastTended) / (1000 * 60 * 60 * 24);
    if (daysSinceLastTended > 365) {
      console.warn(`Content "${frontmatter.title}" has not been reviewed in over a year.`);
    }
  }
  ```

---

### 7. Testing and Validation

#### Rules:
- All validation logic must be tested using unit tests.
- Tests must cover edge cases, such as missing fields or invalid datetime formats.

#### Enforcement Logic:
- Use Jest or a similar testing framework to write and run tests.
- Example test:
  ```javascript
  import { validateFrontmatter } from '../src/lib/content-utils';

  test('validateFrontmatter throws error for missing fields', () => {
    const frontmatter = { title: 'Test Title' }; // Missing required fields
    expect(() => validateFrontmatter(frontmatter)).toThrow(/Missing required frontmatter fields/);
  });
  ```
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

---

## Editing Guide

- **To Add a New Page**:
  1. Create a new `.astro` file in the `src/pages` folder.
  2. Use `Layout.astro` for consistent structure.
<<<<<<< HEAD
=======
  3. Update `global.css` if new styles are needed.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

- **To Add a New Game**:
  1. Add the game files to a new folder in `public/bits`.
  2. Update `src/pages/games.astro` to include a link to the new game.
<<<<<<< HEAD
=======
  3. Ensure the game page uses `Layout.astro` for consistent design.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

- **To Add New Documentation**:
  1. Add a new Markdown file in `src/content/docs`.
  2. Access it dynamically via `/docs/<slug>`.
<<<<<<< HEAD
=======
  3. Update `content-utils.ts` if new metadata fields are added.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

- **To Add a New Component**:
  1. Create a new `.astro` file in the `components` folder.
  2. Import and use the component in pages or layouts as needed.
<<<<<<< HEAD

- **To Add New Content**:
  1. Add a new Markdown file in the `content/docs` folder.
  2. Access it dynamically via `/docs/<slug>`.
=======
  3. Update `global.css` if new styles are needed.
>>>>>>> 477fb62 (Add initial definitions for various concepts related to liminality and social dynamics)

- **To Update Global Styles**:
  1. Edit `global.css` to add or modify styles.
  2. Update `tailwind.config.js` for custom Tailwind configurations.

- **To Configure the Project**:
  1. Update `astro.config.mjs` for Astro-specific settings.
  2. Modify `package.json` to add or update dependencies and scripts.

---

## Notes

This document is a starting point for understanding the project structure. As the project evolves, update this file to reflect changes.