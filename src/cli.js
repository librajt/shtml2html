#!/usr/bin/env node

var program = require('commander'),
    shtml2html = require('./shtml2html');

program
    .version('0.0.2')
    .usage('shtml2html [options]')
    .option('-s, --source [value]', 'optional, default is current directory')
    .option('-d, --destination [value]', 'optional, default is a temp directory in the source directory')
    .option('-w, --wwwroot [value]', 'optional, only needed when have to find include files refer with absolute path')
    .parse(process.argv);

var source = program.source || './',
    destination = program.destination || './_shtml2html_temp/',
    wwwroot = program.wwwroot;

shtml2html(source, destination, wwwroot);
