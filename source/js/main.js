import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // КАРТА

  ymaps.ready(function () {
    const myMap = new ymaps.Map('map', {
      center: [59.937584989234644, 30.322661991559418],
      zoom: 16,
    }, {
      searchControlProvider: 'yandex#search',
    }),
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/svg/marker.svg',
        iconImageSize: [18, 22],
        iconImageOffset: [-9, -11]
      });

    myMap.geoObjects
        .add(myPlacemark);
  });

  // ЧЕКБОКС В ФОРМЕ

  let checkbox = document.querySelector('input[name="agreement"]');
  let checkboxLabel = document.querySelector('label[for="agreement"]');
  let form = document.querySelector('form[name="booking-form"]');

  let erorrCheckbox = document.createElement('div');
  erorrCheckbox.textContent = 'Необходимо дать согласие';
  erorrCheckbox.setAttribute('id', 'errorCheckbox');
  erorrCheckbox.setAttribute('class', 'booking-form__error');

  if (checkbox) {

    let onCheckboxLabelKeydown = function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        if (!checkbox.checked) {
          checkbox.checked = true;
          if (form.querySelectorAll('#errorCheckbox').length > 0) {
            form.removeChild(erorrCheckbox);
          }
        } else {
          checkbox.checked = false;
        }
      }
    };

    let onSubmitForm = function (e) {
      e.preventDefault();
      if (checkbox.checked) {
        form.submit();
      } else {
        if (form.querySelectorAll('#errorCheckbox').length === 0) {
          form.appendChild(erorrCheckbox);
        }
      }
    };

    checkboxLabel.addEventListener('keydown', onCheckboxLabelKeydown);
    form.addEventListener('submit', onSubmitForm);
  }

  //  МАСКА ДЛЯ ВВОДА НОМЕРА ТЕЛЕФОНА
  let phoneInput = document.querySelectorAll('input[type=tel]');

  if (phoneInput) {
    let getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '');
    };

    let onPhoneInput = function (e) {
      let input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      let formatedInputValue = '';

      if (!inputNumbersValue) {
        input.value = '';
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        // russian number
        if (inputNumbersValue[0] === '9') {
          inputNumbersValue = '7' + inputNumbersValue;
        }
        let firstSymbols = '+7(';
        formatedInputValue = firstSymbols;

        if (inputNumbersValue.length > 1) {
          formatedInputValue += inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        // not russian number
        formatedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }

      input.value = formatedInputValue;
    };

    let onPhonedelete = function (e) {
      let input = e.target;
      if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = '';
      }
    };

    for (let i = 0; i < phoneInput.length; i++) {
      let input = phoneInput[i];
      input.addEventListener('input', onPhoneInput);
      input.addEventListener('keydown', onPhonedelete);
    }
  }

  // МОБИЛЬНОЕ МЕНЮ
  let navigation = document.querySelector('.navigation');
  let navigationButton = document.querySelector('#navigation-button');
  let navigationLinkArray = navigation.querySelectorAll('a');
  let background = document.querySelector('.background');

  let onNavigationLinkClick = function () {
    navigation.classList.remove('navigation--open');
    navigationButton.classList.remove('navigation__button--open');
    navigationButton.classList.add('navigation__button--close');
    background.classList.remove('background--open');

    for (let i = 0; navigationLinkArray.length > i; i++) {
      navigationLinkArray[i].removeEventListener('click', onNavigationLinkClick);
    }
    background.removeEventListener('click', onBackgroundClick);
  };

  let onBackgroundClick = function () {
    navigation.classList.remove('navigation--open');
    background.classList.remove('background--open');
    navigationButton.classList.remove('navigation__button--open');
    navigationButton.classList.add('navigation__button--close');

    for (let i = 0; navigationLinkArray.length > i; i++) {
      navigationLinkArray[i].removeEventListener('click', onNavigationLinkClick);
    }
    background.removeEventListener('click', onBackgroundClick);
  };

  let onNavigationButtonClick = function () {
    navigation.classList.toggle('navigation--open');
    navigationButton.classList.toggle('navigation__button--open');
    navigationButton.classList.toggle('navigation__button--close');
    background.classList.toggle('background--open');

    for (let i = 0; navigationLinkArray.length > i; i++) {
      navigationLinkArray[i].addEventListener('click', onNavigationLinkClick);
    }
    background.addEventListener('click', onBackgroundClick);
  };

  navigationButton.addEventListener('click', onNavigationButtonClick);

  iosVhFix();

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  // window.addEventListener('load', () => {
  //   initModals();
  //   const form = new Form();
  //   window.form = form;
  //   form.init();
  // });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
