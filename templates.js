module.exports = {
	classComponent: (componentName, styleImport) => `//Components
import React, { Component } from 'react';
import { View } from 'react-native';
${styleImport}
export default class ${componentName} extends Component {
	render() {
		return (
			<View>
			</View>
		);
	}
}`,

	functionalComponent: (componentName, styleImport) => `// Components
import React from 'react';
import { View } from 'react-native';
${styleImport}
const ${componentName} = props => (
	<View>
	</View>
);

export default ${componentName};
`,

	styleTemplate: () => `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		//...
	}
});

`,

	styleImport: () => `
// Styles
import { styles } from './styles';
`
};
