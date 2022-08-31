const formDiv = document.querySelector('.form-div');
const completedDiv = document.querySelector('.completed-div');
const formBtn = document.querySelector('.form-button');
const completedBtn = document.querySelector('.completed-button');
const cardNumberField = document.querySelector('.card-number-field');
const cardHolderField = document.querySelector('.cardholder-field');
const expDateMMField = document.querySelector('[data-js="exp-date-MM-field"]');
const expDateYYField = document.querySelector('[data-js="exp-date-YY-field"]');
const cvcField = document.querySelector('.cvc-field');
const cardHolder = document.querySelector('[data-js="cardholder"]');
const cardNumber = document.querySelector('[data-js="card-number"]');
const expDateMM = document.querySelector('[data-js="exp-date-MM"]');
const expDateYY = document.querySelector('[data-js="exp-date-YY"]');
const cvc = document.querySelector('[data-js="cvc"]');
const cardHolderError = document.querySelector('.cardholder-error');
const cardNumberError = document.querySelector('.card-number-error');
const expDateError = document.querySelector('.exp-date-error');
const cvcError = document.querySelector('.cvc-error');

function removeFormData() {
  cardNumber.value = '';
  cardHolder.value = '';
  expDateMM.value = '';
  expDateYY.value = '';
  cvc.value = '';
}

function showThankYou() {
  formDiv.classList.add('finished');
  completedDiv.classList.add('active');
}

function unshowThankYou() {
  formDiv.classList.remove('finished');
  completedDiv.classList.remove('active');
  removeFormData();
}

function setCardNumberString(value) {
  let match = value.match(/([0-9][0-9][0-9][0-9])$/);
  let fourNumberArray = value.match(/([0-9][0-9][0-9][0-9])/g);

  if(!value) {
    cardNumberField.textContent = '0000 0000 0000 0000'
    return;
  }
  if(fourNumberArray !== null && fourNumberArray.length === 4) {
    cardNumberField.textContent = Array.prototype.map.call(fourNumberArray, (item, i) => {
      if(i === 3) {
        return item;
      }
      return item.concat(' ')
    }).join('');
    return;
  }
  if(match !== null) {
    cardNumberField.textContent = Array.prototype.map.call(fourNumberArray, item => item.concat(' ')).join('');
    return;
  }
  cardNumberField.textContent = value;
}

function getCardNumberThisValue(value) {
  let match = value.match(/([0-9][0-9][0-9][0-9])$/);
  let fourNumberArray = value.match(/[0-9][0-9][0-9][0-9]/g);

 
  if(match !== null) {
    return value += ' ';
  }
  if(fourNumberArray !== null && fourNumberArray.length === 4) {
    return value = Array.prototype.map.call(fourNumberArray, (item, i) => {
      if(i === 3) {
        return item;
      }
      return item.concat(' ')
    }).join('');
  }
  return value;
}

function setExpDateStringMM(value) {
  if(!value)
    return '00';
  if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '1')
    return value + '0';

  return value;
}

function setExpDateStringYY(value) {
  if(!value)
    return '0000';
  if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '1')
    return value + '000'
  if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '2')
    return value + '00'
  if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '3')
    return value + '0'
  if(Number(value) >= 10 && Number(value) <= 99 && String(value.length) === '2')
    return value + '00';
  if(Number(value) >= 10 && Number(value) <= 99 && String(value.length) === '3')
    return value + '0';
  if(Number(value) >= 100 && Number(value) <= 999 && String(value.length) === '3')
    return value + '0';

  return value;
}

function setCvcString(value) {
  if(!value)
    return '000';
  if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '1')
    return value + '00';
    if(Number(value) >= 0 && Number(value) <= 9 && String(value.length) === '2')
    return value + '0';
  if(Number(value) >= 10 && Number(value) <= 99 && String(value.length) === '2')
    return  value + '0';
  if(Number(value) >= 10 && Number(value) <= 99 && String(value.length) === '3')
    return  value;

  return value;
}

function checkEverything() {
  let cardNumberHasError = checkCardNumberInput.call(cardNumber);
  let cardHolderHasError = checkCardHolderInput.call(cardHolder);
  let expDateMMHasError = checkExpDateMMInput.call(expDateMM);
  let expDateYYHasError = checkExpDateYYInput.call(expDateYY);
  let cvcHasError = checkCvcInput.call(cvc);
  let errors = [cardNumberHasError, cardHolderHasError, expDateMMHasError, expDateYYHasError, cvcHasError];

  checkCardNumberInput.call(cardNumber);
  checkCardHolderInput.call(cardHolder);
  checkExpDateMMInput.call(expDateMM);
  checkExpDateYYInput.call(expDateYY);
  checkCvcInput.call(cvc);

  if(errors.every(item => item === false)) {
    showThankYou();
    
  }
}

