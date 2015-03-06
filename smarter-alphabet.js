var anagramCounts = require('./anagram-counts.json'),
    anagramToAlphabet = require('./anagram-to-alphabet'),
    anagramFrequencies = {};

// Figure out the frequency of each anagram. Then decide some threshold to filter out anagrams with uncommon pairings
//
for(var anagram in anagramCounts) {
  var anagramName = anagramCounts[anagram].anagram;
  for(var c = 0; c<anagramName.length;c+=2){

    var hash = anagramName[c]+anagramName[c+1];

    if( typeof anagramFrequencies[hash] === 'undefined') {
      anagramFrequencies[hash] = 0;
    }

    anagramFrequencies[hash]++;
  }
}

var frequencyCutoff = 100;


var sortedFrequencies = [];
for(var anagram in anagramFrequencies) {
  sortedFrequencies.push({anagram: anagram, frequency: anagramFrequencies[anagram]});
}

sortedFrequencies.sort(function(a, b){
  if(a.frequency<b.frequency) {
    return 1;
  } else if(a.frequency === b.frequency) {
    return 0;
  } else {
    return -1;
  }
});

// Uncomment to see frequencies
//console.log(JSON.stringify(sortedFrequencies, null, '\t'));
var newCounts = [];
for(var anagram in anagramCounts) {
  var deleteIt = false;

  // Check if any of it's pairs are below our desired frequency threshhold
  var anagramName = anagramCounts[anagram].anagram;
  for(var c = 0; c<anagramName.length;c+=2){

    var hash = anagramName[c]+anagramName[c+1];

    if( anagramFrequencies[hash] < frequencyCutoff) {
      deleteIt = true;
      break;
    }
  }

  if(deleteIt){
    console.log('Deleted: ' + anagramName);
    continue;
  }
  newCounts.push(anagramCounts[anagram]);
}

anagramToAlphabet(newCounts);
