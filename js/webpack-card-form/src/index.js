import 'babel-polyfill';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { el, setChildren } from "redom";
import Inputmask from "inputmask";
import visa from './assets/images/visa.svg';
import maestro from './assets/images/maestro.svg';
import mastercard from './assets/images/mastercard.svg';
import mir from './assets/images/mir.svg';

const valid = require("card-validator");

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const lastTwoDigitsYear = currentYear.toString().slice(-2);
const realMonth = (currentMonth + 1).toString();

const MIN_NUMBER_CARD = 4;
const MAX_NUMBER_CARD = 19;
const DATA_LENGTH = 4;
const MIN_CVV_LENGTH = 3;

let cardNumberIsValid = false;
let cardDataIsValid = false;
let cardCvvIsValid = false;
let emailIsValid = false;

const app = el('div', {
  class: 'col-md-4 container d-flex align-items-center justify-content-center',
  id: 'app',
});

setChildren(window.document.body, app);

function createForm(parent) {
  const form = el('form', {
    class: 'col-md-12 d-flex wrap flex-column align-items-center',
  });
  const cardNumberWrapper = el('div', {
    class: 'col-md-12 me-2 mb-2',
  });
  const cardNumberLabel = el('label', {
    for: 'card-number',
    class: 'form-label',
  }, 'Номер карты');
  const cardNumberInner = el('div', {
    class: 'col-md-10 me-2 mb-2 d-flex align-items-center',
  });
  const cardNumberInput = el('input', {
    type: 'text',
    class: 'form-control col-md-10',
    id: 'card-number',
    placeholder: '0000 0000 0000 0000',
  });
  const cardSistemImage = el('div', {
    class: 'col-md-2',
    style: {
      height: '35px',
      'background-repeat': 'no-repeat',
      'background-position': 'center right',
      'background-size': 'auto',
    },
  });
  const cardDataWrapper = el('div', {
    class: 'col-md-12 d-flex mb-3 justify-content-between',
  });
  const cardDataInner = el('div', {
    class: 'me-3',
  });
  const cardDataLabel = el('label', {
    for: 'card-data',
    class: 'form-label',
  }, 'дата окончания действия карты');
  const cardDataInput = el('input', {
    type: 'text',
    class: 'form-control',
    id: 'card-data',
    placeholder: 'ММ/ГГ',
  });
  const cardCvvInner = el('div', {
    class: 'me-3 d-flex align-items-strench flex-column justify-content-between',
  });
  const cardCvvLabel = el('label', {
    for: 'cvv',
    class: 'form-label',
  }, 'CVV');
  const cardCvvInput = el('input', {
    type: 'text',
    class: 'form-control',
    id: 'cvv',
    placeholder: '123',
  });
  const cardEmailWrapper = el('div', {
    class: 'col-md-12 me-2 mb-2',
  });
  const cardEmailLabel = el('label', {
    for: 'email',
    class: 'form-label',
  }, 'email для отправки онлайн-чека');
  const cardEmailInput = el('input', {
    type: 'text',
    class: 'form-control',
    id: 'email',
    placeholder: 'example@example.ru',
  });
  const btn = el('button', {
    class: 'btn btn-primary align-self-end',
    id: 'btn',
    disabled: 'true',
  }, 'Оплатить');

  setChildren(cardNumberInner, [cardNumberInput, cardSistemImage]);
  setChildren(cardNumberWrapper, [cardNumberLabel, cardNumberInner]);
  setChildren(cardDataInner, [cardDataLabel, cardDataInput]);
  setChildren(cardCvvInner, [cardCvvLabel, cardCvvInput]);
  setChildren(cardDataWrapper, [cardDataInner, cardCvvInner]);
  setChildren(cardEmailWrapper, [cardEmailLabel, cardEmailInput]);
  setChildren(form, [cardNumberWrapper, cardDataWrapper, cardEmailWrapper, btn]);
  setChildren(parent, form);

  Inputmask("9999 9999 9999 9999 99").mask(cardNumberInput);
  Inputmask("99/99").mask(cardDataInput);
  Inputmask("9999").mask(cardCvvInput);

  return {
    cardNumberInput,
    cardSistemImage,
    cardDataInput,
    cardCvvInput,
    cardEmailInput,
    btn,
  };
}
const inputsArray = createForm(app);

