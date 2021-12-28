
import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
}

refs.formEl.addEventListener('submit', onFormSubmit);

let position = 1;

function onFormSubmit(e) {
  e.preventDefault();
  let delay = e.currentTarget.elements.delay.value;
  let step = e.currentTarget.elements.step.value;
  const amount = e.currentTarget.elements.amount.value;
  if (amount <= 0) {
    return;
  }

  let timerId = setTimeout(function tick() {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = Number(delay) + Number(step);
    if (Number(position) === Number(amount)) {
      return;
    }
    timerId = setTimeout(tick, step);
    position += 1;    
  }, delay);  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
