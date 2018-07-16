'use strict';

var chalk = require('chalk');
var figlet = require('figlet');

module.exports = {
    display: function (description, version) {
        console.log("");
        console.log(
            chalk.cyan.bold(
                figlet.textSync('API', {
                    font: 'Ghost',
                    horizontalLayout: 'fitted',
                    verticalLayout: 'fitted'
                })
            )
        );
        console.log(
            chalk.green.bold(
                figlet.textSync('Organizer', {
                    horizontalLayout: 'default',
                    verticalLayout: 'default'
                })
            )
        );
        console.log("");
        console.log(chalk.magenta.bold(description));
        console.log(chalk.green(chalk.gray.bold("Version: ") + version));
        console.log("");
    }
};
