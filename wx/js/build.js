var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
    type: 'gcc',
    language: 'ECMASCRIPT5',
    fileIn: ['jquery-2.0.3.min.js', 'jquery.bxslider.min.js', 'numberic.js'],
    fileOut: 'all.min.js',
    callback: function(err, min){
        console.log('GCC jquery 2.0');
        console.log(err);
//        console.log(min);
    }
});

// java -jar "D:/Program Files/nodejs/node_modules/node-minify/lib/google_closure_compiler-v20130411.jar" --js="jquery-2.0.3.min.js" --js="jquery.bxslider.min.js" --js="numberic.js" --language_in=ECMASCRIPT5 --js_output_file="all.min.js"