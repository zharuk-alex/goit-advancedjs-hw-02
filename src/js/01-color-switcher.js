let intId = null;

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', function () {
  this.setAttribute('disabled', true);
  refs.body.style.backgroundColor = getRandomHexColor();
  intId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intId);
  refs.startBtn.removeAttribute('disabled');
});
