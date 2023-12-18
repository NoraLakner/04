let products = [];
let initialDataAdded = false;

function addProduct(name, price) {
    const productsContainer = document.getElementById('products-container');

    if (products.length < 6) {
        const productIndex = products.length + 1;

        const nameLabel = document.createElement('label');
        nameLabel.for = `productName${productIndex}`;
        nameLabel.innerText = `Termék ${productIndex} neve:`;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = `productName${productIndex}`;
        nameInput.value = name || '';

        const priceLabel = document.createElement('label');
        priceLabel.for = `productPrice${productIndex}`;
        priceLabel.innerText = `Termék ${productIndex} ára:`;
        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.id = `productPrice${productIndex}`;
        priceInput.value = price || '';

        productsContainer.appendChild(nameLabel);
        productsContainer.appendChild(nameInput);
        productsContainer.appendChild(priceLabel);
        productsContainer.appendChild(priceInput);

        products.push({ name: nameInput, price: priceInput });
    }
}

function addInitialData() {
    if (!initialDataAdded) {
        for (let i = 1; i <= 6; i++) {
            addProduct(`Név${i}`, Math.floor(Math.random() * 100) + 1);
        }
        initialDataAdded = true;

        document.getElementById('initial-data-button').classList.add('disabled');
    }
}

function selectRandomProduct() {
    const cheapestProducts = [...products].sort((a, b) => a.price.value - b.price.value).slice(0, 2);
    const randomCheapestProduct = cheapestProducts[Math.floor(Math.random() * cheapestProducts.length)].name.value;

    document.getElementById('result').innerText = `Két legolcsóbb termék egyike: ${randomCheapestProduct}`;
    document.getElementById('output-container').style.display = 'block';
}

function calculateStatistics() {
    const productPrices = products.map(product => parseFloat(product.price.value));

    const totalPrices = productPrices.reduce((sum, price) => sum + price, 0);
    const averagePrice = totalPrices / productPrices.length;

    const priceDifferences = productPrices.map(price => Math.pow(price - averagePrice, 2));
    const priceRange = Math.sqrt(priceDifferences.reduce((sum, diff) => sum + diff, 0) / productPrices.length);

    document.getElementById('result').innerText = `átlagár ${averagePrice.toFixed(2)}, szórás ${priceRange.toFixed(2)}`;
    document.getElementById('output-container').style.display = 'block';
}