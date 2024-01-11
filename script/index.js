'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const panelAddGoods = document.querySelector('.panel__add-goods');
const overlay = document.querySelector('.overlay');
const overlayModal = document.querySelector('.overlay__modal');
const modalClose = document.querySelector('.modal__close');
const tableBody = document.querySelector('.table__body');
const vendorCodeId = document.querySelector('.vendor-code__id');

overlay.classList.remove('active');

const goodsItems = [
  {
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const openModal = () => { // открываем модальное окно
  vendorCodeId.textContent = Date.now();
  overlay.classList.add('active');
};
const closeModal = () => { // закрывает модальное окно
  overlay.classList.remove('active');
};

// отслеживаем клики на модальном окне
overlay.addEventListener('click', (e) => {
  const target = e.target;
  // закрываем модальное окно
  if (target.classList.contains('overlay') || target.closest('.modal__close')) {
    closeModal();
  }
});

// клик на кнопке добавления товара
panelAddGoods.addEventListener('click', () => {
  openModal();
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

// создаем строку в таблице с товаром
const createRow = ({id, title, price, description,
  category, discont, count, units, images: {small, big}}) => {
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
  tr.append(createTD('td', ['table__cell', 'table__cell_left'], id));
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

const renderGoods = (mass) => { // вставляем товары в таблицу
  tableBody.textContent = '';
  mass.forEach(obj => {
    tableBody.insertAdjacentElement('beforeend', createRow(obj));
  });
};

// проверяем чекбокс и блокируем поле дисконт
modalCheckbox.addEventListener('input', () => {
  if (modalCheckbox.checked) {
    console.dir(modalCheckbox);
    modalInputDiscount.removeAttribute('disabled');
  } else {
    modalInputDiscount.value = '';
    modalInputDiscount.setAttribute('disabled', 'true');
  }
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

renderGoods(goodsItems);
