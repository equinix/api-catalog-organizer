#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkginfo = require('pkginfo')(module, 'version', 'description');
const logo = require('./lib/logo');

program
    .command('add', 'Add a new query or header parameter to all the endpoints')
    .command('remove', 'Remove an existing parameter from all the endpoints');

//if program was called with no arguments, show help.
if (process.argv.slice(2).length === 0) {
    logo.display(module.exports.description, module.exports.version);
}

program.parse(process.argv);