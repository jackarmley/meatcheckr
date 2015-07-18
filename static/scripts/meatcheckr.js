/**
 * ** Meatcheckr **
 * An autocomplete script that returns
 * when it's safe to eat meat you just opened.
 * Essential, clearly. Made to practice my
 * Object Oriented JavaScript
 */

/**
 * Todo:
 * - Add list, appendTo and a classPrefix arg
 *   to a config object.
 */

// Provide an input element
// and an array of words to search
function meatcheckr (input,list,appendTo) {

    // Set some vars, bro
    _self = this;
    _self.input = document.querySelector(input);
    _self.list = list;
    _self.appendTo = document.querySelector(appendTo) || _self.input.parentNode;
    _self.match = false;
    _self.matchList = [];
    _self.suggestionsElem = _self.suggestionsContainer();

    // On keyup, check for matches
    _self.input.addEventListener('keyup',function(){

        _self.checkMatch();

        // If checkMatch returns true,
        // populate dropdown markup
        // else clear it
        if( _self.checkMatch() ){
            _self.suggestionsItem();
        }else{
            _self.clearSuggestionsContainer();
        }

    });
}

// Check if the value of the 'input' element matches
// any of the words in the 'list' array
meatcheckr.prototype.checkMatch = function() {

    // Record the character that has been typed
    var inputVal = _self.input.value;
    var inputLen = inputVal.length;
    var matchStr;
    var matchItem;
    var matchWord;

    // Empty matchList array
    _self.matchList.length = 0;

    // If typed string matches
    // one of the match words,
    // push matching words to matchList
    for(var i=0 ; i<_self.list.length ; i++){
        matchItem = _self.list[i];
        matchWord = matchItem.meat;
        matchStr = matchWord.slice(0,inputLen);
        if ( inputVal === matchStr && inputVal !== '' ) {
            _self.matchList.push(matchItem);
        }
    }

    // If matchList is not empty
    // flag a true match
    if ( _self.matchList.length !== 0 ){
        _self.match = true;
    } else{
        _self.match = false;
    }

    // Return match boolean
    return _self.match;

};

// Define autocomplete menu container
meatcheckr.prototype.suggestionsContainer = function() {
    var markup = document.createElement('ul');
    markup.className = 'meatcheckr-suggestions';
    _self.appendTo.appendChild(markup);
    return markup;
};

// Populate autocomplete menu
meatcheckr.prototype.suggestionsItem = function() {
    var suggestionsContent = '';
    for ( var i=0;i<_self.matchList.length;i++) {
        suggestionsContent += '<li class="meatcheckr-suggestions-item"';
        suggestionsContent += ' data-suggestion="' + _self.matchList[i].meat + '">';
        suggestionsContent += '<h2 class="meatcheckr-suggestions-item-heading">' + _self.matchList[i].meat + '</h2>';
        suggestionsContent += '<p>';
        suggestionsContent += '<span>' + _self.matchList[i].daysLeft;
        suggestionsContent += ' days left! </span>';
        suggestionsContent += _self.matchList[i].message;
        suggestionsContent += '</p>';
        suggestionsContent += '</li>';
    }
    _self.suggestionsElem.innerHTML = suggestionsContent;
};

// Clear autocomplete menu
meatcheckr.prototype.clearSuggestionsContainer = function() {
    _self.suggestionsElem.innerHTML = '';
};
