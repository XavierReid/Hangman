// Game Logic
const words = [
    'await',
    'abstract',
    'boolean',
    'break',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'double',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'function',
    'gogo',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'int',
    'interface',
    'let',
    'long',
    'native',
    'new',
    'null',
    'package',
    'protected',
    'private',
    'prototype',
    'public',
    'return',
    'short',
    'super',
    'static',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'true',
    'transient',
    'try',
    'typeof',
    'undefined',
    'var',
    'void',
    'volatile',
    'while',
    'with',
    'yield'
];
let lives = 6;
let alphabet = new Set('abcdefghijklmnopqrstuvwxyz');
let punctuation = new Set(".,- ;!?'");

const randomNumber = max => Math.floor(Math.random() * Math.floor(max));
let index = randomNumber(words.length);
let word = words[index];
const generateUnderscores = amount => {
    let arr = [];
    for (let i = 0; i < amount; i++) {
        if (punctuation.has(word[i])) {
            arr.push(word[i]);
        } else {
            arr.push('_');
        }
    }
    return arr;
};
let underscores = generateUnderscores(word.length);

function guessLetter(letter) {
    if (!alphabet.has(letter)) {
        console.log('That letter has been already used');
        return;
    }
    alphabet.delete(letter);
    let changes = 0;
    for (let i = 0; i < word.length; i++) {
        const char = word.toLowerCase()[i];
        if (char === letter) {
            underscores[i] = word[i];
            changes++;
        }
    }
    if (changes === 0) {
        lives--;
        drawNext();
    }
}

function guessWord(guess) {
    if (guess.toLowerCase() === word.toLowerCase()) {
        underscores = [...word];
    } else {
        console.log('Nope thats not it');
        lives--;
        drawNext();
    }
}