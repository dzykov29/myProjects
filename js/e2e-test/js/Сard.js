export class Card {
  _open = false
  _success = false

  constructor(container, cardNumber, flip) {
    const card = this.createElement(cardNumber);

    container.append(card);

    card.addEventListener('click', () => {

      if (!this.open && !this.success) {
        this.open = true
        flip(this)
      }
    })
   }

  createElement(cardNumber) {
    this.socetArea = document.createElement('li');
    this.socetArea.classList.add('area-item');
    this.socetBack = document.createElement('div');
    this.socetBack.classList.add('back');
    this.socetFront = document.createElement('div');
    this.socetFront.classList.add('front');
    this.socetBack.textContent = cardNumber;
    this.cardNumber = cardNumber;
    this.open = false;
    this.socetArea.append(this.socetBack);
    this.socetArea.append(this.socetFront);

    return this.socetArea;
   }

  set cardNumber(value) {
    this._cardNumber = value;
    this.socetBack.textContent = value;
   }
  get cardNumber() {
    return this._cardNumber;
  }
  set open(value) {
    this._open = value;
    value ? this.socetArea.classList.add('area-item-transform') : this.socetArea.classList.remove('area-item-transform');
   }
  get open() {
    return this._open
   }
  set success(value) {
    this._success = value;
    value ? this.socetArea.classList.add('success') : this.socetArea.classList.remove('success');
   }
  get success() {
    return this._success;
   }
}
