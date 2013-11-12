shtml2html
==========
[![NPM version](https://badge.fury.io/js/shtml2html.png)](http://badge.fury.io/js/shtml2html)


shtml2html is a HTML parser tool that will make include shtml files inline and save as html files. 

That is to say, the code snipe list below will be replaced by the content of file `file.shtml`:
```
<!--#include file="inc/file.shtml"-->
<!--#include virtual="/test/inc/file.shtml"-->
```

Both **single file** and **files in the entire folder** are supported !



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
shtml2html can run without any option, in this condition, the program will scan the current folder and process the files, then output them to the new temp folder in the current folder with name start with `_shtml2html_`.

The available options are:
```
-h, --help                 output usage information
-V, --version              output the version
-s, --source [value]       optional, default is current folder
-d, --destination [value]  optional, default is a temp folder in the source folder
-w, --wwwroot [value]      optional, only required when include files quote with absolute path
```


####Examples
1. process files in current folder and output to the `dest/` sibling folder:
```
shtml2html -d ../dest
```

1. process files in the `html` sub folder and output to the `dest/` sub folder:
```
shtml2html -s html -d dest
```

1. process files in current folder and output to the `dest/` sibling folder, include files are quote with absolute path and the web root path is `D:\wwwroot`:
```
shtml2html -d ../dest -w "D:\\wwwroot\\blog"
```

1. process file `a.shtml` in current folder and output to the `dest/` sibling folder, save as its original name:
```
shtml2html -s a.shtml -d ../dest
```

1. process file `a.shtml` in current folder and output to the current folder, save as `b.html`:
```
shtml2html -s a.shtml -d b.html
```

The list typo of path in command line are equal, but be carefule of the `\` and `/`
```
../dest
..\\dest
```



Usage -- nodejs file
----------
The best example is the `cli.js` source file in the `src` folder. Also, this is a quick start:
```
var shtml2html = require('shtml2html');
shtml2html(pathFrom, pathTo, pathWwwroot);
```



Release Log
----------
- ####1.0.2
2013.11.12
Support both single file and the entire folder.

- ####1.0.1
2013.11.07
Fix Regx. bug.
Add examples in readme file.

- ####1.0.0
2013.11.06
First release version



Links
----------
[http://www.w3.org/Jigsaw/Doc/User/SSI.html](http://www.w3.org/Jigsaw/Doc/User/SSI.html)


