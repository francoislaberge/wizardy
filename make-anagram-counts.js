/*
 * Rather than scanning the every combination of alphabet and then doing word counts on those we try to
 * instead generate the alphabet sets taking advantage of properties of the corpus.
 *
 * TODO: Explain this approach more. For now get something working.
 */

 var  fs = require('fs'),
      wordsCulled = require('./words-culled.json');

var anagrams = {},
    word;
for(var i = 0; i<wordsCulled.length; i++) {
  word = wordsCulled[i];

  // Turn the word from a char string to a set of mirror pairs that we'll treat as a virtual char
  // that we'll then use to create a sort of anagram from a sort list of pairs
  var anagram = [],
      // Prevent duplicate pairs from being added to the anagram
      anagramChars = {},
      pair;
  var halfLength = Math.floor(word.length/2);
  for(var c = 0; c<halfLength; c++){
    pair = [word[c], word[word.length-1-c]].sort().join('');

    if( typeof anagramChars[pair] === 'undefined'){
      anagramChars[pair] = true;
      anagram.push(pair);  
    } else {
      // Drop it, it's a duplicate
    }
  }

  // Sort the characters of the word and then add it to anagramCounts hash
  var anagramHash = anagram.sort().join('');
  
  // Create an entry if it doesn't exist
  if(typeof anagrams[anagramHash] === 'undefined') {
    anagrams[anagramHash] = [];
  }

  anagrams[anagramHash].push(wordsCulled[i]);
}

var anagramArray = [];
for(var a in anagrams){
  anagramArray.push({
    anagram: a,
    words: anagrams[a],
  });
}

function sortAnagramAlphabetically(a, b){
  a = a.anagram;
  b = b.anagram;

  for(var c = 0; c<a.length && c<a.length; c++) {
    if(a[c] > b[c]){
      return 1;
    } else if(a[c] === b[c]){
        // keep going until you find a difference
    } else {
      return -1;
    }
  }

  if(a.length > b.length){
    return 1;
  } else if(a[c] === b[c]){
      throw 'This should never be hit';
  } else {
    return -1;
  }
}

// Sort by
//  word count, then
//    anagram length, then
//      anagrams themselves alphabetically to create more order
function sortWordCountAnagramLengthAnagramAlphabetically(a, b){
  // Sort by word count
  if(a.words.length < b.words.length){
    return 1;
  } else if(a.words.length === b.words.length){
    
    // Sort by anagram length. Hopefully this brings some order
    // and better compression in the use of chosen alphabet order
    if(a.anagram.length > b.anagram.length){
      return 1;
    } else if(a.anagram.length === b.anagram.length){
        // Sort the hash itself now if they have the same counts
        // 
        if(a.anagram > b.anagram){
          return 1;
        } else if(a.anagram === b.anagram){
            return 0;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  } else {
    return -1;
  }
}

// Now sort it to make the highest counts appear first
anagramArray.sort(sortWordCountAnagramLengthAnagramAlphabetically);

fs.writeFile('anagram-counts.json', JSON.stringify(anagramArray, null, '\t'));