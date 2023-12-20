import { Card } from './Сard.js';
import { AmazingCard } from './AmaizingCard.js';

const cardsNumberArray = [];
const cardsArray = [];
const app = document.getElementById('app');
const input = document.getElementById('num');
const startButton = document.querySelector('button');

const SET_EVENT_MS = 500;
const SECONDS = 60;
const ONE_SECOND = 1000;
const MIN_ELEM = 2;
const MAX_ELEM = 10;
const DEFAULT_ELEM = 4;
const WIDTH_SMOLL = 150;
const WIDTH_MEDIUM = 400;
const WIDTH_LARGE = 599;
const WIDTH_EXTRA = 700;
const WIDTH_EXTRA_LARGE = 900;
const CARDS_SMOLL = 4;
const CARDS_MEDIUM = 16;
const CARDS_LARGE = 36;
const CARDS_EXTRA = 64;
const MATCH_PAIRS = 2;
const ZERO = 0;
const ONE = 1;

let count = Number(input.value);
// количество верно открытых карточек
let successCard = 0;
let timer = 0;
let secondsOnTimer = SECONDS;
let gameArea;

function shuffle(array) {
  // Перемешиваем массив count-пар чисел в случайном порядке
  for (let i = 0; i < array.length; i++) {
    const j = Math.round(Math.random() * (array.length - 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна
// возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
function createNumberscardsNumberArrayay() {
  let countElem = count;
  // Проверяем что count четное и находится в интервале от 2 до 10
  if ((countElem % 2 !== ZERO && countElem <= MAX_ELEM && countElem >= MIN_ELEM)
    || (countElem > MAX_ELEM || countElem < MIN_ELEM)) {
    countElem = DEFAULT_ELEM;
  }
  // Генерируем массив из count-пар чисел
  for (let i = 1; i <= countElem * countElem / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }
  shuffle(cardsNumberArray);
}

function rebootGame() {
  app.innerHTML = '';
  // eslint-disable-next-line no-use-before-define
  createGameArea();
}

function gameTime() {
  const clock = document.createElement('div');
  clock.classList.add('clock');
  gameArea.prepend(clock);
  clock.textContent = secondsOnTimer;

  timer = setInterval(() => {
    secondsOnTimer--;
    clock.textContent = secondsOnTimer;
    if (secondsOnTimer < ONE && successCard !== cardsNumberArray.length) {
      clearInterval(timer);
      alert('Вермя вышло');
      const rebootbutton = document.createElement('button');
      rebootbutton.classList.add('new-game');
      rebootbutton.textContent = 'Запустить заново';
      gameArea.append(rebootbutton);
      successCard = ZERO;
      rebootbutton.addEventListener('click', () => {
        rebootGame();
      });
    }
  }, ONE_SECOND);
}

// Собираем поле игры, назначаем значения
function createGameArea() {
  let firstCard = null;
  let secondCard = null;

  app.innerHTML = '';
  gameArea = document.createElement('div');
  gameArea.classList.add('area');
  const areaList = document.createElement('ul');
  areaList.classList.add('list-reset', 'list-area');

  if (cardsNumberArray.length <= CARDS_SMOLL) {
    gameArea.setAttribute('style', `width: ${WIDTH_SMOLL}px`);
  } else if (cardsNumberArray.length === CARDS_MEDIUM) {
    gameArea.setAttribute('style', `width: ${WIDTH_MEDIUM}px`);
  } else if (cardsNumberArray.length === CARDS_LARGE) {
    gameArea.setAttribute('style', `width: ${WIDTH_LARGE}px`);
  } else if (cardsNumberArray.length === CARDS_EXTRA) {
    gameArea.setAttribute('style', `width: ${WIDTH_EXTRA}px`);
  } else if (cardsNumberArray.length > CARDS_EXTRA) {
    gameArea.setAttribute('style', `width: ${WIDTH_EXTRA_LARGE}px`);
  }

  function flip(card) {
    if (firstCard === null) {
      firstCard = card;
    } else if (secondCard === null) {
      secondCard = card;
    }
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.cardNumber === secondCard.cardNumber) {
        firstCard.success = true;
        secondCard.success = true;
        successCard += MATCH_PAIRS;
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(() => {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }, SET_EVENT_MS);
      }
    }

    // игра заканчивается когда открытых карточек столько, сколько их всего
    if (successCard === cardsNumberArray.length && secondsOnTimer > ZERO) {
      setTimeout(() => {
        clearInterval(timer);
        alert(`You Won in ${SECONDS - secondsOnTimer} seconds!!!`);
        const rebootbutton = document.createElement('button');
        rebootbutton.classList.add('new-game');
        rebootbutton.textContent = 'Запустить заново';
        gameArea.append(rebootbutton);
        successCard = ZERO;
        rebootbutton.addEventListener('click', () => {
          rebootGame();
        });
      }, SET_EVENT_MS);
    }
  }

  // Создание карт
  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(areaList, cardNumber, flip));
    // cardsArray.push(new AmazingCard(areaList, cardNumber, flip));
  }

  app.append(gameArea);
  gameArea.append(areaList);
  secondsOnTimer = SECONDS;
  gameTime();
}

function startGame() {
  // При клике начать игру собираем тело игры
  startButton.addEventListener('click', (e) => {
    //
    e.preventDefault();
    // Проверяем, если input пустой – ничего не делаем
    if (!input.value) {
      return;
    }

    count = input.value;

    createNumberscardsNumberArrayay();
    createGameArea();
  });
}

startGame();
