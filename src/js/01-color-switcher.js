const btn = document.querySelectorAll('button');
const body = document.querySelector('body');
const startBtn = btn[0];
const stopBtn = btn[1];

const INTERVAL_DELAY = 1000;
let intervalid = null;

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  intervalid = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  startBtn.disabled = true;
}

function onBtnStop() {
  clearInterval(intervalid);
  startBtn.disabled = false;
  stopBtn.disabled = false;
}
