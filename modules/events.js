import {getDOMElements} from './getDOMElements.js';
import {openModal} from './modal.js';
import {closeModal} from '../modules/modal.js';
import {goodsItems} from '../modules/goods.js';
import {
  addGoodsPage,
  getTotalAmount,
  getTotalAmountModal,
  createRow,
} from '../modules/render.js';

const {
  modalTotalPrice,
  vendorCodeId,
  modalInputDiscount,
  modalCheckbox,
  panelAddGoods,
  modalForm,
  price,
  count,
  tableBody,
} = getDOMElements();

export const allEvents = () => {
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
    addGoodsPage(tableBody, goodsObj, goodsItems.length);
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
      tableBody.textContent = '';
      goodsItems.map((elem, index) => {
        tableBody.append(createRow(elem, index + 1));
      });
      getTotalAmount(goodsItems);
    }
    if (target.closest('.table__btn_pic')) {
      const picBtn = target.closest('.table__btn_pic');
      const dataPicUrl = picBtn.dataset.pic;
      const windowImg = window.open('about:blank', '', `width=640, height=440,
        left=${(screen.width / 2) - 320},
        top=${(screen.height / 2) - 220}`);
      windowImg.document.body.innerHTML = `
        <div style="display: flex; 
          justify-content: center; aligln-item: center;">
          <img style="text-align: center;"
            src="${dataPicUrl}" alt="foto" /></div>`;
    }
  });
};
