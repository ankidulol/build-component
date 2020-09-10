#!/usr/bin/env node
var versionNumber = require('./package.json');
const fs = require('fs');
var program = require('commander');
var template = require('./templates');
var colors = require('./constants');

program
  .version(versionNumber.version)
  .option('-f, --functionalcomponent', 'Creates functional component')
  .option('-d, --directorywrap', 'Wraps files in a folder')
  .parse(process.argv);

function styleExists(styleFile) {
  return styleFile ? template.styleImport(styleFile) : '';
}

function wrapFilesInFolder(componentName) {
  if (program.directorywrap) {
    fs.mkdirSync(componentName);
    return './' + componentName + '/' + componentName + '.js';
  } else {
    return './' + componentName + '.js';
  }
}

function wrapStyleInFolder(folderName, fileName) {
  if (program.directorywrap) {
    return './' + folderName + '/' + fileName;
  } else {
    return './' + fileName;
  }
}

if (program.args[0]) {
  var componentName = program.args[0];
  var styleFile = program.args[1] || null;

  if (fs.existsSync(componentName)) {
    console.log(
      'A file or folder with the name ' +
        componentName +
        ' already exists. Try different name'
    );
  } else {
    var path = wrapFilesInFolder(componentName);

    fs.writeFile(
      path,
      program.functionalcomponent
        ? template.functionalComponent(componentName, styleExists(styleFile))
        : template.classComponent(componentName, styleExists(styleFile)),
      err => {
        if (err) return console.log(err);
        console.log(colors.green, 'Component created!');
      }
    );

    if (styleFile) {
      var stylePath = wrapStyleInFolder(componentName, styleFile);

      fs.writeFile(stylePath, template.styleTemplate(styleFile), err => {
        if (err) return console.log(err);
      });
    }
  }
} else {
  console.log(
    colors.yellow + colors.green,
    'component name required\n',
    'try: build-component MyComponent'
  );
}
