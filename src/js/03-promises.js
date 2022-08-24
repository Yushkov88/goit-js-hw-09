import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;

  for (let i = 0; i < +amount.value; ++i) {
    createPromise(i + 1, +delay.value + step.value * i)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});
