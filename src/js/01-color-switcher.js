const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleButtonsStatus(isStarted) {
  stopBtn.disabled = !isStarted;
  startBtn.disabled = isStarted;
}

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleButtonsStatus(true);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  toggleButtonsStatus(false);
});
