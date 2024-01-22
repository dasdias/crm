import {openModal} from './modal.js';
import {vendorCodeId} from '../modules/modal.js';
import {closeModal} from '../modules/modal.js';
import {goodsItems} from '../modules/goods.js';
import {modalTotalPrice} from './modal.js';
import {addGoodsPage, getTotalAmount, tableBody,
  getTotalAmountModal} from '../modules/render.js';


const modalInputDiscount = document.querySelector('.modal__input_discount');
const modalCheckbox = document.querySelector('.modal__checkbox');
const panelAddGoods = document.querySelector('.panel__add-goods');
const modalForm = document.querySelector('.modal__form');
const price = document.querySelector('#price');
const count = document.querySelector('#count');

export const allEvents = () => {
  console.log('event');
  // проверяем чекбокс и блокируем поле дисконт/
  modalCheckbox.addEventListener('input', () => {
    if (modalCheckbox.checked) {
      modalInputDiscount.removeAttribute('disabled');
    } else {
      modalInputDiscount.value = '';
      modalInputDiscount.setAttribute('disabled', 'true');
    }
  });

  // клик на кнопке добавления товара
  panelAddGoods.addEventListener('click', () => {
    openModal();
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const goodsObj = Object.fromEntries(formData);

    if (goodsObj.discont === 'on') {
      goodsObj.discont = modalInputDiscount.value;
      delete goodsObj.discount_count;
    } else {
      goodsObj.discont = false;
    }
    goodsObj.id = vendorCodeId.textContent;
    if (goodsObj.images.name !== '') {
      goodsObj.images = {
        'big': `img/${goodsObj.images.name}`,
        'small': '',
      };
    } else {
      goodsObj.images = {
        'big': '',
        'small': '',
      };
    }
    goodsItems.push(goodsObj);
    addGoodsPage(tableBody, goodsObj);
    getTotalAmount(goodsItems);
    closeModal();
    modalForm.reset();
  });

  price.addEventListener('blur', () => {
    const count = document.querySelector('#count');
    modalTotalPrice.textContent =
    getTotalAmountModal(count.value, price.value);
  });

  count.addEventListener('blur', () => {
    const count = document.querySelector('#count');
    modalTotalPrice.textContent =
    getTotalAmountModal(count.value, price.value);
  });

  tableBody.addEventListener('click', (e) => { // отслеживаем клики по таблице
    const target = e.target;
    // кликаем по кнопке удалить. Удаляем элемент из DOM и объект их базы
    if (target.closest('.table__btn_del')) {
      const etemId = target.dataset.id;
      const index = goodsItems.findIndex(item => item.id === +etemId);
      goodsItems.splice(index, 1);
      console.log('goodsItems: ', goodsItems);
      target.closest('tr').remove();
    }
  });
};
