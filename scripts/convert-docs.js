import { promises as fs } from 'fs';
import { marked } from 'marked';
import { join, dirname } from 'path';

const template = (content, title = 'Job Tasker Documentation') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        pre {
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow: auto;
        }
        code {
            font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 85%;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background: #f6f8fa;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .nav {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="/docs/index.html">Home</a> |
        <a href="/docs/api/modules.html">API</a> |
        <a href="/docs/api/classes.html">Classes</a> |
        <a href="/docs/api/interfaces.html">Interfaces</a>
    </div>
    ${content}
</body>
</html>
`;

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function convertMarkdownFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await convertMarkdownFiles(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const markdown = await fs.readFile(fullPath, 'utf-8');
        const content = marked(markdown);
        const htmlFile = fullPath.replace('.md', '.html');
        const html = template(
          content,
          `Job Tasker - ${entry.name.replace('.md', '')}`
        );

        await ensureDir(dirname(htmlFile));
        await fs.writeFile(htmlFile, html);
        console.log(`Converted ${entry.name} to ${htmlFile}`);
      }
    }
  } catch (error) {
    console.error(`Error converting files in ${dir}:`, error);
  }
}

// Create main documentation structure
async function createMainDocs() {
  const mainDocs = [
    {
      path: 'docs/index.html',
      title: 'Job Tasker Documentation',
      content: `
                <h1>Job Tasker Documentation</h1>
                <p>Welcome to the Job Tasker documentation. This guide will help you understand and use the Job Tasker application effectively.</p>
                
                <h2>Documentation Sections</h2>
                <ul>
                    <li><a href="api/index.html">API Documentation</a> - Technical documentation for developers</li>
                    <li><a href="api/modules.html">Modules</a> - Overview of all modules</li>
                    <li><a href="api/classes.html">Classes</a> - All classes reference</li>
                    <li><a href="api/interfaces.html">Interfaces</a> - TypeScript interfaces</li>
                </ul>

                <h2>Key Features</h2>
                <ul>
                    <li>Project Management</li>
                    <li>Task Organization</li>
                    <li>User Authentication</li>
                    <li>Real-time Updates</li>
                </ul>
            `,
    },
  ];

  for (const doc of mainDocs) {
    await ensureDir(dirname(doc.path));
    await fs.writeFile(doc.path, template(doc.content, doc.title));
    console.log(`Created ${doc.path}`);
  }
}

async function main() {
  // Convert API documentation
  await convertMarkdownFiles('docs/api');

  // Create main documentation pages
  await createMainDocs();
}

main().catch(console.error);
