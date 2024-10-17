// Hämtar elementet med id "highScoreList" från HTML
const highScoresList = document.querySelector("#highScoreList");

// Hämtar high scores från webbläsarens lokala lagring
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Sortera high scores i fallande ordning
highScores.sort((a, b) => b.score - a.score);

// Skapar HTML för att visa alla high scores
highScoresList.innerHTML = highScores
  .map((score, index) => {
    return `<li class="high-score">${index + 1}. ${score.name} | ${
      score.score
    }</li>`;
  })
  .join("");
