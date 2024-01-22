export const modalTotalPrice = document.querySelector('.modal__total-price');
export const vendorCodeId = document.querySelector('.vendor-code__id');

const overlay = document.querySelector('.overlay');

export const openModal = () => { // открываем модальное окно
  vendorCodeId.textContent = Date.now();
  overlay.classList.add('active');
  modalTotalPrice.textContent = '$0';
};

export const closeModal = () => { // закрывает модальное окно
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
