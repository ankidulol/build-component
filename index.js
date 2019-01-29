#!/usr/bin/env node
var versionNumber = require('./package.json');
const fs = require('fs');
var program = require('commander');
var template = require('./templates');

program
	.version(versionNumber.version)
	.option('-n, --componentname', 'react component name')
	.option('-f, --functionalcomponent', 'creates functional component')
	.option('-s, --style', 'creates seperate style file')
	.option('-d, --deletefolder', 'Does not create folder')
	.action(componentName => {
		if (program.componentname && typeof componentName === 'string') {
			if (!fs.existsSync(componentName)) {

				var path;

				if(!program.deletefolder) {
					fs.mkdirSync(componentName);
					path = './' + componentName + '/' + componentName + '.js';					
				} else {
					path = './' + componentName + '.js'						
				}

				fs.writeFile(
					path,
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
					var stylePath;

					if(!program.deletefolder) {
						stylePath = './' + componentName + '/styles.js';					
					} else {
						stylePath = './styles.js';						
					}

					fs.writeFile(
						stylePath,
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




