// contadora das setas para a direita e para a esquerda
var left = 0;
var right = 0;

// cria uma div dentro de container
function createProductContainer() {
    var objDiv = document.createElement('div');
    objDiv.setAttribute('class', 'product');
    return objDiv;
}

// cria uma imagem
function createImageElement(imageUrl){
    var objImage = document.createElement('img');
    objImage.src = imageUrl;
    return objImage;
}

// Gera o reference name
function createProductName(productName) {
    var objName = document.createElement('p');
    objName.setAttribute('class', 'name');
    objName.innerHTML = productName.substr(0, 75) + "...";
    return objName;
}

// cria o preço antigo
function createOldPrice(oldPrice) {
    var objOldPrice = document.createElement('p');
    objOldPrice.setAttribute('class', 'oldPrice');
    objOldPrice.innerHTML = "de: " + oldPrice + "";
    return objOldPrice;
}

// cria o preço
function createPrice(price, productPath) {
    var objPrice = document.createElement('p');
    objPrice.setAttribute('class', 'price');
    objPrice.innerHTML = "por: <span class = 'big'>" + price + " </span><span class = 'payment' > " + productPath.productInfo.paymentConditions + " </span> sem juros!!";
    return objPrice;
}

// Cria um produto inteiro e coloca na respectiva lista
// type = "reference" || type = "show"
function createNewProduct(productPath, type){

    // cria os elementos
    var productContainer = createProductContainer();
    var image = createImageElement(productPath.imageName);
    var name = createProductName(productPath.name)
    if (productPath.oldPrice){
        var oldPrice = createOldPrice(productPath.oldPrice);
    }
    var price = createPrice(productPath.price, productPath);

    // Coloca todos os elementos entao criados dentro da div inicial
    productContainer.appendChild(image);
    productContainer.appendChild(name);

    if (productPath.oldPrice){
        productContainer.appendChild(oldPrice);
    }
    productContainer.appendChild(price);

    if (type == "reference") {
        document.getElementById('reference').appendChild(productContainer);
    } else {
        document.getElementById('container').appendChild(productContainer);
    }
}



// Parte responsiva dos slides

// Move os slides para a direita
function slideRight() {
    right++;
    document.querySelectorAll('.product')[1].style.marginLeft = right * (-800) + left * 800 + 5;
    if (right - left > 0) {
        // disable esquerda button
        document.getElementById('left').disabled = false;
        document.getElementById('left').style.borderRight = "25px solid darkblue";
        // able direita button    
        document.getElementById('right').disabled = true;    
        document.getElementById('right').style.borderLeft = "25px solid grey";
    }
}

// Move os Slides para a esquerda
function slideLeft() {
    left++;
    document.querySelectorAll('.product')[1].style.marginLeft = right * (-800) + left * 800 + 5;
    if (right - left <= 0) {
        // disable esquerda button
        document.getElementById('left').disabled = true;
        document.getElementById('left').style.borderRight = "25px solid grey";
        // able direita button
        document.getElementById('right').disabled = false;
        document.getElementById('right').style.borderLeft = "25px solid darkblue";
    }
}

// coloca addEventListener nas setas
function bindArrowClickEvent(arrows){
    arrows.forEach(function(arrow){
        var correctCallback = arrow.id === "right" ? slideRight  : slideLeft;
        arrow.addEventListener('click', correctCallback);
    })
}


function X(data) {

    var products = data.data.recommendation;
    var reference = data.data.reference.item;

    // cria o produto de referencia;
    createNewProduct(data.data.reference.item, "reference");

    // cria os demais itens da vitrine
    for (var index = 0; index < products.length; index++) {
        var currentProduct = products[index];
        createNewProduct(currentProduct, "show");
    }

    // seleciona as setas e add o event listener nelas
    var arrows = document.querySelectorAll('#arrows button');
    bindArrowClickEvent(arrows);

    document.getElementById('right').disabled = false;
    document.getElementById('left').disabled = true;

    document.getElementById('left').style.borderRight = "25px solid grey";
}