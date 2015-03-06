/*
 * Rather than scanning the every combination of alphabet and then doing word counts on those we try to
 * instead generate the alphabet sets taking advantage of properties of the corpus.
 *
 * TODO: Explain this approach more. For now get something working.
 */

 var  fs = require('fs'),
      wordsCulled = require('./words-culled.json');


// Make a trie that is an encoding of all
// possible combinations of mirrored pairs.
// 
// The Trie will be in a recursive structure like so:
//
//  {
//    pairHash: { 
//    }
//  };
// 

var mirroredCharactersTrie = {};

/*
 * Insert a pair into the trie, returning a trie if one was
 * created or the one that already existed.
 */
function insertPair(ch, mirrored, trieNode){
  var pairHash = ch+mirrored;
  
  if( typeof trieNode !== 'undefined' ){
    trieNode[pairHash] = {};
  }

  return trieNode[pairHash];
}

function insertWord(word){
  var halfLength = Math.floor(word.length/2),
      currentTrieNode = mirroredCharactersTrie;
  
  // Iteratively insert each pair of characters into
  // the trie
  for(var c = 0; c<halfLength; c++) {
    currentTrieNode = insertPair(word[c], word[word.length-1-c], currentTrieNode);
  }
}

// NOTE: We will tally up a hierarchical count
// of the amount of words that a pair or
// sequence of pair will generate if selected
// for our generated alphabet
for(var i = 0; i<wordsCulled.length; i++) {
  insertWord(wordsCulled[i]);
}

// Convert tree to an from our fast to insert hash map based but not sorted trie to a hierarchy
// of sorted arrays
function trieToArray(trieNode){
  var trieNodeArray = [];

  for(var pairHash in trieNode){
    trieNodeArray.push({
      pair: pairHash,
      children: trieToArray(trieNode[pairHash])
    });
  }

  return trieNodeArray;
}

var trieArray = trieToArray(mirroredCharactersTrie);

// Add a higherarchical counter to the tree. Each parent will have a count of how many
// words exist in it's children
function addCountsAndSort(trieChildren){
  var totalWords = 1;

  for(var i = 0; i<trieChildren.length; i++) {
    trieChildren[i].wordCount = addCountsAndSort(trieChildren[i].children);
    
    totalWords += trieChildren[i].wordCount;
  }

  // Now Sort children by how many words are created from all it's trie nodes
  trieChildren.sort(function(a, b){
    // Less
    if(a.wordCount<a.wordCount){
      return -1;
    }
    // Equal
    else if(a.wordCount === a.wordCount){
      return 0;
    }
    // Greater
    else {
      return 1;
    }
  });

  return totalWords;
}

addCountsAndSort(trieArray);

fs.writeFile('trie-mirrored-characters.json', JSON.stringify(trieArray, null, '\t'));