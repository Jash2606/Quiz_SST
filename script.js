const questions = [
    {
        questionId: 1,
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        questionId: 2,
        question: 'What does HTML stand for?',
        choice1: 'Hyper Text Markup Language',
        choice2: 'Home Tool Markup Language',
        choice3: 'Hyperlinks and Text Markup Language',
        choice4: 'Hyperlinking Text Marking Language',
        answer: 1,
    },
    {
        questionId: 5,
        question: 'How can you make a numbered list in HTML?',
        choice1: 'ul',
        choice2: 'dl',
        choice3: 'ol',
        choice4: 'list',
        answer: 3,
    },
    {
        questionId: 0,
        question: 'Which HTML tag is used to define an inline style?',
        choice1: 'script',
        choice2: 'Css',
        choice3: 'style',
        choice4: 'span',
        answer: 3,
    },
];

let currentQuestionIndex = 0;
let shuffledQuestionIndices = [];
let userAnswers = [];
let correctAns = 0;
let quesNum = 1;
let resetvalue = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //Math.random() generates a floating-point number between 0 (inclusive) and 1 (exclusive)..
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function startQuiz() {
    console.log('Started quiz');
    if (resetvalue > 0) {
        userAnswers = [];
        quesNum = 1;
        correctAns = 0;
        resetvalue = 0;
        currentQuestionIndex = 0;
    }

    shuffledQuestionIndices = shuffleArray([...questions.keys()]); //...question ==> spread operator , which use to create shallow copy of array but here it is object 
                                                                   // so we are using .keys() which wiil make array and then pass to spread opreator ..
    userAnswers = [];
    showQuestion(questions[shuffledQuestionIndices[currentQuestionIndex]]);
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercentage + '%';
    quesNum++;
}

function showHomePage() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h1> Quick Quiz </h1>
        <button onclick="startQuiz()" id="btn"> Play </button>
    `;
}

function showQuestion(question) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div id="quiz">
            <div id="QuesandBar">
                <div id="QuestionsNum"> Questions ${quesNum}/${questions.length} </div> 
                <div id="quiz-header">
                <div id="progress-bar"></div>
                </div>
            </div>
            <div id="Score"> 
                <p>Score</p>
                <p class="score">${correctAns * 10}</p>
            </div>
        </div>
        <h2>${question.question}</h2>
        <div class="quiz-option" onclick="selectAnswer(1)">
            <div class="option">A</div>
            <div class="choice" id="1">${question.choice1}</div>
        </div>
        <div class="quiz-option" onclick="selectAnswer(2)">
            <div class="option">B</div>
            <div class="choice" id="2">${question.choice2}</div>
        </div>
        <div class="quiz-option" onclick="selectAnswer(3)">
            <div class="option">C</div>
            <div class="choice" id="3">${question.choice3}</div>
        </div>
        <div class="quiz-option" onclick="selectAnswer(4)">
            <div class="option">D</div>
            <div class="choice" id="4">${question.choice4}</div>
        </div>
    `;
}

function selectAnswer(choice) {
    userAnswers.push({ queNumber: questions[shuffledQuestionIndices[currentQuestionIndex]].questionId, selected: choice });
    console.log(userAnswers);
    const selectedChoice = document.getElementById(choice);
    const correctAnswer = questions[shuffledQuestionIndices[currentQuestionIndex]].answer;
    if (choice === correctAnswer) {
        correctAns++;
        selectedChoice.style.background = 'green';
    } else {
        selectedChoice.style.background = 'red';
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[shuffledQuestionIndices[currentQuestionIndex]]);
            updateProgressBar();
        } else {
            showResults();
        }
    }, 500);
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    resetvalue++;
    quizContainer.innerHTML = `
        <h1>${correctAns*10}</h1>
        <button onclick="startQuiz()" id="btn" class="needwidth" >Play Again</button><br>
        <button id="btn" class="needMargin" onclick="showHomePage()">Go Home</button>
    `;
}