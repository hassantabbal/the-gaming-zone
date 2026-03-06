// حفظ السلة في ذاكرة المتصفح
function saveCart(cartData) {
    localStorage.setItem('gamingZoneCart', JSON.stringify(cartData));
}

// استرجاع السلة
function loadCart() {
    const data = localStorage.getItem('gamingZoneCart');
    return data ? JSON.parse(data) : [];
}

// حساب المجموع الكلي مع الضريبة
function calculateTotal(items) {
    let subtotal = items.reduce((sum, item) => sum + item.price, 0);
    let tax = subtotal * 0.20; // 20% ضريبة مثلاً
    return {
        subtotal: subtotal,
        tax: tax,
        total: subtotal + tax
    };
}