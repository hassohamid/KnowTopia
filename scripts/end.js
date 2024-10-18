// Hämtar relevanta element från DOM
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");

// Hämtar den senaste poängen och sparade high scores från localStorage
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Visar den senaste poängen
finalScore.innerText = mostRecentScore;

// Aktiverar knappen för att spara när användaren skriver sitt namn
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Sparar spelarens poäng och namn till high score-listan
const saveHighScore = (e) => {
  e.preventDefault();

  const scoreData = {
    score: parseInt(mostRecentScore, 10),
    name: username.value,
  };

  // Lägger till och sorterar high scores, behåller topp 5
  highScores.push(scoreData);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  // Uppdaterar localStorage med den nya listan och navigerar till high score-sidan
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/pages/highscores.html");
};

// Lägger till klick-händelse på spara-knappen
saveScoreBtn.addEventListener("click", saveHighScore);
