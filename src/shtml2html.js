var fs  = require('fs'),
    path = require('path');

var encoding = 'binary';
var ROOT = process.cwd() + '/';
var status = ['', ':D', ':(', ':|'];
var buffer = null;

var log = function(msg, type) {
    //msg =  msg.replace(process.cwd(), '');
    if (!type) type = 1;
    switch (type) {
        case 1:
            msg = '\x1B[32m' + '[' + status[type] + '] ' + msg + '\x1B[39m';
            break;
        case 2:
            msg = '\x1B[31m' + '[' + status[type] + '] ' + msg + '\x1B[39m';
            break;
        case 3:
            msg = '\x1B[33m' + '[' + status[type] + '] ' + msg + '\x1B[39m';
            break;
    }
    console.log(msg.replace(/\\/g, '/'));
};

var mkdir = function(dest) {
    var destDirs = dest.split(/[\\/]/),
        destDirsLen = destDirs.length,
        destDir = '';

    if (!fs.existsSync(dest)) {
        destDirs.forEach(function(dir, i) {
            if (i < destDirsLen - 1) {
                destDir += dir + '/';
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir);
                    log('[mkdir] ' + destDir + '');
                }
            }
        });
    }
};

var fixPath = function(src) {
    if (src && src.charAt(src.length - 1) !== '/') src += '/';
    return src;
};


var merge = function(src, dest, wwwroot, save) {
    var baseSrc = path.dirname(src) + '/', 
        baseDest = path.dirname(dest) + '/', 
        file, incs, result;
    dest = dest.replace(/.shtml$/i, '.html');

    if (fs.existsSync(src)) {
        // if (fs.existsSync(dest)) {
        //     file = fs.readFileSync(dest, encoding);
        if (buffer[src]) {
            file = buffer[src];
            result = 2;
        }
        else {
            file = fs.readFileSync(src, encoding);

            incs = file.match(/<!--#include.+"\s*-->/ig) || [];
            incs.forEach(function(inc, i) {
                var incFile = inc.match(/"(.+)"\s*-->/i)[1], replacement, incSrc, incDest;
                
                if (incFile.charAt(0) === '/') {
                    if (wwwroot === undefined) {
                        log('need <--wwwroot> to find file ' + incFile, 3);
                        result = 2;
                        return;
                    }
                    incSrc = path.resolve(wwwroot + incFile);
                    incDest = baseDest + incSrc.replace(process.cwd() + '\\', '');
                }
                else {
                    incSrc = baseSrc + incFile;
                    incDest = baseDest + incFile;
                }
                replacement = merge(incSrc, incDest, wwwroot, false);

                if (replacement === undefined) {
                    result = 2;
                }
                else {
                    result = 1;
                    file = file.replace(inc, replacement);
                }
            });

            if (save) {
                mkdir(dest);
                fs.writeFileSync(dest, file, encoding);
                log(dest, result);
            }
            else {
                buffer[dest] = file;
            }
        }
    }
    else {
        result = 3;
        log('file ' + src + ' not found', result);

    }

    return file;
};


var shtml2html = function(from, to, wwwroot) {
    from = from || './';
    to = to || './_shtml2html_' + (+new Date()).toString().substring(6) + '/';
    wwwroot = fixPath(wwwroot);
    buffer = {};

    if (fs.statSync(from).isFile()) {
        if (!path.extname(to)) {
            to = fixPath(to) + from;
        }
        merge(from, to, wwwroot, true);
    }
    else if (fs.statSync(from).isDirectory()) {
        from = fixPath(from);
        to = fixPath(to);

        var files = fs.readdirSync(from);
        files.forEach(function(src, i) {
            fileSrc = from + src;
            fileDest = to + src;
            if (fs.statSync(fileSrc).isFile()) {
                if (path.extname(src) !== '.shtml') return;
                merge(fileSrc, fileDest, wwwroot, true);
            }
        });
    }
    log('Done!');
    buffer = null;
};


module.exports = shtml2html;
