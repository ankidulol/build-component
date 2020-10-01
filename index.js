#!/usr/bin/env node
var versionNumber = require('./package.json');
const fs = require('fs');
var program = require('commander');
var template = require('./templates');
var colors = require('./constants');

program
  .version(versionNumber.version)
  .option('-c, --class-component', 'Creates class component')
  .option('-d, --directory-wrap', 'Wraps files in a folder')
  .option(
    '-s, --styled-component-template',
    'Creates styled-component template'
  )
  .option(
    '-n, --react-native-stylesheet-template',
    'Creates StyleSheet template'
  )
  .parse(process.argv);

function styleExists(styleFile) {
  return styleFile ? template.importStyle(styleFile, program) : '';
}

function wrapFilesInFolder(componentName) {
  if (program.directoryWrap) {
    fs.mkdirSync(componentName);
    return './' + componentName + '/' + componentName + '.js';
  } else {
    return './' + componentName + '.js';
  }
}

function wrapStyleInFolder(folderName, fileName) {
  if (program.directoryWrap) {
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
      program.classComponent
        ? template.classComponent(componentName, styleExists(styleFile))
        : template.functionalComponent(componentName, styleExists(styleFile)),
      err => {
        if (err) return console.log(err);
        console.log(colors.green, 'Component created!');
      }
    );

    if (styleFile) {
      var stylePath = wrapStyleInFolder(componentName, styleFile);

      fs.writeFile(
        stylePath,
        template.styleTemplate(styleFile, program),
        err => {
          if (err) return console.log(err);
        }
      );
    }
  }
} else {
  console.log(
    colors.yellow + colors.green,
    'component name required\n',
    'try: build-component MyComponent'
  );
}
