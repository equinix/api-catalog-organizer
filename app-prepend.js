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
    actions.prependEndpoints(answers);
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
        default: 'public-api-swagger',
        validate: function (value) {
            return true;
        }
    }, {
        name: 'prependText',
        type: 'input',
        message: 'Enter the text to prepend to API end points:',
        default: '/v1'
    }];
    inquirer.prompt(questions).then(done);
}