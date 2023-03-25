import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // КАРТА

  ymaps.ready(init);
  function init() {
    // Создание карты.
    let myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [59.938754, 30.323072],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 16
    });
  }

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
