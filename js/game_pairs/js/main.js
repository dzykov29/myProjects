import { Card } from "./Сard.js";

function newGame(container, cardsCount) {

  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else if (secondCard == null) {
      secondCard = card;
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number === secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }
    if (document.querySelectorAll('.success').length === cardsNumberArray.length) {
      alert('Победа');
      container.innerHTML = '';
      cardsNumberArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;
      newGame(document.getElementById('game'), cardsCount);
    }
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }
}

newGame(document.getElementById('game'), 6);
