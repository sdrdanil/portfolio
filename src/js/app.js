import { isWebp } from './modules/service.js';

isWebp();

// Background cells
const wrapper = document.querySelector('.wrapper');
const cellsElem = document.querySelector('.cells');
const cellsCollection = cellsElem.children;
const root = getComputedStyle(document.body);
const scale = +root.getPropertyValue('--cells-scale').trim();
const minSize = +root.getPropertyValue('--cells-min').trim().slice(0, -2);

function updateCells() {
  const wrapperHeight = +(wrapper.offsetHeight * scale).toFixed(0);
  wrapper.style.setProperty('--wrapper-height', `${wrapperHeight}px`);

  const required = Math.ceil(
    (wrapper.offsetHeight * wrapper.offsetWidth * scale) / minSize ** 2
  );
  if (required > cellsCollection.length) {
    cellsElem.innerHTML = '<div class="cells__item"></div>'.repeat(required);
  }

  [].forEach.call(cellsCollection, (elem) => {
    elem.style.setProperty('--offset-top', `-${elem.offsetTop}px`);
  });
}

window.addEventListener('load', updateCells);
window.addEventListener('resize', updateCells);

// Color scheme
const buttonToggleScheme = document.querySelector('.hero__button-scheme-color');
const modifierDarkScheme = 'hero__button-scheme-color--dark';

function setLightScheme() {
  buttonToggleScheme.classList.remove(modifierDarkScheme);
  document.body.classList.remove('dark');
}

function setDarkScheme() {
  buttonToggleScheme.classList.add(modifierDarkScheme);
  document.body.classList.add('dark');
}

// 1. Проверка темной темы на уровне системных настроек
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  setDarkScheme();
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('colorScheme') === 'dark') {
  setDarkScheme();
} else if (localStorage.getItem('colorScheme') === 'light') {
  setLightScheme();
}

// Если меняются системные настройки, меняем тему
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    const newColorScheme = event.matches ? 'dark' : 'light';

    if (newColorScheme === 'dark') {
      setDarkScheme();
      localStorage.setItem('colorScheme', 'dark');
    } else {
      setLightScheme();
      localStorage.setItem('colorScheme', 'light');
    }
  });

// Включение ночного режима по кнопке
buttonToggleScheme.onclick = function () {
  buttonToggleScheme.classList.toggle(modifierDarkScheme);
  const isDark = document.body.classList.toggle('dark');

  if (isDark) {
    localStorage.setItem('colorScheme', 'dark');
  } else {
    localStorage.setItem('colorScheme', 'light');
  }
};
