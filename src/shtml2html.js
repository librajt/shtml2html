var fs  = require('fs'),
    path = require('path');

var encoding = 'binary';
var ROOT = process.cwd() + '/';

var err = function(msg) {
    console.log(['\x1B[31m' , msg.replace(process.cwd(), ''), '\x1B[39m'].join(''));
};
var log = function(msg) {
    console.log(['\x1B[32m' , msg.replace(process.cwd(), ''), '\x1B[39m'].join(''));
};
var warn = function(msg) {
    console.log(['\x1B[33m' , msg.replace(process.cwd(), ''), '\x1B[39m'].join(''));
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

var status = ['success', 'already merged', 'fail'];

var merge = function(src, dest, wwwroot) {
    var baseSrc = path.dirname(src) + '/', 
        baseDest = path.dirname(dest) + '/', 
        file = '', 
        incs, result = 0;
    dest = dest.replace(/.shtml$/i, '.html');

    if (fs.existsSync(src)) {
        if (fs.existsSync(dest)) {
            file = fs.readFileSync(dest, encoding);
            result = 1;
            log('[' + status[result] + '] ' + src);
        }
        else {
            file = fs.readFileSync(src, encoding), 
            incs = file.match(/<!--#include.+"-->/ig) || [];
            
            incs.forEach(function(inc, i) {
                var incFile = inc.match(/"(.+)"-->/i)[1],
                    replacement, incSrc, incDest;
                
                if (incFile.charAt(0) === '/') {
                    if (wwwroot === undefined) {
                        result = 2;
                        warn('--wwwroot needed to find file ' + incFile);
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
                file = file.replace(inc, replacement);
            });

            mkdir(dest);
            fs.writeFileSync(dest, file, encoding);
            log('[' + status[result] + '] ' + dest);
        }
    }
    else {
        result = 2;
        err('[' + status[result] + '] file ' + src + ' not found');
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
};


module.exports = shtml2html;
