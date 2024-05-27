const modalFile = document.querySelector('.modal__file');
const modalFieldset = document.querySelector('.modal__fieldset');

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

const modalPrev = () => {
  const modalOverlay = document.createElement('div');
  const modalbody = document.createElement('div');
  const button = document.createElement('botton');
  button.textContent = 'Ok';
  button.style.cssText = `
    display: block;
    max-width: 50px;
    background-color: #e7e7e7;
    border-radius: 5px;
    padding: 5px 8px;
    text-align: center;
    margin: 20px auto;
    cursor: pointer;
  `;
  modalOverlay.append(modalbody);
  modalOverlay.append(button);
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  return {modalOverlay, modalbody, button};
};
const {modalOverlay, modalbody, button} = modalPrev();

button.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  modalOverlay.remove();
});

modalOverlay.addEventListener('click', () => {
  modalOverlay.remove();
});
modalFile.addEventListener('change', async () => {
  const textWorningImg = document.createElement('label');
  textWorningImg.classList.add('.warn-text');

  console.log(modalFieldset);
  console.log(modalFieldset.querySelector('.warn-text'));
  if (modalFieldset.querySelector('.warn-text')) {
    console.log('label');
    modalFieldset.querySelector('.warn-text').remove();
  }
  if (modalFile.files.length > 0 && modalFile.files[0].size < 1048576) {
    const src = URL.createObjectURL(modalFile.files[0]);
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
      max-width: 500px;
      width: 100%;
    `;
    modalbody.innerText = '';
    modalbody.prepend(img);
    document.body.append(modalOverlay);
    const result = await toBase64(modalFile.files[0]);
    textWorningImg.innerText = modalFile.files[0].name;
    textWorningImg.style.cssText = `
      color: black;
      font-size: 16px;
      font-weight: 700;
      word-break: break-all;
    `;
    modalFieldset.append(textWorningImg);
  } else {
    textWorningImg.style.cssText = `
      color: tomato;
      font-size: 16px;
      font-weight: 700;
    `;
    textWorningImg.innerHTML = `Изображение не должно превышать размер 1 МБ`;
    modalFieldset.append(textWorningImg);
  }
});
