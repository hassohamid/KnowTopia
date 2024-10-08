const button = document.querySelector("button");
const container = document.querySelector(".container");
const quizContainer = document.querySelector(".quiz-container");
const main = document.querySelector("main");

function startCountdown() {
  let countdown = 3;

  container.innerHTML = `<h1 id="timerTitle">Starting in</h1><h2>${countdown}</h2>`;

  const countdownInterval = setInterval(() => {
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      container.style.display = "none";
      quizContainer.style.display = "block";
    } else {
      container.innerHTML = `<h1 id="timerTitle">Starting in</h1><h2>${countdown}</h2>`;
    }
  }, 1000);
}

button.addEventListener("click", startCountdown);
