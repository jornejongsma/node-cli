#!/usr/bin/env -S NODE_PATH='C:/Users/jorne/.js/node_modules' ESM_OPTIONS='{cache:false,await:true}' node -r esm -r globals
colors.setTheme({ bright: ["white", "bold"] });

// See: https://github.com/flatiron/prompt
async function getValidName(name) {
  const pattern = /^([A-Za-z]{1}(\w*)-)(\w+-)*\w+$/;
  if (pattern.test(name)) return name;
  if (!name) console.log(`Please enter a name for your component!`);
  else console.log(`${name.bright} is not a valid name!`);

  return await new Promise((resolve) => {
    const schema = {
      properties: {
        name: {
          description: `${"Name".bright} of the component`,
          pattern,
          message: `It has to have a '-' and start with a letter: example: ${
            "my-component".bright
          }`,
          required: true,
        },
      },
    };
    prompt.message = "";
    prompt.start();
    prompt.get(schema, (err, result) => resolve(result.name));
  });
}

async function isValidLocation() {
  if (fs.existsSync("components")) return true;
  const pattern = /^(y|yes|n|no)$/;

  return await new Promise((resolve) => {
    const schema = {
      properties: {
        location: {
          description: `(Y)es or (N)o`,
          pattern,
          message: `Answer with (Y)es or (N)o`,
          required: true,
        },
      },
    };
    prompt.message = "No components folder found! Do you want to create one?";
    prompt.start();
    prompt.get(schema, (err, result) => {
      const res = result.location.toLowerCase();
      if (res === "y" || res === "yes") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });

}

const template = (name) => {
  const { className, componentName, fileName } = name
   
  return {
    js: `import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('${componentName}')
export class ${className} extends LitElement {
  render() {
    return html\`<div>Hello, ${componentName}</div>\`;

  }
}
`,
    index: `export * from './${fileName}';`,
    root: `export * from "./components/${fileName}";`,
    story: `import { html } from 'lit-html';
import './${fileName}';
    
export default {
  title: 'JJ-Components'
};

export const ${className} = () => html\`<${componentName}></${componentName}>\`;
    
    `,
    test: `import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://localhost:6006/iframe.html?args=&id=jj-components--${className.toLowerCase()}&viewMode=story');
});

test.describe('JJ-Components, ${componentName}', () => {
  test('Renders ${componentName}', async ({ page }) => {
  


  });
})
`
  };
};

class Name {
  constructor(name) {
    this._name = name;
  }
  get fileName() {
    return this._name.toLowerCase();
  }

  get className() {
    return this._name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  get componentName() {
    return this._name.toLowerCase();
  }
}

async function generateLit(name) {
  if( await isValidLocation() === false ) {
    console.log(`Exiting...`);
    return;
  }

  name = await getValidName(name);
  name = new Name(name);
  const {js, index, root, story, test} = template(name);
  const {fileName, componentName} = name;

  if(fs.existsSync(`${fileName}.ts`) || fs.existsSync(`${fileName}.js`) || fs.existsSync(`components/${fileName}`)) {
    return console.log(`Component with name ${name.fileName.bold} already exists!`)
  }
  fs.writeFileSync(`${fileName}.ts`, root)
  !fs.existsSync("components") && fs.mkdirSync("components");
  fs.mkdirSync(`components/${fileName}`);
  fs.writeFileSync(`components/${fileName}/index.ts`, index);
  fs.writeFileSync(`components/${fileName}/${fileName}.ts`, js);
  fs.writeFileSync(`components/${fileName}/${fileName}.stories.ts`, story);
  fs.writeFileSync(`components/${fileName}/${fileName}.test.ts`, test)

  console.log(gradient.retro(`Generated a lit component: ${componentName}`));
}

export default generateLit;