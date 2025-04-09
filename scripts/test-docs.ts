import fs from 'fs';
import path from 'path';

const docsFolder = '/Users/kamil/Desktop/kjk-com-astro-3/src/content/docs';

// Required frontmatter fields
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

// Validate frontmatter fields
function validateFrontmatter(frontmatter: Record<string, any>, filePath: string) {
  const missingFields = requiredFields.filter((field) => !frontmatter[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `File "${filePath}" is missing required frontmatter fields: ${missingFields.join(', ')}`
    );
  }

  ['pubDate', 'created', 'last_tended'].forEach((field) => {
    if (isNaN(Date.parse(frontmatter[field]))) {
      throw new Error(`File "${filePath}" has an invalid datetime format for field: ${field}`);
    }
  });
}

// Validate filename compliance
function validateFilename(filePath: string, frontmatter: Record<string, any>) {
  const expectedFilename = `${frontmatter.title.toLowerCase().replace(/\s+/g, '-')}.md`;
  const actualFilename = path.basename(filePath);
  if (expectedFilename !== actualFilename) {
    throw new Error(
      `Filename mismatch in "${filePath}": expected "${expectedFilename}", got "${actualFilename}"`
    );
  }
}

// Main function to test all files
function testDocs() {
  const files = fs.readdirSync(docsFolder);

  files.forEach((file) => {
    const filePath = path.join(docsFolder, file);
    if (path.extname(file) === '.md') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

      if (!frontmatterMatch) {
        throw new Error(`File "${filePath}" is missing frontmatter.`);
      }

      const frontmatter = JSON.parse(
        JSON.stringify(require('js-yaml').load(frontmatterMatch[1]))
      );

      try {
        validateFrontmatter(frontmatter, filePath);
        validateFilename(filePath, frontmatter);
        console.log(`✅ File "${file}" passed all tests.`);
      } catch (error) {
        console.error(`❌ ${error.message}`);
      }
    }
  });
}

// Run the tests
testDocs();
