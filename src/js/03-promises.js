console.clear();

import { Notify } from 'notiflix';

const form = document.querySelector('.form');
// const input = document.querySelectorAll('input[type=number]');
const inputDelay = document.querySelector('input[name=delay');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const btn = document.querySelector('button[type=submit]');

form.addEventListener('submit', e => {
  e.preventDefault();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

btn.addEventListener('click', e => {
  let delay = Number(inputDelay.value);
  let delayStep = Number(inputStep.value);
  let delayAmount = Number(inputAmount.value);

  for (let i = 0; i < delayAmount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`success promise ${position}, delay ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`failure promise ${position}, delay ${delay}ms`);
      });
  }

  delay += delayStep;
});
