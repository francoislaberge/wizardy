/*
 * Creates a new file words-culled.json that removes any words that we know can't be index mirrors.
 * Culled words and the culling reason is printed to the console, then finally statistics of culling
 * show up at the bottom.
 */ 

var words = require('./words-all.json'),
    culledWords = [],
    fs = require('fs'),
    oddLengthedCulled = [],
    mirroredCharCulled = [],
    contradictoryPairsCulled = [];

// Go through the words are remove words that match any words that we easily know
// can't have the property. 
for(var i = 0; i<words.length; i++){

  // Odd length words don't count as having the property so we remove them.
  if(words[i].length%2) {
    oddLengthedCulled.push(words[i]);
    continue;
  }

  // Words that have any letter located at their mirrored position need to be culled
  var halfLength = Math.floor(words[i].length/2),
      charactersWereMirrored = false;
  for(var c = 0; c<halfLength; c++){
    if( words[i][c] === words[i][words[i].length-1-c]) {
      mirroredCharCulled.push(words[i]);

      // We need to set a flag because we want to break out of the outterloop too
      charactersWereMirrored = true;
      break;
    }
  }  
  if(charactersWereMirrored){
    continue;
  }

  // Remove any inconsistencies relating to contradictory duplicates. Examples:
  // aabc (Can't work because a can't have both 'a' and 'c' as opposites)
  // bcaa (Can't work because 'b' and 'c' can't both be mirrors of a)
  // adab ( 'a'/'b' and 'a'/'d' both can't be pairs)
    // This 
  var alphaChar = {},
      hash,
      foundContradictoryPair = false;
  for(var c = 0; c<halfLength; c++){
    hash = [words[i][c], words[i][words[i].length-1-c]].join('');

    // Does it exist already?
    if( typeof alphaChar[hash[0]] === 'undefined'){
      // Add it, the key is the first char, the value is the second char
      alphaChar[hash[0]] = hash[1];
    } 
    // We found a hash that starts with the same letter but doesn't end with the same
    // letter. This is a conradiction
    else if(alphaChar[hash[0]] !== hash[1] ){
      foundContradictoryPair = true;
      contradictoryPairsCulled.push(words[i]);
      break;
    } 
  }
  if(foundContradictoryPair){
    continue;
  } 

  culledWords.push(words[i]);
}

console.log('\n------------------------------------------------Rejected Words------------------------------------------------\n');
console.log('\n--------------------------Odd Lengthed--------------------------\n');
console.log(oddLengthedCulled.join(' '));
console.log('\n--------------------------Mirrored Character--------------------------\n');
console.log(mirroredCharCulled.join(' '));
console.log('\n--------------------------Contradictory Pairs Culled--------------------------\n');
console.log(contradictoryPairsCulled.join(' '));

console.log('\n------------------------------------------------Word/Culling Counts---------------------------------------------\n');
console.log('Original Word Count ' + words.length);
console.log('\n---Culled----')
console.log('Odd Lengthed Words Culled: ' + oddLengthedCulled.length);
console.log('Mirrored Character Words Culled: ' + mirroredCharCulled.length);
console.log('Contradictory Pairs Culled: ' + contradictoryPairsCulled.length);
console.log('\n---Final Word Count----')
console.log('New Total Count: ' + culledWords.length + '\n');

fs.writeFile('words-culled.json', JSON.stringify(culledWords, null, '\t'));