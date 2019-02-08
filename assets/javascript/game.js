//Create global variable to hold the word to guess
var wordToGuess; 

//Main game object
var wordGuess = {
    score: 0,
    tries: 12,
    wordList: ["one", "two", "boo", "three"],
    wrongLetters: [], 
    rightLetters: [], //start with underscores based on wordToGuess Length
   
    //Reset Score to Zero
    resetScore: function() {
        this.score = 0; 
    },

    //Reset Tries to 12
    resetTries: function() {
        this.tries = 12;
    },
    
    //Reset Letter Lists
    resetLetters: function() {
        this.rightLetters = [];
        this.wrongLetters = [];
    },

    //Decrease Tries by 1
    decreaseTries: function() {
        this.tries = this.tries - 1; 
    },

    //Add a point to the current score
    increaseScore: function() {
        this.score = this.score + 1; 
    },
    
    //Randomly pick a word to guess
    currentWord: function () {
        var word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        return word; 
    },

    //Add Letter to list of guessed letters
    addGuessedLetter: function(letter){
        this.wrongLetters.push(letter);
    },

    //Prepopulate array with "_ " and show on the page
    prepGuesses: function () {
        var underscores = "_ ";
        var wordDiv = document.getElementById("wordDiv");
        for (var i = 0; i < wordToGuess.length; i++) {
            this.rightLetters.push(underscores); 
            var newDiv = document.createElement("div");
            newDiv.textContent = this.rightLetters[i];
            wordDiv.appendChild(newDiv);
            console.log(this.rightLetters[i]);   
        }
    }
}

//Run the Game!!
//select the word 
wordToGuess = wordGuess.currentWord(); 

//Show blanks on the page
wordGuess.prepGuesses(); 

//Show blanks on the page
//wordGuess.underscoreString; 
//var underscores = "_ ";
//var wordDiv = document.getElementById("wordDiv")
// for (var i = 0; i < wordToGuess.length; i++) {
//  wordGuess.rightLetters.push(underscores); 
// var newDiv = document.createElement("div");
// newDiv.textContent = wordGuess.rightLetters[i];
//wordDiv.appendChild(newDiv);
//console.log(wordGuess.rightLetters[i]);
// }

 document.getElementById("tries").innerHTML = wordGuess.tries;
 document.getElementById("word").innerHTML = wordToGuess;
 document.getElementById("userScore").innerHTML = wordGuess.score;

console.log(wordToGuess);
console.log(wordToGuess.length);
console.log(wordGuess.tries);
console.log(wordGuess.rightLetters);

//Determine if the letter is in the word
document.onkeyup = function (event) {
    var keyPress = event.key;
    if (wordToGuess.includes(keyPress)) {
        //then loop through the blanks and replace with the letter in the correct spot(s)
        for (var i = 0; i < wordToGuess.length; i++) {
           if (keyPress === wordToGuess.charAt(i)) {
                wordGuess.rightLetters[i] = wordToGuess.charAt(i);
                console.log(wordGuess.rightLetters)
                //TODO need to print out the array... 
           }
        }
        //check to see if they won
        var stillGuessing = wordGuess.rightLetters.includes("_ "); //TODO make this a variable??
        if (stillGuessing===false){
            //increase score and reset with a new word.
            alert("yay!");
            wordGuess.increaseScore();
            console.log("score: " + wordGuess.score);
            wordGuess.resetTries();
            wordGuess.resetLetters();
            wordToGuess = wordGuess.currentWord(); 
            wordGuess.prepGuesses(); 
        }
    }
    else { //no match
        wordGuess.decreaseTries();
        wordGuess.addGuessedLetter(keyPress); //TODO: change so if you press the same key again it isn't a try.
        document.getElementById("tries").innerHTML = wordGuess.tries;
        console.log(wordGuess.wrongLetters)
        //TODO need to show the already tried letters

        //check to see if they lost and if so, restart the game.
        if (wordGuess.tries === 0) {
            alert("Game Over!!");
            wordGuess.resetScore();
            wordGuess.resetTries();
            console.log("reset tries:" + wordGuess.tries);
            wordGuess.resetLetters();
            console.log("reset right letters:" + wordGuess.rightLetters);
            console.log("reset wrong letters:" + wordGuess.wrongLetters);
            wordToGuess = wordGuess.currentWord();
            console.log("reset word: " + wordToGuess)
            wordGuess.prepGuesses(); 
        }
        }

}
