// Hämtar input-fältet där spelaren kan skriva sitt namn (ett textfält)
const username = document.querySelector("#username");

// Hämtar knappen som används för att spara spelarens poäng
const saveScoreBtn = document.querySelector("#saveScoreBtn");

// Hämtar elementet som visar spelarens slutpoäng efter spelet
const finalScore = document.querySelector("#finalScore");

// Hämtar spelarens senaste poäng från webbläsarens lokala lagring (som sattes där efter spelet)
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Hämtar den sparade listan med tidigare high scores från localStorage, om den finns
// Om det inte finns några sparade high scores ännu, sätts det till en tom array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Visar den senaste poängen (från spelet) i HTML-elementet som visar slutpoängen
finalScore.innerText = mostRecentScore;

// Lägger till en händelsehanterare för att lyssna när användaren skriver i namn-fältet
username.addEventListener("keyup", () => {
  // Knappar blir aktiva när det finns text i namn-fältet, annars inaktiva (disabled)
  // Om textfältet är tomt, sätts knappen till disabled (inaktiv)
  saveScoreBtn.disabled = !username.value;
});

// Funktion som körs när spelaren klickar på "Spara"-knappen för att spara sin poäng
const saveHighScore = (e) => {
  e.preventDefault(); // Hindrar sidan från att ladda om (vilket är standardbeteendet för formulär)

  // Skapar ett objekt som innehåller spelarens poäng och namn
  const scoreData = {
    score: parseInt(mostRecentScore, 10), // Omvandlar poängen till ett heltal (eftersom poängen lagras som text)
    name: username.value, // Hämtar spelarens namn från textfältet
  };

  // Lägger till det nya poängobjektet i listan över high scores
  highScores.push(scoreData);

  // Sorterar high scores-listan i fallande ordning (högst poäng överst)
  highScores.sort((a, b) => b.score - a.score);

  // Tar bort alla poäng som hamnar utanför topp 5, så vi bara sparar de fem högsta poängen
  highScores.splice(5);

  // Sparar den uppdaterade high scores-listan i webbläsarens localStorage
  // localStorage kan bara spara text, så vi måste göra om listan till en JSON-sträng
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Skickar spelaren till high score-sidan där den uppdaterade listan visas
  window.location.assign("/pages/highscores.html");
};

// Lägger till en händelsehanterare som lyssnar när spelaren klickar på "Spara"-knappen
// När knappen klickas, körs funktionen saveHighScore
saveScoreBtn.addEventListener("click", saveHighScore);
