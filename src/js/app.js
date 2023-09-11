function onlyWidth(handler) {
  let formerWidth = window.innerWidth;
  return (event) => {
    if (window.innerWidth == formerWidth) return;
    formerWidth = window.innerWidth;
    return handler(event);
  };
}

const elemBackground = document.querySelector('.background');
const elemCells = document.querySelector('.background__cells');

function fillGrid() {
  const wrapperWidth = document.querySelector('.wrapper').offsetWidth;
  const wrapperHeight = document.querySelector('.wrapper').offsetHeight;
  const cellSize = getComputedStyle(document.documentElement).getPropertyValue(
    '--cell-size',
  ).trim().slice(0, -2);
  const columns = Math.ceil(wrapperWidth / cellSize);
  const rows = Math.ceil(wrapperHeight / cellSize) + 1;
  const requiredCells = columns * rows;
  const additionalCells = requiredCells - elemCells.children.length;
  const offset = (columns * cellSize - wrapperWidth) / 2;

  if (additionalCells > 0) {
    elemCells.append(
      ...Array.from({ length: additionalCells }, () =>
        document.createElement('div'),
      ),
    );
  }
  elemBackground.style.setProperty('--columns', columns);
  elemBackground.style.setProperty('--rows', rows);
  elemBackground.style.setProperty('left', `-${offset}px`);
  elemBackground.style.setProperty('top', `-${offset}px`);
}

window.addEventListener('load', fillGrid);
window.addEventListener('resize', onlyWidth(fillGrid));

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

// Check system color scheme
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  setDarkScheme();
}

// Check localStorage color scheme
if (localStorage.getItem('colorScheme') === 'dark') {
  setDarkScheme();
} else if (localStorage.getItem('colorScheme') === 'light') {
  setLightScheme();
}

// Watch change system color scheme
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

// Button change color scheme


buttonToggleScheme.onclick = function () {
  buttonToggleScheme.classList.toggle(modifierDarkScheme);
  const isDark = document.body.classList.toggle('dark');

  if (isDark) {
    localStorage.setItem('colorScheme', 'dark');
  } else {
    localStorage.setItem('colorScheme', 'light');
  }

  const backgroundCells = document.querySelector('.background__cells');
  backgroundCells.classList.add('background__cells--changed-scheme');
  backgroundCells.addEventListener('transitionend', () => {
    backgroundCells.classList.remove('background__cells--changed-scheme');
  }, { once: true });
};
