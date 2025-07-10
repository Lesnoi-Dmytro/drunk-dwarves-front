import fs from 'fs';
import path from 'path';

export function readFolders(folderPath: string) {
  const content = fs.readdirSync(folderPath);
  return content.filter(
    (element) => !fs.lstatSync(path.join(folderPath, element)).isFile(),
  );
}
