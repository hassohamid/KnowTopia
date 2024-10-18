// hämtar viktiga HTML-element
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

// definierar spelvariabler
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// lista med frågor
const questions = [
  {
    question: "What is the capital city of Australia?",
    choice1: "Sydney",
    choice2: "Canberra", // rätt svar
    choice3: "Melbourne",
    choice4: "Brisbane",
    answer: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choice1: "Osmium",
    choice2: "Oxygen", // rätt svar
    choice3: "Gold",
    choice4: "Oganesson",
    answer: 2,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    choice1: "Charles Dickens",
    choice2: "Jane Austen",
    choice3: "William Shakespeare", // rätt svar
    choice4: "Mark Twain",
    answer: 3,
  },
  {
    question: "What is the largest mammal in the world?",
    choice1: "African Elephant",
    choice2: "Blue Whale", // rätt svar
    choice3: "Giraffe",
    choice4: "Hippopotamus",
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choice1: "Earth",
    choice2: "Mars", // rätt svar
    choice3: "Jupiter",
    choice4: "Venus",
    answer: 2,
  },
  {
    question: "What is the longest river in the world?",
    choice1: "Amazon River", // rätt svar
    choice2: "Nile River",
    choice3: "Yangtze River",
    choice4: "Mississippi River",
    answer: 1,
  },
];

// poäng och maximalt antal frågor
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

// startar spelet, nollställer poäng och frågeräknare
const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// hämtar en ny fråga
const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/pages/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// ökar spelarens poäng
const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// lägger till klick-hanterare på svarsalternativen
const choiceContainers = Array.from(
  document.querySelectorAll(".choice-container")
);

choiceContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.currentTarget;
    const selectedAnswer =
      selectedChoice.querySelector(".choice-text").dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// startar spelet
startGame();
