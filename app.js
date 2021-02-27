//game value
let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elaments
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Asing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again evevnt listner
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }

    // console.log(1);
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Cheack if won
    if (guess === winingNum) {
        // game over - won
        gameOver(true, `${winingNum} is correct, YOU WON!`)
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over -lost
            gameOver(false, `Game you lost.The correct number was ${winingNum}`);
        } else {
            // game continoues - answer wrong

            // change border color
            guessInput.style.borderColor = 'red';
            // Input value
            guessInput.value = '';

            // tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable inpuut
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // set message
    setMessage(msg);
    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get wining num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}