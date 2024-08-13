// Chờ DOM tải hoàn toàn cs thể thao tác được với HTMl
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM đã được tải và phân tích cú pháp hoàn toàn');
    initData();
    showProducts();
});

let data = [
    {
        id: 1,
        image: './img/qua-luu.webp',
        name: 'Quả Lựu',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda.'
    },
    {
        id: 2,
        image: './img/qua-xoai-tuong.jpg',
        name: 'Quả Xoài Tượng',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda.'
    },
    {
        id: 3,
        image: './img/qua-xoai.jpg',
        name: 'Quả Xoài',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda.'
    },
    {
        id: 4,
        image: './img/qua-oi.webp',
        name: 'Quả Ổi',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda.'
    },
    {
        id: 5,
        image: './img/qua-man.jpg',
        name: 'Quả Mận',
        date: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, assumenda.'
    }
]
let products = [];
const getDataInStore = key => {
    return localStorage.getItem(key);
}

const setDataInStore = (key, data) => {
    localStorage.setItem(key, data);
}

const initData = () => {
    if (!localStorage.getItem('data')) {
        setDataInStore('data', JSON.stringify(data))
    } else {
        products = JSON.parse(localStorage.getItem('data'));
    }

}

const findProduct = id => {
    return data.find(item => item.id === id);
}

const convertDate = date => {
    // Lấy tháng và ngày
    const options = { month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

const removeClass = (targetClass, className) => {
    let elms = document.getElementsByClassName(targetClass);
    for (let elm of elms) {
        elm.classList.remove(className);
    }
}

const show = id => {
    let product = findProduct(id);
    document.getElementById('name-preview').innerText = product.name;
    document.getElementById('description-preview').innerText = product.description;
    document.getElementById('image-preview').src = product.image;
    removeClass('item', 'active');
    document.querySelector(`.item[data-id='${id}']`).classList.add('active')
}

const showProducts = () => {
    let elmProducts = document.getElementById('list-product');
    let content = '';
    for (let i = 0; i < products.length; i++) {
        let active = i === 0 ? 'active' : '';
        content +=
            `<div class="item ${active}" onclick="show(${products[i].id})" data-id="${products[i].id}">
                <div class="box-image">
                    <img src="${products[i].image}" alt="">
                </div>
                <div class="box-info">
                    <div class="name">${products[i].name}</div>
                    <div class="description">${products[i].description}</div>
                </div>
                <div class="box-date">${convertDate(products[i].date)}</div>
            </div>`
    }

    elmProducts.innerHTML = content;
}
