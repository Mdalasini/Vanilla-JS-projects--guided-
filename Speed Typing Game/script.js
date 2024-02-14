const randomQuoteApiUrl = 'http://api.quotable.io/random'
const quoteDisplay = document.getElementById('quoteDisplay')
const playArea = document.getElementById('playArea')
const timer = document.getElementById('timer')
const score = document.getElementById('score')


function getRandomQuote(){
    return fetch(randomQuoteApiUrl)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplay.innerHTML = ''
    quote.split('').forEach(char =>{
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteDisplay.appendChild(charSpan)
    })
}

let spans

renderNewQuote().then(() => {
    spans = quoteDisplay.getElementsByTagName('span')
    activeCharacter(0) // Activate first character
}) 

// Activate character
function activeCharacter(index) {
    spans[index].classList.add('active')
}

// Deactivate character
function deactiveCharacter(index) {
    spans[index].classList.remove('active')
}

// Move active character
function move(prevIndex) {
    deactiveCharacter(prevIndex)
    activeCharacter(prevIndex + 1);
}

function checkInput(index, event){
    if (spans[index].textContent == event.key){
        spans[index].classList.add('correct')
        correctInputs ++
    } else {
        spans[index].classList.add('incorrect')
        incorrectInputs ++
    }

    if (index >= spans.length - 1){
        document.removeEventListener('keydown', keydownHandler)
        stopTimer()
        endGame(correctInputs, incorrectInputs, seconds);
    }
}


// variables at start of game
let index = 0
let correctInputs = 0
let incorrectInputs = 0

let playing = true;

// TODO: ADD TIMER
let seconds = 0;
let timerWorking = false;
let timerInterval;

function updateTimer() {
    seconds++;

    timer.textContent = seconds 
}

function startTimer() {
    if (!timerWorking) {
        // Update the timer
        timerInterval = setInterval(updateTimer, 1000)
        timerWorking = true
    }
}

function stopTimer() {
    if (timerStarted) {
        clearInterval(timerInterval); // Clear the interval to stop the timer
        timerWorking = false;
    }
}

// Check is user input is printable, i.e a charchter they expect to see on screen
function isPrintableCharacter(char) {
    if (char.length === 1){
        const regex = /^[a-zA-Z0-9.,\/#!$%^&*()-+=_|:;'@{}\[\]"<>?\s]+$/;
        return regex.test(char);
    } return false    
}

// handle user input
function keydownHandler (event){
    if (isPrintableCharacter(event.key)) {
        console.log(event.key)
        startTimer()
        timer.textContent = seconds
        checkInput(index, event)
        move(index)
        index ++
    } 
}

// Give user final score
function finalScore(correct, incorrect, seconds){
    var totalCharactersTyped = correct + incorrect
    var timeInMinutes = seconds/60
    var wordsPerMinute = ((totalCharactersTyped / 5) - incorrect)/timeInMinutes
    return Math.round(wordsPerMinute * 10) / 10
}

function endGame(correctInputs, incorrectInputs, seconds){
    const wordsPerMinute = finalScore(correctInputs, incorrectInputs, seconds)
    const titleSpan = document.createElement('span')
    titleSpan.innerText = 'words/min'
    titleSpan.classList.add('text-lg')
    score.appendChild(titleSpan)
    timer.textContent = wordsPerMinute
    playing = false
}

playArea.addEventListener('click', ()=>{
    if (playing){
        document.addEventListener('keydown', keydownHandler)
    }
})
