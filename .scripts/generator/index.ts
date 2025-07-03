import inquirer from 'inquirer';
import { generateComponent } from './component-generator/index.ts';

const GeneratorOptions = {
  COMPONENT: 'component',
  PAGE: 'page',
};

async function main() {
  const { generatorOption } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Element to generate',
      name: 'generatorOption',
      choices: [
        ...Object.entries(GeneratorOptions).map(([name, value]) => ({
          name,
          value,
        })),
      ],
    },
  ]);

  switch (generatorOption) {
    case GeneratorOptions.COMPONENT:
      await generateComponent();
      break;
    case GeneratorOptions.PAGE:
      await generateComponent();
      break;
  }
}

main();
