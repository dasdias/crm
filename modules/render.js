import {getDOMElements} from './getDOMElements.js';
import {goodsItems} from '../modules/goods.js';

// const cmsTotalPrice = document.querySelector('.cms__total-price');
const {
  cmsTotalPrice,
  tableBody,
} = getDOMElements();

// создаем строку в таблице с товаром
export const createRow = ({id, title, price, description,
  category, discont, count, units, images: {small, big}}, index) => {
  const tr = document.createElement('tr');
  const createTD = (tagName, className, content = '', dataAttr = false) => {
    const td = document.createElement(tagName);
    td.className = className.join(' ');
    td.textContent = content;
    if (dataAttr) {
      td.dataset.id = dataAttr;
    }
    return td;
  };
  tr.append(createTD('td', ['table__cell', 'table__cell_left'], index));
  const secondTD = createTD('td',
    ['table__cell', 'table__cell_left', 'table__cell_name'], title, id);
  const spanElem = createTD('span', ['table__cell-id'], id);
  spanElem.insertAdjacentText('afterbegin', 'id: ');
  secondTD.prepend(spanElem);
  tr.append(secondTD);
  tr.append(createTD('td', ['table__cell', 'table__cell_left'], category));
  tr.append(createTD('td', ['table__cell'], units));
  tr.append(createTD('td', ['table__cell'], count));
  tr.append(createTD('td', ['table__cell'], '$' + price));
  tr.append(createTD('td', ['table__cell'], '$' + (count * price)));
  const wrapBtn = createTD('span', ['table__cell', 'table__cell_btn-wrapper']);
  wrapBtn.insertAdjacentElement('afterbegin',
    createTD('button', ['table__btn', 'table__btn_del'], '', id));
  wrapBtn.insertAdjacentElement('afterbegin',
    createTD('button', ['table__btn', 'table__btn_edit']));
  wrapBtn.insertAdjacentElement('afterbegin',
    createTD('button', ['table__btn', 'table__btn_pic']));
  tr.append(wrapBtn);
  return tr;
};

export const addGoodsPage = (tableBody, goods, index) => {
  tableBody.append(createRow(goods, index));
};


export const getTotalAmount = (goodsItems) => {
  let priceTotal = 0;
  goodsItems.forEach(item => {
    priceTotal += item.price * item.count;
  });
  cmsTotalPrice.textContent = `$${priceTotal}`;
};

export const renderGoods = (mass) => { // вставляем товары в таблицу
  tableBody.textContent = '';
  mass.forEach((obj, index) => {
    tableBody.insertAdjacentElement('beforeend', createRow(obj, index + 1));
  });
  getTotalAmount(goodsItems);
};


export const getTotalAmountModal = (count, amount) =>
  `$${(+amount ? +amount : 0) * (+count ? +count : 1)}`;
