var wordGuess = {
    score: 0,
    tries: 12,
    wordList: ["one", "two", "boo", "three"],
    lettersGuessed: [],

    //Reset Score to Zero
    resetScore: function() {
        this.score = 0; 
    },
    //Reset Tries to 12
    resetTries: function() {
        this.tries = 12;
    },
    
    //Reset Guessed Letter List
    resetGuessedLetters: function() {
        this.lettersGuessed = [];
    },

    //Decrease Tries by 1
    decreaseTries: function() {
        this.tries = this.tries - 1; 
    },

    //Add a point to the current score
    increaseScore: function() {
        this.score = this.score + 1; 
    },

    //Randomly pick a new word to guess
    currentWord: function () {
        var word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        return word; 
    },

    //Add Letter to list of guessed letters
    addGuessedLetter: function(letter){
        this.letterGuessed.push(letter);
    }

}

//Capture the letter entered by the user and do stuff
console.log(wordGuess.score);
console.log(wordGuess.tries);
console.log(wordGuess.currentWord());

document.getElementById("userScore").innerHTML = wordGuess.score;
document.getElementById("tries").innerHTML = wordGuess.tries;
document.getElementById("word").innerHTML = wordGuess.currentWord();

