#!/usr/bin/env node

'use strict';

var program = require('commander');
var pkginfo = require('pkginfo')(module, 'version', 'description');
var logo = require('./lib/logo');

program
    .version(module.exports.version)
    .command('extract', 'extract API endpoints from a Swagger document using a tag')
    .command('param', 'allows to add/remove a parameter (header or query). use "add" and "remove" sub commands');


//if program was called with no arguments, show help.
if (process.argv.slice(2).length === 0) {
    logo.display(module.exports.description, module.exports.version);
}

program.parse(process.argv);