function handleCardNumberInput(e) {
  if(e.keyCode === 32) {
    e.preventDefault();
    return;
  }
  this.value = this.value.replace(/[^0-9|\s]/, '');
  setCardNumberString(this.value);
  console.log(e.keyCode)
  if(e.keyCode === 8) {
    if(this.value === '') {
      setCardNumberString(this.value);
      return;
    }
    this.value = this.value;
    cardNumberField.textContent = this.value;
    return;
  }
  this.value = getCardNumberThisValue(this.value);
}

function checkCardNumberInput() {
  if(this.value === '') {
    cardNumberError.textContent = "Can't be blank.";
    cardNumber.classList.add('input-error');
    return true;
  }
  if(this.value.length < 19) {
    cardNumberError.textContent = "Must have all 16 digits.";
    cardNumber.classList.add('input-error');
    return true;
  }
  return false;
}

function removeCardNumberError() {
  cardNumberError.textContent = '';
  cardNumber.classList.remove('input-error');
}

function handleCardHolderInput() {
  this.value = this.value.replace(/([^a-z|A-Z|\s])/g, '');
  cardHolderField.textContent = this.value;
}

function checkCardHolderInput() {
  if(this.value === '') {
    cardHolderError.textContent = "Can't be blank."
    this.classList.add('input-error');
    return true;
  }
  return false;
}

function removeCardHolderError() {
  cardHolderError.textContent = '';
  this.classList.remove('input-error');
}

function handleExpDateMMInput() {
  this.value = this.value.replace(/([^0-9])/g, '');
  expDateMMField.textContent = setExpDateStringMM(this.value);
}

function checkExpDateMMInput() {

  if(this.value === '') {
    expDateError.textContent = "Can't be blank.";
    this.classList.add('input-error');
    return true;
  }
  if(this.value.length < 2) {
    expDateError.textContent = 'Must have all 2 digits.';
    this.classList.add('input-error');
    return true;
  }
  if(this.value > 12) {
    expDateError.textContent = 'The year only has 12 months.'
    this.classList.add('input-error');
    return true;
  }
  if(this.value === '00') {
    expDateError.textContent = "Month 0 doesn't exist."
    this.classList.add('input-error');
    return true;
  }
  return false;
}

function removeExpDateMMError() {
  expDateError.textContent = '';
  expDateMM.classList.remove('input-error');
}

function handleExpDateYYInput() {
  this.value = this.value.replace(/([^0-9])/g, '');
  expDateYYField.textContent = setExpDateStringYY(this.value);
}

function checkExpDateYYInput() {
  if(this.value === '') {
    expDateError.textContent = "Can't be blank.";
    this.classList.add('input-error');
    return true;
  }
  if(this.value.length < 4) {
    expDateError.textContent = 'Must have all 4 digits.';
    this.classList.add('input-error');
    return true;
  }
  if(this.value < 2022) {
    expDateError.textContent = 'Card expired.';
    this.classList.add('input-error');
    return true;
  }
  if(this.value > 2050) {
    expDateError.textContent = "Exp. dates should only go 'til 2050.";
    this.classList.add('input-error');
    return true;
  }
  return false;
}

function removeExpDateYYError() {
  expDateError.textContent = '';
  expDateYY.classList.remove('input-error');
}

function handleCvcInput() {
  this.value = this.value.replace(/([^0-9])/g, '');
  cvcField.textContent = setCvcString(this.value);
}

function checkCvcInput() {
  if(this.value === '') {
    cvcError.textContent = "Can't be blank.";
    cvc.classList.add('input-error');
    return true;
  }
  if(this.value.length < 3) {
    cvcError.textContent = "Must have all 3 digits.";
    cvc.classList.add('input-error');
    return true;
  }
  return false;
}

function removeCvcError() {
  cvcError.textContent = '';
  cvc.classList.remove('input-error');
}

function handleClick(e) {
  e.preventDefault();
  checkEverything();
}

cardNumber.addEventListener('keyup', handleCardNumberInput);
cardNumber.addEventListener('keydown', handleCardNumberInput);
cardNumber.addEventListener('focus', removeCardNumberError);
cardNumber.addEventListener('blur', checkCardNumberInput);
cardHolder.addEventListener('input', handleCardHolderInput);
cardHolder.addEventListener('focus', removeCardHolderError);
cardHolder.addEventListener('blur', checkCardHolderInput);
expDateMM.addEventListener('input', handleExpDateMMInput);
expDateMM.addEventListener('focus', removeExpDateMMError);
expDateMM.addEventListener('blur', checkExpDateMMInput);
expDateYY.addEventListener('input', handleExpDateYYInput);
expDateYY.addEventListener('focus', removeExpDateYYError);
expDateYY.addEventListener('blur', checkExpDateYYInput);
cvc.addEventListener('input', handleCvcInput);
cvc.addEventListener('focus', removeCvcError);
cvc.addEventListener('blur', checkCvcInput);
formBtn.addEventListener('click', handleClick);
completedBtn.addEventListener('click', unshowThankYou);