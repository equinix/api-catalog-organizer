'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

module.exports = {
    getCurrentDirectoryBase: function () {
        return path.basename(process.cwd());
    },

    directoryExists: function (filePath) {
        if (!fs.existsSync(filePath)) return false;
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    fileExists: function (filePath) {
        return fs.existsSync(filePath);
    },

    getAbsolutePath: function (filePath) {
        return path.resolve(path.normalize(filePath));
    },

    writeToFile: function (filePath, content, callback) {
        fs.writeFile(filePath, content, 'utf8', callback);
    },

    ensureDirectoryExistence: ensureDirectoryExistence,

    isJsonFile: function (filePath) {
        var fileExtension = path.extname(filePath);
        return utils.isEqualsIgnoreCase('.json', fileExtension);
    },

    isYamlFile: function (filePath) {
        var fileExtension = path.extname(filePath);
        return utils.isEqualsIgnoreCase('.yml', fileExtension) || utils.isEqualsIgnoreCase('.yaml', fileExtension);
    },

    extname: function (filePath) {
        return path.extname(filePath);
    },

    joinPath: function(...paths) {
        return path.join(...paths);
    }
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    var status = fs.mkdirSync(dirname);
};