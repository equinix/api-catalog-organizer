#!/usr/bin/env node

'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const pkginfo = require('pkginfo')(module, 'version', 'description');
const logo = require('./lib/logo');
const files = require('./lib/files');
const actions = require('./lib/actions');

program.parse(process.argv);

logo.display(module.exports.description, module.exports.version);

promptUserForConfigurations(function (answers) {
    actions.addParameter(answers);
});

function promptUserForConfigurations(done) {
    var questions = [{
        name: 'inputFilePath',
        type: 'input',
        message: 'Enter the path for your Swagger API document:',
        validate: function (value) {
            if (value.length) {
                var scriptLocation = files.getAbsolutePath(value);
                if (files.fileExists(scriptLocation)) {
                    if (files.isJsonFile(scriptLocation) || files.isYamlFile(scriptLocation)) {
                        return true;
                    }
                }
            }
            return chalk.red.bold("Oops.. We couldn't find a valid JSON/YAML file at this path. Please re-enter the correct path");
        }
    }, {
        name: 'outputFile',
        type: 'input',
        message: 'Enter a name for the output file:',
        default: 'public-api-swagger'
    }, {
        name: 'paramName',
        type: 'input',
        message: 'Enter the name for the parameter:',
        validate: function (value) {
            if (value.length) {
                return true;
            }
            return chalk.red.bold("Please enter a valid name");
        }
    }, {
        name: 'paramDescription',
        type: 'input',
        message: 'Enter a description for the parameter:'
    }, {
        name: 'inType',
        type: 'list',
        choices: ['query', 'header'],
        default: 'header',
        message: 'Select the type of the paramter:'
    },
    {
        name: 'dataType',
        type: 'list',
        choices: ['integer', 'number', 'string', 'boolean'],
        default: 2,
        message: 'Select the data type for the paramter:'
    },
    {
        name: 'required',
        type: 'confirm',
        message: 'Is this a mandatory paramter?'
    }];
    inquirer.prompt(questions).then(done);
}


