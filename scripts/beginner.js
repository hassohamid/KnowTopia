const question = document.querySelector("#question");
const choices = document.querySelectorAll(".answers li");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice1: "4",
    choice1: "21",
    choice1: "22",
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice1: "4",
    choice1: "21",
    choice1: "22",
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice1: "4",
    choice1: "21",
    choice1: "22",
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice1: "4",
    choice1: "21",
    choice1: "22",
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice1: "4",
    choice1: "21",
    choice1: "22",
    answer: 2,
  },
];

const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
};
