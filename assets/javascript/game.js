//Create global variable to hold the word to guess
var wordToGuess;

var wordDiv = document.getElementById("wordDiv");
var newDiv = document.createElement("div");
wordDiv.appendChild(newDiv);
var wrongLettersDiv = document.getElementById("wrongLettersDiv");

//Main game object
var wordGuess = {
    score: 0,
    tries: 12,
    wordList: ["one", "two", "boo", "three"],
    wrongLetters: [],
    rightLetters: [], 

    //Reset Score to Zero
    resetScore: function () {
        this.score = 0;
        document.getElementById("userScore").innerHTML = wordGuess.score;
    },

    //Reset Tries to 12
    resetTries: function () {
        this.tries = 12;
        document.getElementById("tries").innerHTML = wordGuess.tries;
    },

    //Reset Letter Lists
    resetLetters: function () {
        this.rightLetters = [];
        this.wrongLetters = [];
        wrongLettersDiv.textContent = "";
    },

    //Decrease Tries by 1 and print out current score
    decreaseTries: function () {
        this.tries = this.tries - 1;
        document.getElementById("tries").innerHTML = wordGuess.tries;
    },

    //Add a point to the current score
    increaseScore: function () {
        this.score = this.score + 1;
        document.getElementById("userScore").innerHTML = wordGuess.score;
    },

    //Randomly pick a word to guess
    currentWord: function () {
        var word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        return word;
    },

    //Add Letter to list of guessed letters (only if not already on the list), decrease tries, and display on the page
    addGuessedLetter: function (letter) {
        if (this.wrongLetters.includes(letter) === false) {
            this.wrongLetters.push(letter);
            console.log("wrong " + this.wrongLetters);
            var theWrongList = this.wrongLetters.join();
            console.log("wrong " + theWrongList);
            wrongLettersDiv.textContent = theWrongList;
            this.decreaseTries();
        }
    },

    //Prepopulate array with "_ " and show on the page
    prepGuesses: function () {
        var underscores = "_ ";
        newDiv.textContent = "";
        for (var i = 0; i < wordToGuess.length; i++) {
            this.rightLetters.push(underscores);
            newDiv.textContent = newDiv.textContent + this.rightLetters[i];
        }
    },

    //Update the display on the page as the user guesses the letters 
    showWord: function () {
        var theWord = this.rightLetters.join("");
        console.log("Progress: " + theWord);
        newDiv.textContent = theWord;
    },
}

//Run the Game!!
//select the word 
wordToGuess = wordGuess.currentWord();

//Show blanks on the page
wordGuess.prepGuesses();

//Display items on the page
document.getElementById("tries").innerHTML = wordGuess.tries;
document.getElementById("word").innerHTML = wordToGuess;
document.getElementById("userScore").innerHTML = wordGuess.score;

//Determine if the letter is in the word
document.onkeyup = function (event) {
    var keyPress = event.key;
    if (wordToGuess.includes(keyPress)) {
        //then loop through the blanks and replace with the letter in the correct spot(s)
        for (var i = 0; i < wordToGuess.length; i++) {
            if (keyPress === wordToGuess.charAt(i)) {
                wordGuess.rightLetters[i] = wordToGuess.charAt(i);
                console.log(wordGuess.rightLetters)
                wordGuess.showWord();
            }
        }

        //check to see if they won
        var stillGuessing = wordGuess.rightLetters.includes("_ "); //TODO make this a variable??
        if (stillGuessing === false) {
            //increase score and reset with a new word.
            wordGuess.increaseScore();
            wordGuess.resetTries();
            wordGuess.resetLetters();
            wordToGuess = wordGuess.currentWord();
            wordGuess.prepGuesses();
        }
    }
    else { //no match
        wordGuess.addGuessedLetter(keyPress);
        //check to see if they lost and if so, restart the game.
        if (wordGuess.tries === 0) {
            alert("Game Over!!");
            wordGuess.resetScore();
            wordGuess.resetTries();
            wordGuess.resetLetters();
            wordToGuess = wordGuess.currentWord();
            wordGuess.prepGuesses();
        }
    }

}
