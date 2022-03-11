const questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        title: 'The condition in an if/else statement is enclosed within ___.',
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 'parenthesis'
    },
    {
        title: 'Arrays in JS can be used to store ___',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        title: 'String values must be enclosed within _____ when being assigned to variables',
        choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 'quotes'
    },
    {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log'
    }
]

const timerEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const feedBackEl = document.getElementById('feedback');
const sfxCorrect = new Audio('assets/sfx/correct.wav');
const sfxWrong = new Audio('assets/sfx/incorrect.wav');
let currentQuestionIndex = 0;
let secondsLeft = 100;
let timerId;

const countDown = () => {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if (secondsLeft <= 0) endQuiz();
}

const startQuiz = () => {
    document.getElementById('start-screen').setAttribute('class', 'hide');
    document.getElementById('questions').removeAttribute('class');

    timerId = setInterval(countDown, 1000);
    timerEl.textContent = secondsLeft;

    getQuestions();
}

const getRandomQuestion = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];
    return randomElement;
}

const getQuestions = () => {
    const currentQuestion = getRandomQuestion(questions);

    document.getElementById('question-title').textContent = currentQuestion.title;
    choices.textContent = '';

    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = `${index}. ${choice}`;

        document.querySelector('.choices').appendChild(choiceBtn);

        choiceBtn.addEventListener('click', handleChoiceClick);
    })
}

const handleChoiceClick = (event) => {
    if (event.target.value !== questions[currentQuestionIndex].answer) {
        feedBackEl.textContent = "Wrong!";
        sfxWrong.play();
        secondsLeft -= 15;

        if (secondsLeft <= 0) secondsLeft = 0;

        timerEl.textContent = secondsLeft;
    }

    else {
        feedBackEl.textContent = 'Correct!'
        sfxCorrect.play();
    }

    feedBackEl.setAttribute("class", "feedback");

    setTimeout(() => {
        feedBackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex += 1;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    }
    else {
        getQuestions();
    }
}

const endQuiz = () => {
    clearInterval(timerId);

    document.getElementById('questions').setAttribute('class', 'hide')
    document.getElementById('end-screen').removeAttribute('class');
    document.getElementById('final-score').textContent = timerEl.textContent;
}

const saveHighScore = () => {
    const initials = document.getElementById('initials').value.trim();
    if (!initials) {
        alert('Invalid Initials');
        return;
    }
    const score = secondsLeft;
    const scoreData = {
        initials: initials,
        score: score
    }

    const highScores = JSON.parse(localStorage.getItem('highscores')) || [];
    highScores.push(scoreData);

    localStorage.setItem('highscores', JSON.stringify(highScores));

    window.location = 'highscores.html';
}

startBtn.addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', saveHighScore)