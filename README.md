shtml2html
==========
shtml2html is a HTML parser tool that will make include shtml files inline and save as html files.

INSTALL
----------
Install module with npm:
```
npm install shtml2html -g
```


USAGE -- command line
----------
```
shtml2html [options]
```
shtml2html can run without any option, in this condition, the program will scan the current directory and handle the files, then output them to the new temp folder in the current directory, named `_shtml2html_temp`.

The available options are:
    -h, --help                 output usage information
    -v, --version              output the version number
    -s, --source [value]       default is current directory
    -d, --destination [value]  default is a temp directory in the source directory
    -w, --wwwroot [value]      wwwroot directory, help to find include files refer in the absolute path

USAGE -- nodejs file  // TODO
----------
The best example is the `cli.js` source file in the `src` directory. Also, this is a quick start:
```
var shtml2html = require('shtml2html');
shtml2html(pathFrom, pathTo, pathWwwroot);
```


RELEASE LOG
----------
###2013.11.6
First release version 1.0.0, runable.





