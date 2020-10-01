module.exports = {
  classComponent: (componentName, importStyle) => `//Components
import React, { Component } from 'react';
${importStyle}
export default class ${componentName} extends Component {
    render() {
        return (

        );
    }
}`,

  functionalComponent: (componentName, importStyle) => `// Components
import React from 'react';
${importStyle}
function ${componentName} () { 
    return (

    );
}

export default ${componentName};
`,

  styleTemplate: (styleName, program) => {
    const cssTemplate = `.wrapper {

}`;
    const styleSheetTemplate = `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {

    }
});

`;

    const styledComponentTemplate = `import styled from 'styled-components';

const Wrapper = styled.div\`\`;

export { Wrapper };
`;

    if (/.css/.test(styleName)) {
      return cssTemplate;
    } else if (/.js/.test(styleName)) {
      if (program.styledComponentTemplate) {
        return styledComponentTemplate;
      } else if (program.reactNativeStylesheetTemplate) {
        return styleSheetTemplate;
      } else {
        return ' ';
      }
    } else {
      return ' ';
    }
  },

  importStyle: (styleName, program) => {
    const styleDefaultImport = `
// Styles
import { } from './${styleName}';
`;
    const styleSheetImport = `
// Styles
import { styles } from './${styleName}';
`;

    const styledComponentImport = `
// Styles
import { Wrapper } from './${styleName}';
`;

    const cssImport = `
// Styles
import './${styleName}';
`;

    if (/.js/.test(styleName)) {
      if (program.styledComponentTemplate) {
        return styledComponentImport;
      } else if (program.reactNativeStylesheetTemplate) {
        return styleSheetImport;
      } else {
        return styleDefaultImport;
      }
    } else {
      return cssImport;
    }
  }
};
