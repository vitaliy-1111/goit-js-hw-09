
const refs = {
  btnStartColorPicker: document.querySelector('button[data-start]'),
  btnStopColorPicker: document.querySelector('button[data-stop]')
}
let colorPickerId = null;

refs.btnStartColorPicker.addEventListener('click', onBtnStartColorPicker);
refs.btnStopColorPicker.addEventListener('click', onBtnStopColorPicker);

refs.btnStopColorPicker.setAttribute("disabled", "disabled");

function onBtnStartColorPicker() {
  colorPickerId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor();}, 1000);
  refs.btnStartColorPicker.setAttribute("disabled", "disabled");
  refs.btnStopColorPicker.removeAttribute("disabled", "disabled");
}

function onBtnStopColorPicker() {
  clearInterval(colorPickerId);
  refs.btnStartColorPicker.removeAttribute("disabled", "disabled");
  refs.btnStopColorPicker.setAttribute("disabled", "disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}