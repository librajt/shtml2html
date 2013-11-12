shtml2html
==========
[![NPM version](https://badge.fury.io/js/shtml2html.png)](http://badge.fury.io/js/shtml2html)


shtml2html is a HTML parser tool that will make include shtml files inline and save as html files. That is to say, the inline code `<!--#include file="inc/file.shtml"-->` or `<!--#include virtual="/shtml2html/test/inc/file.shtml"-->` will be replaced by the content of file `inc/file.shtml`.
Both single file and files in the entire directory are supported !

Install
----------
Install module with npm:
```
npm install shtml2html -g
```


Usage -- command line
----------
```
shtml2html [options]
```
shtml2html can run without any option, in this condition, the program will scan the current directory and handle the files, then output them to the new temp folder in the current directory with name start `_shtml2html_`.

The available options are:
```
-h, --help                 output usage information
-V, --version              output the version number
-s, --source [value]       optional, default is current directory
-d, --destination [value]  optional, default is a temp directory in the source directory
-w, --wwwroot [value]      optional, only needed when have to find include files refer with absolute path
```

####Examples
l handle files in current directory and output to the `dest` sibling folder:
```
shtml2html -d ../dest
```

l handle files in the `html` sub directory and output to the `dest` folder:
```
shtml2html -s html -d dest
```

l handle files in current directory and output to the `dest` sibling folder, include files are refre with absolute path and the web root path is `D:\wwwroot`:
```
shtml2html -d ../dest -w "D:\\wwwroot\\blog"
```

l handle file `a.shtml` in current directory and output to the `dest` sibling folder:
```
shtml2html -s a.shtml -d ../dest
```

l handle file `a.shtml` in current directory and output to the current directory, save as `b.html`:
```
shtml2html -s a.shtml -d b.html
```

The list typo of path in command line are equal, but be carefule of the `\` and `/`
```
../dest
..\\dest
```

Usage -- nodejs file  // TODO
----------
The best example is the `cli.js` source file in the `src` directory. Also, this is a quick start:
```
var shtml2html = require('shtml2html');
shtml2html(pathFrom, pathTo, pathWwwroot);
```


Release Log
----------
###1.0.2 - 2013.11.12
Support both single file and entire directory.

###1.0.1 - 2013.11.07
Fix Regx. bug.
Add examples in readme file.

###1.0.0 - 2013.11.06
First release version


Links
----------
[http://www.w3.org/Jigsaw/Doc/User/SSI.html](http://www.w3.org/Jigsaw/Doc/User/SSI.html)


