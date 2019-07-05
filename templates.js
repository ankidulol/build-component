module.exports = {
  classComponent: (componentName, styleImport) => `//Components
import React, { Component } from 'react';
${styleImport}
export default class ${componentName} extends Component {
    render() {
        return (

        );
    }
}`,

  functionalComponent: (componentName, styleImport) => `// Components
import React from 'react';
${styleImport}
function ${componentName} () { 
    return (

    );
}

export default ${componentName};
`,

  styleTemplate: styleName => {
    if (/.css/.test(styleName))
      return `.wrapper {

}`;
    else if (/.js/.test(styleName))
      return `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {

	}
});

`;
    else return ' ';
  },

  styleImport: styleName => {
    if (/.js/.test(styleName))
      return `
// Styles
import { styles } from './${styleName}';
`;
    else
      return `
// Styles
import './${styleName}
`;
  }
};
