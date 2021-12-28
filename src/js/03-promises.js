
import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
}

refs.formEl.addEventListener('submit', onFormSubmit);

let position = 0;

function onFormSubmit(e) {
  e.preventDefault();
  let delay = e.currentTarget.elements.delay.value;
  let step =e.currentTarget.elements.step.value;
  const amount = e.currentTarget.elements.amount.value;
  
  setTimeout(() => {
    position += 1;
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
       Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }, delay);
  
  setInterval(() => {
    if (position == amount) {
      return;
    }
    position += 1;   
    delay = Number(step) + Number(delay);
     createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
  }, step)  

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
