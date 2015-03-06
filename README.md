# Overview
Extending on [this reddit thread](http://www.reddit.com/r/todayilearned/comments/2x3gea/til_that_if_you_take_all_the_letters_from_the/), we want to find out which reordering of the
english alphabet would generate the most amount of words with the same properties as ```wizard```.

# Datasets

## Original
  - words-all.txt
    
  - words-all.jsonp : The JSONP version version of the .json version to make it so we can load the file into a non server hosted index.html
    - Made with convert.js 
  - words-all.json : The JSON version version of the .txt version for more easily working in javascript
    - Manually copied and changed from words-all.jsonp

## Culled words sets
  - culled-words.json


# Thoughts on optimal goal.

Cleary you can't just scan every possible combination of alphabet orderings as it'd be 26!