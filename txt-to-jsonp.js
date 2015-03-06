/*
 * Convert the original full set of english words found here:
 * https://code.google.com/p/dotnetperls-controls/downloads/detail?name=enable1.txt
 * (we renamed it to words-all.txt) into a jsonp file that contains an valid json array
 * of the list. We use jsonp so that this code can be run locally as well as hosted 
 * in a browser to show the running algorithm as it searches for optimal alphabet sets
 *
 * NOTE: This doesn't full work, you still need to manually delete the extra comma
 * on the last element at the bottom of the file and add the ']);' closing
 * characters. For some reason the on('end', ...) is never called. Too lazy to
 * fix as I already have what I need.
 *
 * NOTE: Also there is a weird bug where the last s of the last words gets dropped
 * so add an 's' to the second/final 'zyzzyva'
 */ 

var lazy = require("lazy"),
    fs   = require("fs");

// Create a write stream for our final jsonP file

var jsonpFD = fs.openSync('./words-all.jsonp', 'w+');

// First wrap the values in a jsonp style function
fs.writeSync(jsonpFD, 'loadWords([\n');

var lazyInstance = new lazy(fs.createReadStream('./words-all.txt'))
      .lines
      .forEach(function(line){
        var str = line.toString().slice(0,-1);
        console.log(str);
        fs.writeSync(jsonpFD, '  "' + str + '",\n');
      });

// Listen for the end of the stream and add the enclosing paranthesis of
// the jsonp wrapped function
lazyInstance.on('end',function(){
  console.log('why you no reach here!?!');
  jsonpStream.end(']);');
  process.exit(0);
})