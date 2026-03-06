const components = {
    cpu: [
        { name: "Intel Core i9-14900K", price: 589 },
        { name: "AMD Ryzen 9 7950X", price: 549 }
    ],
    gpu: [
        { name: "NVIDIA RTX 4090", price: 1699 },
        { name: "NVIDIA RTX 4080 Super", price: 999 }
    ],
    ram: [
        { name: "32GB DDR5 6000MHz", price: 120 },
        { name: "64GB DDR5 6000MHz", price: 230 }
    ]
};

let currentBuild = {
    cpu: { name: "", price: 0 },
    gpu: { name: "", price: 0 },
    ram: { name: "", price: 0 }
};

function updatePrice() {
    const total = currentBuild.cpu.price + currentBuild.gpu.price + currentBuild.ram.price;
    document.getElementById('total-build-price').innerText = total.toFixed(2) + " €";
}

// دالة بسيطة للمحاكاة (في الموقع الحقيقي ستفتح Modal بها قائمة المنتجات)
function selectComponent(type, index) {
    const item = components[type][index];
    currentBuild[type] = item;
    document.getElementById(`selected-${type}`).innerText = item.name + " (" + item.price + " €)";
    updatePrice();
}

// مثال للتشغيل المبدئي
window.onload = () => {
    // محاكاة اختيار المستخدم
    console.log("PC Builder Ready");
};