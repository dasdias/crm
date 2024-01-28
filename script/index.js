import {goodsItems} from '../modules/goods.js';
import {renderGoods} from '../modules/render.js';
import {allEvents} from '../modules/events.js';
import {closeModal} from '../modules/modal.js';

const init = () => {
  renderGoods(goodsItems);
  closeModal();
  allEvents();
};
init();
