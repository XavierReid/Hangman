// Speech Recognition Feature
const alphaHomophones = {
    hey: 'a',
    be: 'b',
    bee: 'b',
    see: 'c',
    sea: 'c',
    in: 'n',
    pee: 'p',
    pea: 'p',
    oh: 'o',
    are: 'r',
    you: 'u',
    why: 'y'
};

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
    const transcript = [...e.results]
        .map(result => result[0])
        .map(result => result.transcript)
        .join(' ');
    if (e.results[0].isFinal) {
        if (alphaHomophones[transcript]) {
            let letter = alphaHomophones[transcript].toLowerCase();
            console.log(letter);

            guessLetter(letter);
            selectSpokenLetter(letter);
        } else if (transcript.length === 1) {
            console.log(transcript);

            guessLetter(transcript.toLowerCase());
            selectSpokenLetter(transcript.toLowerCase());
        } else {
            console.log(transcript);

            guessWord(transcript);
        }
        updateLives();
        displayUnderscores();
        if (isOver()) {
        }
    }
});

function selectSpokenLetter(letter) {
    const keys = [...document.querySelectorAll('.key')];
    const selectedKey = keys.filter(
        key => key.innerText.toLowerCase() === letter
    );
    selectedKey[0].classList.add('clicked');
}

recognition.addEventListener('end', recognition.start);
recognition.start();
