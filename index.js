const questions = [
    {
        question: "Which is the smallest header in HTML by default?",
        answers: [
            {text: "h1", correct: false}, 
            {text: "h6", correct: true}, 
            {text: "h5", correct: false}, 
            {text: "h4", correct: false}, 
        ]
    },
    {
        question: "What tag is used to render an image on a webpage?",
        answers: [
            {text: "img", correct: true}, 
            {text: "src", correct: false}, 
            {text: "image", correct: false}, 
            {text: "None of the above", correct: false}, 
        ]
    },
    {
        question: "Which HTML tag is used to set up a javascript-like client-side scripting language?",
        answers: [
            {text: "script", correct: true}, 
            {text: "select", correct: false}, 
            {text: "anchor", correct: false}, 
            {text: "img", correct: false}, 
        ]
    },
    {
        question: "Which of the following property is used to change the font of text?",
        answers: [
            {text: "Font-family", correct: true}, 
            {text: "Font-size", correct: false}, 
            {text: "Text-align", correct: false}, 
            {text: "Align-item", correct: false}, 
        ]
    },
    {
        question: "CSS stands for?",
        answers: [
            {text: "Color style sheets", correct: false}, 
            {text: "Color style sheet", correct: false}, 
            {text: "Cascade style sheet", correct: false}, 
            {text: "Cascading style sheets", correct: true}, 
        ]
    },
    {
        question: "Which property is used to define text color?",
        answers: [
            {text: "Text-color", correct: false}, 
            {text: "Font-colour", correct: false}, 
            {text: "Color", correct: true}, 
            {text: "Font-size", correct: false}, 
        ]
    },
    {
        question: "Which of the following is not a programming language?",
        answers: [
            {text: "Phython", correct: false}, 
            {text: "HTML", correct: true}, 
            {text: "Javascript", correct: false}, 
            {text: "C++", correct: false}, 
        ]
    },
    {
        question: "Which is the meaning of js?",
        answers: [
            {text: "Javascript", correct: true}, 
            {text: "javascreen", correct: false}, 
            {text: "Jointscript", correct: false}, 
            {text: "Jquery Source", correct: false}, 
        ]
    },
    {
        question: "Javascript can be used to style?",
        answers: [
            {text: "Yes", correct: true}, 
            {text: "No", correct: false}, 
            {text: "Maybe", correct: false}, 
            {text: "Sometimes", correct: false}, 
        ]
    },
    {
        question: "Inline styles are written within _____ attribute?",
        answers: [
            {text: "Stylesheet", correct: false}, 
            {text: "CSS", correct: false}, 
            {text: "Style", correct: true}, 
            {text: "Script", correct: false}, 
        ]
    }
];

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answer-btn");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
