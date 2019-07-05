#!/usr/bin/env node
var versionNumber = require('./package.json');
const fs = require('fs');
var program = require('commander');
var template = require('./templates');
var colors = require('./constants');

program
  .version(versionNumber.version)
  .option('-f, --functionalcomponent', 'creates functional component')
  .option('-d, --deletefolder', 'does NOT wrap files to a folder')
  .parse(process.argv);

function ifStyleNameExistsAdd(styleImport) {
  return styleImport ? template.styleImport(styleImport) : '';
}

function ifDFlagTrueWrapFilesToFolder(componentName) {
  if (program.deletefolder) {
    return './' + componentName + '.js';
  } else {
    fs.mkdirSync(componentName);
    return './' + componentName + '/' + componentName + '.js';
  }
}

function ifDFlagTruePutStyleToFolder(folderName, fileName) {
  if (program.deletefolder) {
    return './' + fileName;
  } else {
    return './' + folderName + '/' + fileName;
  }
}

if (program.args[0]) {
  var componentName = program.args[0];
  var styleName = program.args[1] || null;

  if (!fs.existsSync(componentName)) {
    var path = ifDFlagTrueWrapFilesToFolder(componentName);

    fs.writeFile(
      path,
      program.functionalcomponent
        ? template.functionalComponent(
            componentName,
            ifStyleNameExistsAdd(styleName)
          )
        : template.classComponent(
            componentName,
            ifStyleNameExistsAdd(styleName)
          ),
      err => {
        if (err) return console.log(err);
        console.log(colors.green, 'Component created!');
      }
    );

    if (styleName) {
      var stylePath = ifDFlagTruePutStyleToFolder(componentName, styleName);

      fs.writeFile(stylePath, template.styleTemplate(styleName), err => {
        if (err) return console.log(err);
      });
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
    colors.yellow + colors.green,
    'component name required\n',
    'try: create-component MyComponent'
  );
}
