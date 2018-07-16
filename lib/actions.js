'use strict';

const files = require('./files');
const Spinner = require('./spinner');
const utils = require('./utils');
const YAML = require('yamljs');
const Schema = require('swagger-parser-js');
const chalk = require('chalk');
const sleep = require('system-sleep');

module.exports = {
    extractEndpoints: function (answers) {
        var status = Spinner.create('Let us extract API endpoints, please wait...');
        status.start();
        const inputFilePath = files.getAbsolutePath(answers.inputFilePath);
        const tagToExtract = answers.tagName;
        const shouldAddAuthHeader = answers.addAuthHeader;
        var swaggerJson;
        var partnerSwagger;

        if (files.isYamlFile(inputFilePath)) {
            swaggerJson = YAML.load(inputFilePath);
            partnerSwagger = YAML.load(inputFilePath);
        } else if (files.isJsonFile(inputFilePath)) {
            swaggerJson = require(inputFilePath);
            partnerSwagger = require(inputFilePath);
        }

        const schema = new Schema(swaggerJson);
        var paths = {};
        var operationsWithTags = schema.operationsWithTags()[tagToExtract];
        if (operationsWithTags === undefined) {
            status.stop();
            console.log(chalk.red.bold("Oops.. We couldn't find endpoints with specified tag. Please check your input"));
            return;
        }
        operationsWithTags.forEach(element => {
            var pathWithTag = schema.paths()[element.path];
            utils.filterObject(pathWithTag, tagToExtract);
            var params = pathWithTag['parameters'] || [];
            if (shouldAddAuthHeader && paths[element.path] === undefined) {
                params.push({
                    '$ref': '#/parameters/authHeader'
                });
            }
            pathWithTag['parameters'] = params;
            paths[element.path] = pathWithTag;
        });
        partnerSwagger['paths'] = paths;
        var parameters = partnerSwagger['parameters'] || {};
        if (shouldAddAuthHeader) {
            parameters['authHeader'] = {
                "name": "Authorization",
                "in": "header",
                "description": "Specify the Playground Access token with prefix 'Bearer '.",
                "type": "string",
                "minimum": 1,
                "required": true
            };
        }

        partnerSwagger['parameters'] = parameters;
        var outputFileName = answers.outputFile;
        if (!files.isYamlFile(outputFileName) && !files.isJsonFile(outputFileName)) {
            outputFileName = outputFileName + files.extname(inputFilePath);
        }

        var outputContent = files.isJsonFile(outputFileName) ? JSON.stringify(partnerSwagger, null, 2) : YAML.stringify(partnerSwagger, 10, 2);
        var outputFilePath = files.joinPath(process.cwd(), 'public', outputFileName);
        files.ensureDirectoryExistence(outputFilePath);
        files.writeToFile(outputFilePath, outputContent, function () {
            sleep(2000);
            status.stop();
            console.log("");
            console.log(chalk.green.bold(outputFileName + ' is created successfully!'));
        })
    }
};

