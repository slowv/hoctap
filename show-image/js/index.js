// Chờ DOM tải hoàn toàn có thể thao tác được với HTMl
document.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM đã được tải và phân tích cú pháp hoàn toàn');
    // Gọi hàm init data
    await initData()
        // Gọi hàm initData() thành công thì sẽ gọi tiếp showProducts()
        .then(() => showProducts())
        // Gọi hàm showProducts() thành công thì sẽ chạy tiếp block code phía dưới
        .then(() => {
            if (products.length > 0) {
                showPreview(products[0].id)
            }
        });
});
// Dữ liệu ban đầu để lưu vào localstorage
let data = [
    {
        id: 1,
        image: './img/qua-luu.webp',
        name: 'Quả Lựu',
        date: new Date(),
        description: 'Lựu hay còn gọi là thạch lựu (Danh pháp khoa học: Punica granatum) là một loài thực vật ăn quả thân gỗ nhỏ có chiều cao từ 5-8 mét. Lựu có nguồn gốc bản địa Tây Nam Á và được đem trồng tại vùng Kavkaz từ thời cổ đại. '
    },
    {
        id: 2,
        image: './img/qua-xoai-tuong.jpg',
        name: 'Quả Xoài Tượng',
        date: new Date(),
        description: 'Xoài là loại trái cây quen thuộc và được ưa chuộng . Đây là loại quả chứa nhiều chất dinh dưỡng và có lợi cho sức khỏe của chúng ta'
    },
    {
        id: 3,
        image: './img/qua-xoai.jpg',
        name: 'Quả Xoài',
        date: new Date(),
        description: 'Xoài là một loại trái cây vị ngọt thuộc chi Xoài, bao gồm rất nhiều quả cây nhiệt đới, được trồng chủ yếu như trái cây ăn được. '
    },
    {
        id: 4,
        image: './img/qua-oi.webp',
        name: 'Quả Ổi',
        date: new Date(),
        description: 'Ổi là loại trái cây có vỏ ngoài màu xanh đậm và bên trong có những hạt màu trắng vàng được bao bọc bởi một lớp thịt màu trắng đục hoặc hồng.'
    },
    {
        id: 5,
        image: './img/qua-man.jpg',
        name: 'Quả Mận',
        date: new Date(),
        description: 'Quả mận ăn tươi, ép nước, làm mứt, phơi sấy khô. Mứt mận là đặc sản vùng cao phía Bắc, cách làm mứt cũng đơn giản, mận chín mua về rửa sạch, nấu nhỏ lửa khuấy đều cho mận bớt nước, thắng đường cho vào sau, tỉ lệ bằng nhau, nấu đến khi sánh đặc lại là được.'
    }
]
// Array rỗng để chứa product lấy từ localstorage
let products = [];

// Lấy dữ liệu từ localStorage theo key
const getDataInStore = key => {
    return JSON.parse(localStorage.getItem(key));
}

// Set dữ liệu vào localStorage theo key và value
const setDataInStore = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

// Khởi tạo dữ liệu
const initData = async () => {
    // Kiểm tra trong localStorage có key = data hay không
    if (!getDataInStore('data')) {
        // Set dữ liệu vào localStorage
        setDataInStore('data', data)
    }
    // Lấy dữ liệu từ localStorage gán vào biến products
    products = getDataInStore('data');
}

// Tìm kiếm 1 product trong list products theo id
const findProduct = id => {
    return products.find(item => item.id === id);
}

// Chuyển Date thành dạng short VD: 2024-08-13T12:59:51.187Z => May 8
const convertDateShort = date => {
    // Lấy tháng và ngày
    const options = {month: 'short', day: 'numeric'};
    return new Date(date).toLocaleDateString('en-US', options);
}

// Chuyển Date thành dạng short VD: 2024-08-13T12:59:51.187Z => 13/08/2024
const convertDate = value => {
    // Tạo đối tượng Date từ chuỗi
    const date = new Date(value);

    // Lấy ngày, tháng và năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng ngày thành dd/MM/yyyy
    return `${day}/${month}/${year}`;

}

// Xóa class theo class target và xóa class là className
const removeClass = (targetClass, className) => {
    let elms = document.getElementsByClassName(targetClass);
    for (let elm of elms) {
        elm.classList.remove(className);
    }
}

// Hiển thị sản phẩm mình click bên trái để hiển thị chi tiết bên phải
const showPreview = id => {
    // Tìm kiếm sản phẩm với id là sản phẩm mình vừa click
    let product = findProduct(id);

    document.getElementById('name-preview').innerText = product.name;
    document.getElementById('description-preview').innerText = product.description;
    document.getElementById('image-preview').src = product.image;
    document.getElementById('date-preview').innerText = convertDate(product.date);
    // Xóa class item đang active
    removeClass('item', 'active');

    // Thêm class active cho sản phẩm mình vừa click
    document.querySelector(`.item[data-id='${id}']`).classList.add('active')
}

// Hiển thị danh sách sản phẩm bên tay trái
const showProducts = () => {
    let elmProducts = document.getElementById('list-product');
    let content = '';
    for (let i = 0; i < products.length; i++) {
        let active = i === 0 ? 'active' : '';
        content +=
            `<div class="item ${active}" onclick="showPreview(${products[i].id})" data-id="${products[i].id}">
                <div class="box-image">
                    <img src="${products[i].image}" alt="">
                </div>
                <div class="box-info">
                    <div class="name">${products[i].name}</div>
                    <div class="description">${products[i].description}</div>
                </div>
                <div class="box-date">${convertDateShort(products[i].date)}</div>
            </div>`
    }
    elmProducts.innerHTML = content;
}
