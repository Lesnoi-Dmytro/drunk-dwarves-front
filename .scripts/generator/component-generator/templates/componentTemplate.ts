import { ComponentOptions, type ComponentOptionsType } from '../index.ts';

export const componentTemplate = (
  name: string,
  options: ComponentOptionsType[],
) => {
  let template = '';

  const hasProps = options.includes(ComponentOptions.PROPS);
  const hasStyles = options.includes(ComponentOptions.STYLES);
  const memo = options.includes(ComponentOptions.MEMO);

  if (memo) {
    template += `import {memo} from "react";\n\n`;
  }
  if (hasStyles) {
    template += `import styles from "./${name}.module.scss";\n\n`;
  }
  if (hasProps) {
    template += `interface Props {\n}\n\n`;
  }

  template += `const ${name}: React.FC${options.includes(ComponentOptions.PROPS) ? '<Props>' : ''} = ${memo ? 'memo(' : ''}(${options.includes(ComponentOptions.PROPS) ? '{}: Props' : ''}) => {\n\t\n\n`;
  template += `\treturn <div${hasStyles ? ' className={styles.container}' : ''}></div>\n}${memo ? ')' : ''};\n\n`;

  if (memo) {
    template += `${name}.displayName = '${name}'\n\n`;
  }

  template += `export default ${name};`;

  return template;
};
