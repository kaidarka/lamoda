const headerCityButton = document.querySelector('.header__city-button');

if (localStorage.getItem('lomoda-location')){
    headerCityButton.textContent = localStorage.getItem('lomoda-location');
}

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';
 

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
});

// блокировка скролла

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.disableScrollY = window.scrollY;
    document.body.style.cssText = `
        top: ${-window.scrollY}px;
        left: 0; 
        position: fixed;
        width: 100%;
        heigh: 100vh; 
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};
const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.disableScrollY,
    })
};
// модальное окно

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () =>{
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () =>{
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('cart__btn-close') || target.classList.contains('cart-overlay')){
        cartModalClose();
    }
});

