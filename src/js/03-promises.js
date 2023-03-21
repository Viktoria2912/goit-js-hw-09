import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', createPromiseBySubmit);

function createPromiseBySubmit(e) {
  e.preventDefault();
  let delay = e.target[0].valueAsNumber;
  const step = e.target[1].valueAsNumber;
  const amount = e.target[2].valueAsNumber;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
