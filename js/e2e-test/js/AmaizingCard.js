/* eslint-disable import/prefer-default-export */
import { Card } from './Сard.js';

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardNumber(value) {
    this._cardNumber = value; // Вызываем сеттер родительского класса
    const cardsImgArray = [
      '/img/101.png',
      '/img/22.png',
      '/img/3.png',
      '/img/4.png',
      '/img/5.png',
      '/img/6.png',
      '/img/7.png',
      '/img/8.png',
      '/img/9.png',
      '/img/10.png',
      '/img/11.png',
      '/img/12.png',
      '/img/13.png',
      '/img/14.png',
      '/img/15.png',
      '/img/16.png',
      '/img/17.png',
      '/img/18.png',
      '/img/19.png',
      '/img/20.png',
    ];
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = cardsImgArray[value];

    img.addEventListener('error', () => {
      img.src = '/img/default.png';
    });
    this.socetBack.innerHTML = '';
    this.socetBack.append(img);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
