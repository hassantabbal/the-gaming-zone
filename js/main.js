// 1. قاعدة بيانات المنتجات
const products = [
    { 
        id: 1, 
        name: "PS4 Slim 500GB", 
        category: "CONSOLES", 
        price: "850 TND", 
        image: "ps4.webp", 
        desc: "Console Noire + 1 Manette DualShock 4 (État Propre)" 
    },
    { 
        id: 2, 
        name: "PS3 Super Slim", 
        category: "CONSOLES", 
        price: "380 TND", 
        image: "ps3.webp", 
        desc: "Système Classique 250GB + Jeux Installés" 
    },
    { 
        id: 3, 
        name: "DualShock 4 Black", 
        category: "ACCESSORIES", 
        price: "165 TND", 
        image: "man4.webp", 
        desc: "Manette Sans Fil Originale v2" 
    },
    { 
        id: 4, 
        name: "DualSense PS5 White", 
        category: "ACCESSORIES", 
        price: "245 TND", 
        image: "https://m.media-amazon.com/images/I/612bjwBuobS._AC_SL1500_.jpg", 
        desc: "Haptic Feedback (Retour haptique) Original" 
    },
    { 
        id: 5, 
        name: "Xbox Series Controller", 
        category: "ACCESSORIES", 
        price: "220 TND", 
        image: "manxbox.webp", 
        desc: "Carbon Black Wireless - Compatible PC/Xbox" 
    },
    { 
        id: 6, 
        name: "Souris Gaming RGB", 
        category: "GEAR", 
        price: "85 TND", 
        image: "sorie1.webp", 
        desc: "Haute Précision pour Pro Gamers" 
    },
    { 
        id: 7, 
        name: "Logitech G733 RGB", 
        category: "AUDIO", 
        price: "480 TND", 
        image: "Logitech G733 RGB.webp", 
        desc: "Lightspeed Wireless Gaming" 
    }
];

// 2. إدارة سلة المشتريات
let cart = [];
const cartBadge = document.querySelector('.cart-icon .count');

// 3. دالة عرض المنتجات الأساسية
function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="price-row">
                    <span class="price">${product.price}</span> 
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 4. وظيفة الإضافة للسلة مع حفظ السعر
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    
    // تحديث رقم السلة في الهيدر
    if(cartBadge) cartBadge.innerText = cart.length;
    
    // حساب المجموع الكلي وحفظه في الذاكرة (localStorage) لصفحة Checkout
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    localStorage.setItem('totalPrice', total);
    
    alert(`${product.name} ajouté au panier !`);
};

// 5. نظام البحث الفوري
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });
}

// 6. تأثيرات العدادات (Stats Counter)
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 7. تشغيل كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products); // عرض كل المنتجات في البداية
    initCounters(); // تشغيل العدادات
    
    // تأثير الـ Header عند التمرير
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header && window.scrollY > 50) {
            header.style.background = "rgba(10, 10, 12, 0.98)";
            header.style.padding = "10px 0";
        } else if (header) {
            header.style.padding = "20px 0";
        }
    });
});