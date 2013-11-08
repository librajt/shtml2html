var fs  = require('fs'),
    path = require('path');

var encoding = 'binary';
var ROOT = process.cwd() + '/';
var status = ['', ':D', ':(', ':|'];

var log = function(msg, type) {
    msg =  msg.replace(process.cwd(), '');
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
    console.log(msg);
};

var mkdir = function(dest) {
    var destDirs = dest.split('\\'),
        destDirsLen = destDirs.length,
        destDir = '';

    if (!fs.existsSync(dest)) {
        destDirs.forEach(function(dir, i) {
            if (i < destDirsLen - 1) {
                destDir += dir + '/';
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir);
                    log('[mkdir] ' + path.resolve(destDir) + '');
                }
            }
        });
    }
};

var fixPath = function(src) {
    if (src && src.charAt(src.length - 1) !== '/') src += '/';
    return src;
};


var merge = function(src, dest, wwwroot) {
    var baseSrc = path.dirname(src) + '/', 
        baseDest = path.dirname(dest) + '/', 
        file, 
        incs, result;
    dest = dest.replace(/.shtml$/i, '.html');

    if (fs.existsSync(src)) {
        if (fs.existsSync(dest)) {
            file = fs.readFileSync(dest, encoding);
            result = 2;
        }
        else {
            file = fs.readFileSync(src, encoding), 
            incs = file.match(/<!--#include.+"\s*-->/ig) || [];
            
            incs.forEach(function(inc, i) {
                var incFile = inc.match(/"(.+)"\s*-->/i)[1],
                    replacement, incSrc, incDest;
                
                if (incFile.charAt(0) === '/') {
                    if (wwwroot === undefined) {
                        log('need <--wwwroot> to find file ' + incFile, 3);
                        result = 2;
                        return;
                    }
                    incSrc = path.resolve(wwwroot + incFile);
                    incDest = path.resolve(wwwroot + incFile);
                }
                else {
                    incSrc = path.resolve(baseSrc + incFile);
                    incDest = path.resolve(baseDest + incFile);
                }
                replacement = merge(incSrc, incDest, wwwroot);

                if (replacement === undefined) {
                    result = 2;
                }
                else {
                    result = 1;
                    file = file.replace(inc, replacement);
                }
            });

            mkdir(dest);
            fs.writeFileSync(dest, file, encoding);
            log(dest, result);
        }
    }
    else {
        result = 3;
        log('file ' + src + ' not found', result);
    }

    return file;
};


var shtml2html = function(from, to, wwwroot) {
    from = fixPath(from);
    to = fixPath(to);
    wwwroot = fixPath(wwwroot);

    var files = fs.readdirSync(from);
    files.forEach(function(src, i) {
        if (path.extname(src) !== '.shtml') return;
        fileSrc = path.resolve(ROOT + from + src);
        fileDest = path.resolve(ROOT + to + src);
        if (fs.statSync(fileSrc).isFile()) {
            merge(fileSrc, fileDest, wwwroot);
        }
    });
    log('Done!')
};


module.exports = shtml2html;
