import fs from 'fs';
import path from 'path';
import { ComponentOptions, type ComponentOptionsType } from '../index.ts';
import { componentTemplate } from '../templates/componentTemplate.ts';
import { stylesTemplate } from '../templates/stylesTemplate.ts';

function cleanUp(componentPath: string, name: string) {
  if (!fs.existsSync(componentPath)) {
    return;
  }

  console.log('Starting cleaning up');

  const componentName = path.join(componentPath, name);
  if (fs.existsSync(componentName)) {
    fs.unlinkSync(componentName);
    console.log(`Component removed from path: ${componentName}`);
  }

  const stylesName = path.join(componentPath, name);
  if (fs.existsSync(componentName)) {
    fs.unlinkSync(componentName);
  }

  const files = fs.readdirSync(componentPath);
  if (!files.length) {
    fs.rmdirSync(componentPath);
  }

  console.log('Clean up completed');
}

export function createComponent(
  folderPath: string,
  name: string,
  options: ComponentOptionsType[],
) {
  try {
    const componentName = path.join(folderPath, name.concat('.tsx'));
    if (fs.existsSync(folderPath) && fs.existsSync(componentName)) {
      console.log(
        `Component could not be created: ${componentName} is already created`,
      );
      return;
    }

    fs.mkdirSync(folderPath);

    const component = componentTemplate(name, options);
    fs.writeFileSync(componentName, component);
    console.log('Component created');

    if (options.includes(ComponentOptions.STYLES)) {
      const stylesName = path.join(folderPath, name.concat('.module.scss'));
      const styles = stylesTemplate();
      fs.writeFileSync(stylesName, styles);
      console.log('Styles created');
    }
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Could not create component:', err.message);
    cleanUp(folderPath, name);
  }
}
