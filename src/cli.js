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
    path = require('path'),
    shtml2html = require('./shtml2html');


program
    .version('0.0.1')
    .usage('node shtml2html [<"source dir">] [<"destination dir">] [options]')
    //.option('-s', '--source [path]', '源目录。当前目录可输入“ "./" ”（单角双引号标识，等价于空白 "./" == ""）')
    //.option('-d', '--destination [path]', '目标目录')
    //.option('-w', '--wwwroot [path]', '服务器根目录')
    //.option('-e, --encoding [value]', '编码格式')
    .parse(process.argv);

var source = './',  // current dir
    destination = './',
    wwwroot = program.wwwroot,
    encoding = program.encoding || 'binary';
if (process.argv[2]) source = process.argv[2];
if (process.argv[3]) destination = process.argv[3];

/**
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

// filters 为用“|”分隔的扩展名列表，不带“.”，扩展名为 filters 列表中者通过复制
// 若 filters 列表以“!”开头，则非列表中者通过复制
var copyFile = function(src, dest, filters, encode) {
    var canCopy = true, encode = encode || encoding, fileExt;
    
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
    var files, encode = encode || encoding;
    src = fixPath(src);
    dest = fixPath(dest);
    
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
*/

var fixPath = function(src) {
    if (src.charAt(src.length - 1) !== '/') src += '/';
    return src;
};

source = fixPath(source);
destination = fixPath(destination);
shtml2html(source, destination);





























