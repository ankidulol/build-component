#!/usr/bin/env node
const fs = require('fs');
var program = require('commander');
var template = require('./templates');

program
	.version('0.1.0')
	.option('-n, --componentname', 'react component name')
	.option('-f, --functionalcomponent', 'creates functional component')
	.option('-s, --style', 'creates seperate style file')
	.action(componentName => {
		if (program.componentname && typeof componentName === 'string') {
			if (!fs.existsSync(componentName)) {
				fs.mkdirSync(componentName);

				fs.writeFile(
					'./' + componentName + '/' + componentName + '.js',
					!program.functionalcomponent
						? template.classComponent(
								componentName,
								program.style ? template.styleImport() : ''
						  )
						: template.functionalComponent(
								componentName,
								program.style ? template.styleImport() : ''
						  ),
					err => {
						if (err) return console.log(err);
						console.log('\x1b[32m%s\x1b[0m', 'Component created!');
					}
				);

				if (program.style) {
					fs.writeFile(
						'./' + componentName + '/styles.js',
						template.styleTemplate(),
						err => {
							if (err) return console.log(err);
						}
					);
				}
			} else {
				console.log(
					'A file or folder with the name ' +
						componentName +
						' already exists. Try different name'
				);
			}
		} else {
			console.log(
				'\x1b[33m%s\x1b[0m\x1b[32m%s\x1b[0m',
				'component name required\n',
				'try: create-component -n MyComponent'
			);
		}
	})
	.parse(process.argv);




