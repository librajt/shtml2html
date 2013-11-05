/*
 * 
 * node shtml2html -h 使用帮助
 * 
 * 依赖 node module: commander
 * npm install commander
 */

// 模块依赖
var program = require('commander'),
    fs  = require('fs'),
    path = require('path');

var ROOT = __dirname + '/';

program
    .version('0.0.1')
    .usage('node shtml2html <"dir1" [,"dir2" [,"dir3",[...]]]>')
    .option('-r', '--root [path]', '服务器根目录')
    .parse(process.argv);

var dirs = process.argv[2].split(',');

var warn = function(msg) {
    console.log(['\x1B[33m' , msg, '\x1B[39m'].join(''));
}
var log = function(msg) {
    console.log(['\x1B[32m' , msg, '\x1B[39m'].join(''));
}
var err = function(msg) {
    console.log(['\x1B[31m' , msg, '\x1B[39m'].join(''));
}

var rmdir = (function() {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);
        }
    }
    function inner(path, dirs) {
        var arr = fs.readdirSync(path),
            i, el;
        for (i = 0; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }
    return function(dir) {
        var dirs = [];
        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);
            }
        } catch (e) {
        }
        log('[rmdir] ' + dir);
    };
})();

// 递归建立目录
var mkdir = function(dest) {
    var destDirs = dest.split('/'),
        destDirsLen = destDirs.length,
        destDir = '';

    log('[mkdir] ' + dest);
    destDirs.forEach(function(dir, i) {
        if (i < destDirsLen - 1) {
            destDir += dir + '/';
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir);
                log('  ' + destDir + '');
            }
        }
    });
};

// filters 为用“|”分隔的扩展名列表，不带“.”，扩展名为 filters 列表中者通过复制
// 若 filters 列表以“!”开头，则非列表中者通过复制
var copyFile = function(src, dest, filters, encode) {
    var canCopy = true, encode = encode || 'binary', fileExt;
    
    if (fs.statSync(src).isDirectory()) {
        err('[copyFile] ' + src + ' is a Directory, use copyDir() instead');
        return;
    }
    
    fileExt = path.extname(src);
    if (filters) {
        canCopy = (typeof filters === 'string' ? new RegExp(filters, 'i') : filters).test(fileExt);
        if(filters.indexOf('!|') !== -1) canCopy = !canCopy;
    }

    mkdir(dest);
    if (canCopy) {
        fs.writeFileSync(dest, fs.readFileSync(src, encode), encode);
        log('[copyFile] from [' + src + '] to [' + dest + ']');
    }
};

var copyDir = function(src, dest, filters, encode) {
    var files, encode = encode || 'binary';
    if (src.charAt(src.length - 1) !== '/') src += '/';
    if (dest.charAt(dest.length - 1) !== '/') dest += '/';
    
    if (!fs.statSync(src).isDirectory()) {
        err('[copyDir] ' + src + ' is not a Directory');
        return;
    }
    mkdir(dest);
    files = fs.readdirSync(src);
    files.forEach(function(file) {
        if (fs.statSync(src + file).isDirectory()) {
            copyDir(src + file + '/', dest + file + '/', filters, encode);
        } else {
            copyFile(src + file, dest + file, filters, encode);
        }
    });
    log('[copyDir] from [' + src + '] to [' + dest + ']');
};

var merge = function(src) {
    var file = fs.readFileSync(src, 'utf-8'), 
        basePath = path.dirname(src) + '/', 
        baseName = path.basename(src, '.shtml'), 
        incs, 
        dest = basePath + baseName + '.html';
    
    incs = file.match(/<!--#include\s.*"-->/ig) || [];
    incs.forEach(function(inc, i) {
        var incSrc = inc.match(/"(\w.*)"-->/i)[1], replacement;
        if (incSrc.charAt(0) !== '/') incSrc = basePath + incSrc;
        
        if (fs.existsSync(dest)) replacement = fs.readFileSync(incSrc, 'utf-8');
        else replacement = merge(incSrc);
        
        file = file.replace(inc, replacement);
    });
    
    fs.writeFileSync(dest, file, 'utf-8');
    return file;
};




var handle = function(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function(src, i) {
        src = ROOT + dir + src;
        if (fs.statSync(src).isFile()) {
            merge(src);
        }
    });
};


for(var i= 0, j = dirs.length; i < j; i++) {
    if (dirs[i].charAt(dirs[i].length - 1) !== '/') dirs[i] += '/';
    handle(dirs[i]);
}





























