/*
 * Prints outs some useful numbers that explain why an exhaustive search or other techniques won't work.
 *
 */

function factorial(number){
  if(number===1) {
    return 1;
  }
  return number * factorial(number-1);
}

var exhaustiveSearchSpace = factorial(13);
console.log('Exhaustive search is 13! * wordCount. Forgetting wordCount, that\'s :' + exhaustiveSearchSpace);