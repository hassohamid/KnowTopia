// Hämtar HTML-elementet som visar själva frågan
const question = document.querySelector("#question");

// Hämtar alla element som visar svarsalternativen och gör dem till en array (en lista)
const choices = Array.from(document.querySelectorAll(".choice-text"));

// Hämtar elementet som visar framstegen, alltså vilken fråga vi är på
const progressText = document.querySelector("#progressText");

// Hämtar elementet som visar spelarens poäng
const scoreText = document.querySelector("#score");

// Hämtar elementet som visar hur full framstegsbaren är (den lilla stapeln)
const progressBarFull = document.querySelector("#progressBarFull");

// Definierar variabler som ska hålla reda på nuvarande fråga, om man kan svara på frågan eller inte,
// spelarens poäng och antalet frågor som har visats
let currentQuestion = {};
let acceptingAnswers = true; // True betyder att spelaren kan svara
let score = 0; // Spelarens poäng börjar på 0
let questionCounter = 0; // Börjar på fråga 0 (ingen fråga visad än)
let availableQuestions = []; // En lista som kommer hålla de frågor som finns kvar att ställa

// Här är en lista med alla frågor och svarsalternativ för spelet
const questions = [
  {
    question: "What is the capital city of Australia?", // Frågan
    choice1: "Sydney", // Svarsalternativ 1
    choice2: "Canberra", // Svarsalternativ 2 (det rätta svaret i detta fall)
    choice3: "Melbourne", // Svarsalternativ 3
    choice4: "Brisbane", // Svarsalternativ 4
    answer: 2, // Anger vilket svar som är rätt (2 betyder "Canberra")
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choice1: "Osmium",
    choice2: "Oxygen", // Rätt svar
    choice3: "Gold",
    choice4: "Oganesson",
    answer: 2,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    choice1: "Charles Dickens",
    choice2: "Jane Austen",
    choice3: "William Shakespeare", // Rätt svar
    choice4: "Mark Twain",
    answer: 3,
  },
  {
    question: "What is the largest mammal in the world?",
    choice1: "African Elephant",
    choice2: "Blue Whale", // Rätt svar
    choice3: "Giraffe",
    choice4: "Hippopotamus",
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choice1: "Earth",
    choice2: "Mars", // Rätt svar
    choice3: "Jupiter",
    choice4: "Venus",
    answer: 2,
  },
  {
    question: "What is the longest river in the world?",
    choice1: "Amazon River", // Rätt svar
    choice2: "Nile River",
    choice3: "Yangtze River",
    choice4: "Mississippi River",
    answer: 1,
  },
];

// Antalet poäng man får för rätt svar
const SCORE_POINTS = 100;

// Max antal frågor som ska visas under spelets gång
const MAX_QUESTIONS = 6;

// Startar spelet genom att nollställa räknare och poäng, samt göra alla frågor tillgängliga
const startGame = () => {
  questionCounter = 0; // Nollställer frågeräknaren
  score = 0; // Nollställer poängen
  availableQuestions = questions.slice(); // Kopierar alla frågor till en ny lista
  getNewQuestion(); // Hämtar den första frågan
};

// Hämtar en ny fråga varje gång man svarar på en
const getNewQuestion = () => {
  // Kollar om det inte finns fler frågor kvar eller om vi har nått max antal frågor
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Sparar spelarens poäng i webbläsarens lokala lagring och skickar spelaren till slutskärmen
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/pages/end.html");
  }

  // Ökar frågeräknaren eftersom vi nu ska visa en ny fråga
  questionCounter++;
  // Uppdaterar framstegs-texten för att visa vilken fråga spelaren är på
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  // Uppdaterar framstegsbaren (stapeln) så att den fylls mer för varje fråga
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Väljer en slumpmässig fråga från de som finns kvar
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex]; // Sätter den som nuvarande fråga
  question.innerText = currentQuestion.question; // Visar frågan i webbläsaren

  // Visar svarsalternativen på skärmen
  choices.forEach((choice) => {
    const number = choice.dataset["number"]; // Hämtar vilket nummer svarsalternativet har
    choice.innerText = currentQuestion["choice" + number]; // Visar rätt svarsalternativ till rätt knapp
  });

  // Tar bort den fråga vi precis visade så den inte dyker upp igen
  availableQuestions.splice(questionIndex, 1);

  // Nu kan spelaren svara igen
  acceptingAnswers = true;
};

// Ökar spelarens poäng med ett angivet antal
const incrementScore = (num) => {
  score += num; // Lägger till poängen till det nuvarande resultatet
  scoreText.innerText = score; // Uppdaterar poängvisningen på skärmen
};

// Hämtar alla element som är kopplade till svarsalternativen
const choiceContainers = Array.from(
  document.querySelectorAll(".choice-container")
);

// Lägger till en händelsehanterare på varje svarsknapp, så något händer när man klickar
choiceContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    if (!acceptingAnswers) return; // Om man inte får svara just nu, gör inget

    acceptingAnswers = false; // Spärrar möjligheten att svara under en kort stund
    const selectedChoice = e.currentTarget; // Hämtar den knapp som användaren klickade på
    const selectedAnswer =
      selectedChoice.querySelector(".choice-text").dataset["number"]; // Hämtar vilken knapp som klickades

    // Kollar om det var rätt eller fel svar och tilldelar en klass (CSS) baserat på det
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // Om svaret var rätt, lägg till poäng
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    // Lägg till klassen för att visuellt visa om svaret var rätt eller fel
    selectedChoice.classList.add(classToApply);

    // Efter en sekund, ta bort klassen och hämta en ny fråga
    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Startar spelet så att den första frågan dyker upp
startGame();
