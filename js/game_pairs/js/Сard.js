export class Card {
  _open = false
  _success = false
  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.card.textContent = number
    this.number = number;

    this.card.addEventListener('click', () => {
      if (!this.open && !this.success) {
        this.open = true
        action(this)

        // console.log(this.card);
      }
    });
    container.append(this.card);
  }

  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  }

  get open() {
    return this._open
  }

  set success(value) {
    value ? this.card.classList.add('success') : this.card.classList.remove('success');
  }

  get success() {
    return this._success
  }
}



