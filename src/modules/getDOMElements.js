export const getDOMElements = () => {
  const modalTotalPrice = document.querySelector('.modal__total-price');
  const vendorCodeId = document.querySelector('.vendor-code__id');
  const overlay = document.querySelector('.overlay');

  const modalInputDiscount = document.querySelector('.modal__input_discount');
  const modalCheckbox = document.querySelector('.modal__checkbox');
  const panelAddGoods = document.querySelector('.panel__add-goods');
  const modalForm = document.querySelector('.modal__form');
  const price = document.querySelector('#price');
  const count = document.querySelector('#count');

  const cmsTotalPrice = document.querySelector('.cms__total-price');
  const tableBody = document.querySelector('.table__body');

  return {
    overlay,
    modalTotalPrice,
    vendorCodeId,
    modalInputDiscount,
    modalCheckbox,
    panelAddGoods,
    modalForm,
    price,
    count,
    cmsTotalPrice,
    tableBody,
  };
};
