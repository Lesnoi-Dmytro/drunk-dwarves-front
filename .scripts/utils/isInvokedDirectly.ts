import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Call with isInvokedDirectly(import.meta)
export function isInvokedDirectly(meta: ImportMeta): boolean {
  if (meta == null || process.argv[1] == null) {
    return false;
  }

  const scriptPath = createRequire(meta.url).resolve(process.argv[1]);
  const modulePath = fileURLToPath(meta.url);
  return path.extname(scriptPath)
    ? modulePath == scriptPath
    : modulePath.replace(/\.[^.]+$/, '') == scriptPath;
}
