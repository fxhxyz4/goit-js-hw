console.clear();

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const INTERVAL_VALUE = 1200;
let intervalId = 0;

stopBtn.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', e => {
  stopBtn.removeAttribute('disabled', '');
  startBtn.setAttribute('disabled', '');

  intervalId = setInterval(() => {
    const hexColor = getRandomHexColor();
    body.style.backgroundColor = hexColor;
    console.log(hexColor);
  }, INTERVAL_VALUE);
});

stopBtn.addEventListener('click', e => {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled', '');
  stopBtn.setAttribute('disabled', '');
});
