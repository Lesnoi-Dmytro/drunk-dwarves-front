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

export type ComponentOptionsType =
  (typeof ComponentOptions)[keyof typeof ComponentOptions];

const checkedOptions: ComponentOptionsType[] = [
  ComponentOptions.PROPS,
  ComponentOptions.STYLES,
];

export async function generateComponent() {
  const { componentName } = await inquirer.prompt([
    {
      type: 'input',
      message: 'Component name:',
      name: 'componentName',
    },
  ]);

  if (!/^[A-Z]/.test(componentName)) {
    console.log('Component should start with an upper case letter');
    return;
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
  let shownPath = path.join('src', 'components');
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
        message: `Component folder: ${shownPath}`,
        name: 'pathPart',
        choices: [
          { name: '[Create component]', value: '' },
          ...folders.map((folder) => ({ name: folder, value: folder })),
        ],
      },
    ]);

    shownPath = path.join(shownPath, pathPart);
    folderPath = path.join(folderPath, pathPart);
    choice = pathPart;
  } while (choice);

  shownPath = path.join(shownPath, componentName);
  folderPath = path.join(folderPath, componentName);

  console.log('Component path:', shownPath);
  createComponent(folderPath, componentName, options);
}

if (isInvokedDirectly(import.meta)) {
  generateComponent();
}
