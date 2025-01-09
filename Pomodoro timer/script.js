let timer;
let isRunning = false;
let isFocusTime = true;
let minutes = 25;
let seconds = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const statusText = document.getElementById("status");

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        isFocusTime = !isFocusTime;
        minutes = isFocusTime ? 25 : 5; // 25 minutes focus, 5 minutes break
        seconds = 0;
        statusText.textContent = isFocusTime ? "Focus Time!" : "Break Time!";
        updateDisplay();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isFocusTime = true;
  minutes = 25;
  seconds = 0;
  statusText.textContent = "Focus Time!";
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