function validateCardNumber(cardNumber, cardSistem) {
  const cardNumberValue = cardNumber.value.replace(/\D/g, '');
  const res = valid.number(cardNumberValue, { maxLength: MAX_NUMBER_CARD });

  cardNumber.classList.remove('is-invalid', 'is-valid');
  inputsArray.btn.disabled = true;

  if (cardNumberValue.length >= MIN_NUMBER_CARD) {
    if (res.card !== null) {
      const typeCard = res.card.type;
      if (typeCard === 'mir') {
        cardSistem.style.backgroundImage = `url(${mir})`;
      } else if (typeCard === 'visa') {
        cardSistem.style.backgroundImage = `url(${visa})`;
      } else if (typeCard === 'mastercard') {
        cardSistem.style.backgroundImage = `url(${mastercard})`;
      } else if (typeCard === 'maestro') {
        cardSistem.style.backgroundImage = `url(${maestro})`;
      }
    }
  } else {
    cardNumber.style.backgroundImage = '';
  }

  if (res.isValid) {
    cardNumber.classList.add('is-valid');
    cardNumberIsValid = true;
  } else if (!res.isValid && !res.isPotentiallyValid) {
    cardNumber.classList.add('is-invalid');
    cardNumberIsValid = false;
  }
  return cardNumberIsValid;
}

function validateCardData(cardData) {
  const res = valid.expirationDate(cardData.value);
  const cardDataValue = cardData.value.replace(/\D/g, '');

  cardData.classList.remove('is-invalid', 'is-valid');
  inputsArray.btn.disabled = true;

  if ((cardDataValue.length === DATA_LENGTH)
  && (res.year > lastTwoDigitsYear || (res.year === lastTwoDigitsYear && res.month >= realMonth))) {
    cardData.classList.add('is-valid');
    cardDataIsValid = true;
  } else {
    cardData.classList.add('is-invalid');
    cardDataIsValid = false;
  }
  return cardDataIsValid;
}

function validateCardCvv(cardCvv) {
  const cardDCvvValue = cardCvv.value.replace(/\D/g, '');
  cardCvv.classList.remove('is-valid', 'is-invalid');
  if (cardDCvvValue.length < MIN_CVV_LENGTH) {
    cardCvv.classList.add('is-invalid');
    cardCvvIsValid = false;
    inputsArray.btn.disabled = true;
  } else {
    cardCvv.classList.add('is-valid');
    cardCvvIsValid = true;
  }
  return cardCvvIsValid;
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  inputsArray.cardEmailInput.classList.remove('is-valid');
  inputsArray.cardEmailInput.classList.remove('is-invalid');
  if (emailRegex.test(email)) {
    inputsArray.cardEmailInput.classList.add('is-valid');
  } else {
    inputsArray.cardEmailInput.classList.add('is-invalid');
    inputsArray.btn.disabled = true;
  }
  return emailRegex.test(email);
}

function allValid(NumberValid, DataValid, CvvValid, emailValid) {
  if (NumberValid && DataValid && CvvValid && emailValid) {
    inputsArray.btn.disabled = false;
  }
}

inputsArray.cardNumberInput.addEventListener('blur', () => {
  cardNumberIsValid = validateCardNumber(inputsArray.cardNumberInput, inputsArray.cardSistemImage);
  allValid(cardNumberIsValid, cardDataIsValid, cardCvvIsValid, emailIsValid);
});

inputsArray.cardDataInput.addEventListener('blur', () => {
  cardDataIsValid = validateCardData(inputsArray.cardDataInput);
  allValid(cardNumberIsValid, cardDataIsValid, cardCvvIsValid, emailIsValid);
});

inputsArray.cardCvvInput.addEventListener('blur', () => {
  cardCvvIsValid = validateCardCvv(inputsArray.cardCvvInput);
  allValid(cardNumberIsValid, cardDataIsValid, cardCvvIsValid, emailIsValid);
});

inputsArray.cardEmailInput.addEventListener('blur', () => {
  emailIsValid = validateEmail(inputsArray.cardEmailInput.value);
  allValid(cardNumberIsValid, cardDataIsValid, cardCvvIsValid, emailIsValid);
});
