import inquirer from 'inquirer';
import path from 'path';
import { isInvokedDirectly } from '../../utils/isInvokedDirectly.ts';
import { createComponent } from './utils/createComponent.ts';
import { readFolders } from './utils/readFolders.ts';

export const ComponentOptions = {
  PROPS: 'Props',
  STYLES: 'Styles',
  MEMO: 'Memo',
} as const;

export type ComponentOptionsType = (typeof ComponentOptions)[keyof typeof ComponentOptions];

export const ElementTypes = {
  PAGE: 'Page',
  COMPONENT: 'Component',
} as const;

export async function generateElement() {
  const { type, elementName } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Element type:',
      name: 'type',
      choices: Object.entries(ElementTypes).map(([name, value]) => ({ name, value })),
    },
    {
      type: 'input',
      message: 'Element name:',
      name: 'elementName',
    },
  ]);

  if (!/^[A-Z]/.test(elementName)) {
    console.log('Element name should start with an upper case letter');
    return;
  }

  const checkedOptions: ComponentOptionsType[] = [ComponentOptions.STYLES];
  if (type === ElementTypes.COMPONENT) {
    checkedOptions.unshift(ComponentOptions.PROPS);
  }

  const { options } = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Options:',
      name: 'options',
      choices: Object.values(ComponentOptions).map((option) => ({
        name: option,
        value: option,
        checked: checkedOptions.includes(option),
      })),
    },
  ]);

  const rootDir = path.resolve(path.dirname('../'));
  let shownPath =
    type === ElementTypes.PAGE ? path.join('src', 'pages') : path.join('src', 'components');
  let folderPath = path.join(rootDir, shownPath);

  let choice: string;
  do {
    const folders = readFolders(folderPath);
    if (!folders.length) {
      break;
    }

    const { pathPart } = await inquirer.prompt([
      {
        type: 'list',
        message: `Element folder: ${shownPath}`,
        name: 'pathPart',
        choices: [
          { name: '[Create element]', value: '' },
          ...folders.map((folder) => ({ name: folder, value: folder })),
        ],
      },
    ]);

    shownPath = path.join(shownPath, pathPart);
    folderPath = path.join(folderPath, pathPart);
    choice = pathPart;
  } while (choice);

  shownPath = path.join(shownPath, elementName);
  folderPath = path.join(folderPath, elementName);

  console.log('Element path:', shownPath);
  createComponent(folderPath, elementName, options);
}

if (isInvokedDirectly(import.meta)) {
  generateElement();
}
