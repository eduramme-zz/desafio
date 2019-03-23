// Função do JSONP
var direita = 0;
var esquerda = 0;

function createProductContainer() {
    var div = document.createElement('div');
    div.setAttribute('class', 'product');
    return div;
}

function createImageElement(imageUrl){
    var image = document.createElement('img');
    image.src = imageUrl;
    return image;
}

function createProductName(productName) {
    var name = document.createElement('p');
    name.setAttribute('class', 'name');
    name.innerHTML = productName;
    return name;
}

function createOldPrice(oldPrice) {
    var old = document.createElement('p');
    old.setAttribute('class', 'oldPrice');
    old.innerHTML = "de: " + oldPrice + "";
    return old;
}

function createPrice(price, reference) {
    var vPrice = document.createElement('p');
    vPrice.setAttribute('class', 'price');
    vPrice.innerHTML = "por: " + price + " <span class = 'payment' > " + reference.productInfo.paymentConditions + " </span> sem juros!!";
    return vPrice;
}

function createReferenceProduct(reference) {

    // cria uma div dentro de container --Reference
    var productContainer = createProductContainer();
    // cria uma imagem -- Reference
    var image = createImageElement(reference.imageName);
    // Gera o reference name
    var name = createProductName(reference.name);
    // cria o preço antingo --Reference
    if (reference.oldPrice) {
        var oldPrice = createOldPrice(reference.oldPrice);
    }
    // cria o preço
    var price = createPrice(reference.price, reference);


    // Coloca todos os elementos entao criados dentro da div inicial -- Reference
    productContainer.appendChild(image);
    productContainer.appendChild(name);
    productContainer.appendChild(oldPrice);
    productContainer.appendChild(price);
    document.getElementById('reference').appendChild(productContainer);
}

function createSuggestedProduct(product) {
    // cria uma div dentro de container
    var div = document.createElement('div');
    div.setAttribute('class', 'product');

    // cria uma imagem
    var image = createImageElement(product.imageName);

    // cria o nome 
    var name = document.createElement('p');
    name.setAttribute('class', 'name');
    name.innerHTML = product.name;

    // cria o preço antingo
    if (product.oldPrice) {
        var oldPrice = document.createElement('p');
        oldPrice.setAttribute('class', 'oldPrice');
        oldPrice.innerHTML = "de: " + product.oldPrice + "";
    }

    // cria o preço
    var price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.innerHTML = "por: <span class = 'big'>" + product.price + " </span><span class = 'payment' > " + product.productInfo.paymentConditions + " </span> sem juros!!";

    // Coloca todos os elementos entao criados dentro da div inicial
    div.appendChild(image);
    div.appendChild(name);
    if (product.oldPrice){
        div.appendChild(oldPrice);
    }
    div.appendChild(price);

    document.getElementById('container').appendChild(div);
}

// Move os slides para a direita
function slideDireita() {
    direita++;
    document.querySelectorAll('.product')[1].style.marginLeft = direita * (-800) + esquerda * 800 + 5;
    if (direita - esquerda > 0) {
        // disable esquerda button
        document.getElementById('esquerda').disabled = false;
        document.getElementById('esquerda').style.borderRight = "25px solid darkblue";
        // able direita button
        document.getElementById('direita').disabled = true;
        document.getElementById('direita').style.borderLeft = "25px solid grey";
    }
}

// Move os Slides para a esquerda
function slideEsquerda() {
    esquerda++;
    document.querySelectorAll('.product')[1].style.marginLeft = direita * (-800) + esquerda * 800 + 5;
    if (direita - esquerda <= 0) {
        // disable esquerda button
        document.getElementById('esquerda').disabled = true;
        document.getElementById('esquerda').style.borderRight = "25px solid grey";
        // able direita button
        document.getElementById('direita').disabled = false;
        document.getElementById('direita').style.borderLeft = "25px solid darkblue";
    }
}

function bindArrowClickEvent(arrows){
    arrows.forEach(function(arrow){
        var correctCallback = arrow.id === 'direita' ? slideDireita : slideEsquerda;
        arrow.addEventListener('click', correctCallback);
    })
}

function X(data) {

    var info = data;
    var products = info.data.recommendation;
    var reference = info.data.reference.item;

    // CRIAR FUNÇÃO RETORNANDO O PRODUTO

    createReferenceProduct(reference);

    for (var index = 0; index < products.length; index++) {
        var currentProduct = products[index];
        createSuggestedProduct(currentProduct);
    }

    // for (i = 0; i < products.length; i++) {
    //     console.log(info.data.recommendation[i].name);

    //     // cria uma div dentro de container
    //     var div = document.createElement('div');
    //     div.setAttribute('class', 'product');

    //     // cria uma imagem
    //     var image = document.createElement('img');
    //     image.src = info.data.recommendation[i].imageName;

    //     // cria o nome 
    //     var name = document.createElement('p');
    //     name.setAttribute('class', 'name');
    //     name.innerHTML = info.data.recommendation[i].name;

    //     // cria o preço antingo
    //     if (info.data.recommendation[i].oldPrice != null) {
    //         var oldPrice = document.createElement('p');
    //         oldPrice.setAttribute('class', 'oldPrice');
    //         oldPrice.innerHTML = "de: " + info.data.recommendation[i].oldPrice + "";
    //     }

    //     // cria o preço
    //     var price = document.createElement('p');
    //     price.setAttribute('class', 'price');
    //     price.innerHTML = "por: <span class = 'big'>" + info.data.recommendation[i].price + " </span><span class = 'payment' > " + info.data.recommendation[i].productInfo.paymentConditions + " </span> sem juros!!";

    //     // Coloca todos os elementos entao criados dentro da div inicial
    //     div.appendChild(image);
    //     div.appendChild(name);
    //     div.appendChild(oldPrice);
    //     div.appendChild(price);

    //     document.getElementById('container').appendChild(div);
    // }

    // Setando os botoes que mandam pra direita ou esquerda
    // document.getElementById('direita').addEventListener("click", slideDireita);
    // document.getElementById('esquerda').addEventListener("click", slideEsquerda);

    var arrows = document.querySelectorAll('#arrows button');
    bindArrowClickEvent(arrows);

    // function bindArrowClickEvent(arrows){
    //     arrows.forEach(function(arrow){
    //         var correctCallback = arrow.id === 'direita' ? slideDireita : slideEsquerda;
    //         arrow.addEventListener('click', correctCallback);
    //     })
    // }

    document.getElementById('direita').disabled = false;
    document.getElementById('esquerda').disabled = true;

    // Definindo a contadora de clicks
    document.getElementById('esquerda').style.borderRight = "25px solid grey";
}