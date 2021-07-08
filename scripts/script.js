const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

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



// запрос базы данных

const getData  = async () => {
    const data = await fetch('db.json');

    if (data.ok){
        return data.json();
    } else {
        throw new Error(`Ошибка ${data.status} ${data.statusText}`); 
    }
};

const getGoods = (callback, value) => {
    getData()
        .then(data =>{
            if (value){
                callback(data.filter(item => item.category === value))
            }else{
                callback(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
};




subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('cart__btn-close') || target.classList.contains('cart-overlay')){
        cartModalClose();
    }
});

try {
    
    const goodsList = document.querySelector('.goods__list');

    if (!goodsList){
        throw 'This is not a goods page';
    }

    const createCart = ({id, preview, cost, brand, name, sizes}) => {

        const li = document.createElement('li');

        li.classList.add('goods__item');

        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${sizes ? 
                        `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`:
                        ''}
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                </div>
            </article>
        `

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';
        
        for (let i = 0; i < data.length; i++) {
            const card = createCart(data[i]);
            goodsList.append(card);
        }
    };

    
    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);
    });

    getGoods(renderGoodsList, hash);

} catch (err) {
    console.warn(err);
}