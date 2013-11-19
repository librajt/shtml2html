#!/usr/bin/env node

var program = require('commander'),
    shtml2html = require('./shtml2html');

program
    .version('1.0.5')
    .usage('shtml2html [options]')
    .option('-s, --source [value]', 'optional, default is current folder')
    .option('-d, --destination [value]', 'optional, default is a temp folder in the source folder')
    .option('-w, --wwwroot [value]', 'optional, only required when include files are quoted with absolute path')
    .parse(process.argv);

var source = program.source,
    destination = program.destination,
    wwwroot = program.wwwroot;

var info = [':D', ':(', ':|'];
var log = function(msg, type) {
    if (!type) type = 'success';
    switch (type) {
        case 'success':
            msg = '\x1B[32m' + '[' + info[0] + '] ' + msg + '\x1B[39m';
            break;
        case 'fail':
            msg = '\x1B[31m' + '[' + info[1] + '] ' + msg + '\x1B[39m';
            break;
        case 'warn':
            msg = '\x1B[33m' + '[' + info[2] + '] ' + msg + '\x1B[39m';
            break;
    }
    console.log(msg.replace(/\\/g, '/'));
};
var callback = function(msgs) {
    if (msgs.length > 0) {
        msgs.forEach(function(o) {
            log(o.msg, o.type)
        });
    }
    else {
        log('Done! No new file created.')
    }
};

shtml2html(source, destination, wwwroot, callback);

