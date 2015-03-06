var pair = 'nu',
     set = { 
        ar: true,
        bd: true,
        dl: true,
        ei: true,
        gs: true,
        nu: true,
        ai: true,
        lr: true,
        pt: true,
        ds: true,
        gn: true,
        gt: true,
        ir: true 
      }
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

  console.log(newPair,pairSet);
  return false;
}
duplicateCharsInSet(pair,set);