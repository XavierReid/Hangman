// Hooking to the DOM
const keyboard = document.querySelector('.keyboard');
const guessBox = document.querySelector('#guess-box');
const livesCounter = document.querySelector('#lives-counter span');
const wordToGuess = document.querySelector('#word-to-guess');
const theWord = document.querySelector('#the-word');
theWord.innerText = `The word was: ${word}`;

function makeKeys(letters) {
    const row = document.createElement('div');
    letters.split('').forEach(char => {
        const key = document.createElement('button');
        key.classList.add('key');
        key.innerText = char.toUpperCase();
        row.appendChild(key);
    });
    keyboard.insertBefore(row, document.querySelector('button.guess.key'));
}

function populateKeyboard() {
    makeKeys('qwertyuiop');
    makeKeys('asdfghjkl');
    makeKeys('zxcvbnm');
    document
        .querySelectorAll('.key')
        .forEach(key => key.addEventListener('click', handleClick));
    updateLives();
}

function handleClick() {
    if (!this.classList.contains('guess')) {
        const letter = this.innerText.toLowerCase();
        guessLetter(letter);
        this.classList.add('clicked');
    } else {
        let guessedWord = guessBox.value;
        if (guessedWord.length < 2) {
            console.log('That is not a word');
            return;
        }
        guessWord(guessedWord);
        guessBox.value = '';
    }
    updateLives();
    displayUnderscores();
    if (isOver()) {
    }
}

const updateLives = () => (livesCounter.innerText = lives);

function isOver() {
    if (lives === 0) {
        console.log('You lose');
        let parent = livesCounter.parentElement;
        parent.innerText = 'You Lost :-(';
        theWord.setAttribute('style', 'opacity: 100;');
        return true;
    }

    if (normalizeCompare(underscores, [...word])) {
        let parent = livesCounter.parentElement;
        parent.innerText = 'You Won :-)';
        return true;
    }
    return false;
}

function displayUnderscores() {
    let display = underscores
        .map(
            underscore =>
                `<span class="${
                    underscore === ' ' ? 'space' : ''
                }">${underscore}</span>`
        )
        .join(' ');
    wordToGuess.innerHTML = display;
}

function normalizeCompare(arr1, arr2) {
    return arr1.toString().toLowerCase() == arr2.toString().toLowerCase();
}

function reset() {
    lives = 6;
    index = randomNumber(words.length);
    word = words[index];
    underscores = generateUnderscores(word.length);
    displayUnderscores();
    updateLives();
    document
        .querySelectorAll('.clicked')
        .forEach(key => key.classList.remove('clicked'));
}
populateKeyboard();
displayUnderscores();
