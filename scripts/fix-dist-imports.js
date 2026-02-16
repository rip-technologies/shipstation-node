// scripts/fix-dist-imports.js
// Walks dist and appends .js to local relative import/export specifiers when missing.

import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (e.isFile() && p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');

      // Simple regex: replace import/export from './foo' or '../bar' with './foo.js' unless it already has an extension
      // This covers common cases; you can refine if necessary.
      content = content.replace(
        /((?:import|export)\s+(?:[^'\"]*from\s+)?|from\s+)(['"])(\.[^'\"]+?)(['"])/g,
        (m, lead, q, spec, q2) => {
          // If spec already ends with an extension (.js, .cjs, .mjs, .json, .d.ts), don't change
          if (/\.[a-z0-9]+$/i.test(spec)) return `${lead}${q}${spec}${q2}`;
          // Only handle relative specifiers starting with ./ or ../
          if (!spec.startsWith('./') && !spec.startsWith('../')) return `${lead}${q}${spec}${q2}`;

          // Resolve the spec relative to the current file to check what exists on disk.
          // spec is a POSIX-style relative path like './v2/types' or '../foo/bar'
          const fileDir = path.dirname(p);
          const absSpec = path.resolve(fileDir, spec);

          // If a same-named .js file exists, prefer that (./foo -> ./foo.js)
          if (fs.existsSync(absSpec + '.js')) return `${lead}${q}${spec}.js${q2}`;

          // If the spec resolves to a directory that contains index.js, use ./dir/index.js
          if (fs.existsSync(path.join(absSpec, 'index.js'))) return `${lead}${q}${spec}/${'index.js'}${q2}`;

          // Fallback: leave unchanged (the runtime may resolve via other means)
          return `${lead}${q}${spec}${q2}`;
        }
      );

      fs.writeFileSync(p, content, 'utf8');
    }
  }
};

const distDir = path.resolve(process.cwd(), 'dist');
walk(distDir);
console.log('Fixed relative import specifiers in dist/');
