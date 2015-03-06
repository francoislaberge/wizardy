module.exports = function(anagramCounts){
  // Let's try simply scanning top to bottom and find the first character set we can
  // Then it will get interesting after that.
  var alphabet = {};

  var allWords = [],
      didntFit = [];


  // Track how many pairs we've used
  var pairsUsed = 0;

  /*
   * Check if the pair exists or not, but if not make sure
   * adding it wouldn't add one of the characters again to the
   * final alphabet
   * 
   */
  function duplicateCharsInSet(newPair, pairSet){

    // If the pair doesn't exist we need to make sure it wouldn't
    // add a duplicate single alphabet character
    for(var pair in pairSet){
      if( newPair[0] === pair[0] ||
          newPair[0] === pair[1] ||
          newPair[1] === pair[0] ||
          newPair[1] === pair[1] ) {
        return true;
      }
    }
    
    return false;
  }

  // For each anagram add it's pairs to our alphaBet. But only
  // if all of it's pairs will fit.
  for(var a = 0; a<anagramCounts.length; a++) {
    var anagram = anagramCounts[a].anagram;

    // ------------------------------------------------------------
    // Figure out if we could even add this anagram, because it needs
    // more slots that we have for it.
    // ------------------------------------------------------------

      // Figure out how many we need to add. So we know
      // if we have enough slots left for any new pairs
      var newPairCount = 0,
          newPairs = {}
      for(var p = 0; p<anagram.length; p+=2) {
        var pairHash = anagram[p]+anagram[p+1];

        if(typeof alphabet[pairHash] === 'undefined'){
          newPairs[pairHash] = true;
          newPairCount+=1;
        }
      }

      // Do we have enough spots remaining? If not skip this anagram and it's
      // words.
      if( (pairsUsed + newPairCount) > 13) {
        didntFit.push(anagram);
        continue;
      }

    // ------------------------------------------------------------
    // Now make sure that adding this anagram's characters wouldn't entail
    // creating duplicate character entries
    // ------------------------------------------------------------
      // Compare against alphabet
    var duplicateChar = false;
    for(var pair in newPairs) {
      if(duplicateCharsInSet(pair, alphabet)){
        duplicateChar = true;
        break;
      }
    }
    if(duplicateChar) {
      continue;
    }


    // Next make sure each new pair has characters unique to the existing set
    // and of course it's own set of characters

    // Otherwise add them to the alphabet
    for(var p = 0; p<anagram.length; p+=2) {
      var pairHash = anagram[p]+anagram[p+1];
      alphabet[pairHash] = true;
    }

    pairsUsed += newPairCount;

    // Anytime there was a change in alphabet count, print it out
    if( newPairCount !== 0) {
      // Also log progress bar:
      console.log( a + ' / ' + anagramCounts.length);
      // Show the current anagram when this occurred
      console.log(anagram);
      console.log(getAlphabet().join(', '));
    }

    var words = anagramCounts[a].words;
    for(var w = 0; w<words.length; w++){
      allWords.push(words[w]);
    }
  }



  function getAlphabet(){
    var alphabetArray = []
    for(var i = 0; i<26; i++){
      alphabetArray.push('');
    }
    var c = 0;
    for(var letter in alphabet) {
      alphabetArray[c] = letter[0];
      alphabetArray[26-1-c] = letter[1];
      c++;
    }
    return alphabetArray;   
  }





  // Finally scan the remaining anagrams for anagrams that have all their pairs
  // in our alphabet




  console.log('\n---------------------------------Didn\'t fit---------------------------------\n');
  //console.log(didntFit.join(', '));

  console.log('\n---------------------------------Alphabet---------------------------------\n');
  console.log(getAlphabet().join(', '));
  console.log('\n---------------------------------Sorted Alphabet---------------------------------\n');
  console.log(getAlphabet().sort().join(', '));

  console.log('\n---------------------------------Wizardy Words---------------------------------\n');
  console.log(allWords.join(', '));


  console.log('\nWords that are wizardy: ' + allWords.length );

};