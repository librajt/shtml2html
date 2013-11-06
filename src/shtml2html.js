var fs  = require('fs'),
    path = require('path');

var encoding = 'binary';
var ROOT = process.cwd() + '/';

var err = function(msg) {
    console.log(['\x1B[31m' , msg, '\x1B[39m'].join(''));
};
var log = function(msg) {
    console.log(['\x1B[32m' , msg, '\x1B[39m'].join(''));
};
var warn = function(msg) {
    console.log(['\x1B[33m' , msg, '\x1B[39m'].join(''));
};


// 递归建立目录
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


var merge = function(src, dest) {
    var baseSrc = path.dirname(src) + '/', 
        baseDest = path.dirname(dest) + '/', 
        file = '', 
        incs;
    dest = dest.replace(/.shtml$/i, '.html');

    if (fs.existsSync(src)) {
        if (fs.existsSync(dest)) {
            file = fs.readFileSync(dest, encoding);
        }
        else {
            file = fs.readFileSync(src, encoding), 
            incs = file.match(/<!--#include.+"-->/ig) || [];
            
            incs.forEach(function(inc, i) {
                var incFile = inc.match(/"(.+)"-->/i)[1],
                    replacement, incSrc, incDest;
                
                if (incFile.charAt(0) === '/' && wwwroot !== undefined) {
                    warn('[merge] web root path needed to find file ' + incFile);
                    return;
                }
                else {
                    incSrc = path.resolve(baseSrc + incFile);
                    incDest = path.resolve(baseDest + incFile);
                }
                replacement = merge(incSrc, incDest);
                file = file.replace(inc, replacement);
            });

            mkdir(dest);
            fs.writeFileSync(dest, file, encoding);
            log('[merge] ' + dest)
        }
    }
    else {
        err('[merge] file ' + src + ' not found');
    }

    return file;
};


var shtml2html = function(from, to) {
    var files = fs.readdirSync(from);
    files.forEach(function(src, i) {
        fileSrc = path.resolve(ROOT + from + src);
        fileDest = path.resolve(ROOT + to + src);
        if (fs.statSync(fileSrc).isFile()) {
            merge(fileSrc, fileDest);
        }
    });
};


module.exports = shtml2html;
