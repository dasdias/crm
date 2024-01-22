import {goodsItems} from '../modules/goods.js';
import {renderGoods} from '../modules/render.js';
import {allEvents} from '../modules/events.js';
import {closeModal} from '../modules/modal.js';

// const modalTitle = document.querySelector('.modal__title');
// const overlayModal = document.querySelector('.overlay__modal');
// const modalClose = document.querySelector('.modal__close');

const init = () => {
  renderGoods(goodsItems);
  closeModal();
  allEvents();
};
init();
