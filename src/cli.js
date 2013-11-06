#!/usr/bin/env node

var program = require('commander'),
    shtml2html = require('./shtml2html');

program
    .version('0.0.2')
    .usage('shtml2html [options]')
    .option('-s, --source [value]', 'default is current directory')
    .option('-d, --destination [value]', 'default is a temp directory in the source directory')
    .option('-w, --wwwroot [value]', 'wwwroot directory, help to find include files refer in the absolute path')
    .parse(process.argv);

var source = program.source || './',
    destination = program.destination || './_shtml2html_temp/',
    wwwroot = program.wwwroot;

shtml2html(source, destination, wwwroot);
