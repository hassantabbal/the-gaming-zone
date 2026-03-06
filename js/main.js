const products = [
  
        { 
            id: 1, 
            name: "PS4 Slim 500GB", 
            category: "CONSOLES", 
            price: "850 TND", 
            image: "../images/ps4.webp", 
            desc: "Console Noire + 1 Manette DualShock 4 (État Propre)" 
        },
        { 
            id: 2, 
            name: "PS3 Super Slim", 
            category: "CONSOLES", 
            price: "380 TND", 
            image: "../images/ps3.webp", 
            desc: "Système Classique 250GB + Jeux Installés" 
        },
        { 
            id: 3, 
            name: "DualShock 4 Black", 
            category: "ACCESSORIES", 
            price: "165 TND", 
            image: "../images/man4.webp", 
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
            image: "../images/manxbox.webp", 
            desc: "Carbon Black Wireless - Compatible PC/Xbox" 
        },
        { 
            id: 6, 
            name: "Souris Gaming RGB", 
            category: "GEAR", 
            price: "85 TND", 
            image: "../images/sorie1.webp", 
            desc: "Haute Précision pour Pro Gamers" 
        },
        { id: 7, name: "Logitech G733 RGB", category: "AUDIO", price: "480 TND", image: "../images/Logitech G733 RGB.webp", desc: "Lightspeed Wireless Gaming" },
    ];
    
    // دالة عرض المنتجات بتنسيق احترافي
    function displayProducts() {
        const productList = document.getElementById('product-list');
        if(!productList) return;
    
        productList.innerHTML = products.map(product => `
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
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    document.addEventListener('DOMContentLoaded', displayProducts);
      


// وظيفة عرض المنتجات في الصفحة
function renderShop() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ""; // مسح المنتجات القديمة

    products.forEach(item => {
        productList.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-info">
                    <span class="category">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="price-row">
                        <span class="price">${item.price}</span>
                        <button class="add-btn">+ Add</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderShop);

// 2. إدارة سلة المشتريات
let cart = [];
const cartBadge = document.querySelector('.cart-icon .count');

// 3. وظيفة عرض المنتجات في الصفحة
function displayProducts() {
    const productList = document.getElementById('product-list');
    
    // تفريغ المحتوى الحالي (إن وجد)
    productList.innerHTML = "";

    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <span class="category-tag">${product.category}</span>
                    <h3>${product.name}</h3>
                    <p class="specs">${product.specs}</p>
                    <div class="price-row">
                        <span class="price">${product.price} €</span>
                        <button onclick="addToCart(${product.id})" class="add-btn">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

// 4. وظيفة الإضافة للسلة
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    
    // تحديث الرقم في السلة
    cartBadge.innerText = cart.length;
    
    // تأثير بصري بسيط
    alert(`${product.name} ajouté au panier !`);
};

// 5. تشغيل الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // تأثير الـ Header عند التمرير (Sticky Scroll)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.background = "rgba(10, 10, 12, 0.98)";
        } else {
            header.style.padding = "20px 0";
        }
    });
});
// البحث الفوري عن المنتجات
const searchInput = document.querySelector('.search-bar input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // تصفية المنتجات بناءً على الاسم أو الفئة
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) || 
                   product.category.toLowerCase().includes(searchTerm);
        });

        // إعادة عرض المنتجات المصفاة فقط
        renderFilteredProducts(filteredProducts);
    });
}

function renderFilteredProducts(filteredList) {
    const productList = document.getElementById('product-list') || document.getElementById('shop-grid');
    if (!productList) return;

    productList.innerHTML = "";
    
    if (filteredList.length === 0) {
        productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-gray);">Aucun produit trouvé... 🔍</p>`;
        return;
    }

    filteredList.forEach(product => {
        // نستخدم نفس كود عرض البطاقة الذي كتبناه سابقاً
        productList.innerHTML += `
            <div class="product-card">
                <div class="product-img"><img src="${product.image}"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price-row">
                        <span class="price">${product.price} €</span>
                        <button onclick="addToCart(${product.id})" class="add-btn">Add</button>
                    </div>
                </div>
            </div>`;
    });
}
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