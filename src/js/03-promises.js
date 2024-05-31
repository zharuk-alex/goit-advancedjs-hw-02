import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
}

document.querySelector('form').addEventListener('submit', evt => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const btn = form.querySelector('button[type="submit"]');
  btn.setAttribute('disabled', true);

  const { delay, step, amount } = [...new FormData(form)].reduce(
    (acc, el) => ({
      ...acc,
      [el[0]]: Number(el[1]),
    }),
    {}
  );

  for (let index = 1; index <= amount; index++) {
    createPromise(index, delay + step * (index - 1))
      .then(({ position, delay }) => {
        iziToast.success({
          position: 'topCenter',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          position: 'topCenter',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      })
      .finally(() => {
        if (index === amount) {
          btn.removeAttribute('disabled');
        }
      });
  }
});
