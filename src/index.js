// arrows counter
var left = 0;
var right = 0;

// creates a div inside container
function createProductContainer() {
    var objDiv = document.createElement('div');
    objDiv.setAttribute('class', 'product');
    return objDiv;
}

// creates an image
function createImageElement(imageUrl){
    var objImage = document.createElement('img');
    objImage.src = imageUrl;
    return objImage;
}

// Creates reference name
function createProductName(productName) {
    var objName = document.createElement('p');
    objName.setAttribute('class', 'name');
    objName.innerHTML = productName.substr(0, 75) + "...";
    return objName;
}

// creates the old price
function createOldPrice(oldPrice) {
    var objOldPrice = document.createElement('p');
    objOldPrice.setAttribute('class', 'oldPrice');
    objOldPrice.innerHTML = "de: " + oldPrice + "";
    return objOldPrice;
}

// creates the price
function createPrice(price, productPath) {
    var objPrice = document.createElement('p');
    objPrice.setAttribute('class', 'price');
    objPrice.innerHTML = "por: <span class = 'big'>" + price + " </span><span class = 'payment' > " + productPath.productInfo.paymentConditions + " </span> sem juros!!";
    return objPrice;
}

// creates an entire product and put it in the respective list
// type = "reference" || type = "show"
function createNewProduct(productPath, type){

    // create the elements
    if (!!productPath.imageName && !!productPath.name && !!productPath.price){
        console.log("hey hou");
        var productContainer = createProductContainer();
        var image = createImageElement(productPath.imageName);
        var name = createProductName(productPath.name)
        if (productPath.oldPrice){
            var oldPrice = createOldPrice(productPath.oldPrice);
        }
        var price = createPrice(productPath.price, productPath);

        // put all the created elements inside the initial div
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
}


// responsive part of the slides

console.log(document.querySelectorAll('.product')[1]);

function slide(side) {
        side === "right" ? right++ : left++;
        document.querySelectorAll('.product')[1].style.marginLeft = right * (-800) + left * 800 + 5;
        if (right - left > 0) {
            // able "left" button
            document.getElementById('left').disabled = false;
            document.getElementById('left').style.borderRight = "25px solid darkblue";
            // disable "right" button    
            document.getElementById('right').disabled = true;    
            document.getElementById('right').style.borderLeft = "25px solid grey";
        } else if (right - left <= 0) {
            // disable "left" button
            document.getElementById('left').disabled = true;
            document.getElementById('left').style.borderRight = "25px solid grey";
            // able "right" button
            document.getElementById('right').disabled = false;
            document.getElementById('right').style.borderLeft = "25px solid darkblue";
        }
}

// Assign each side to its own function
function slideRight() { return slide("right"); }
function slideLeft() { return slide("left");}


// put addEventListener on the arrows
function bindArrowClickEvent(arrows){
    arrows.forEach(function(arrow){
        var correctCallback = arrow.id === "right" ? slideRight  : slideLeft;
        arrow.addEventListener('click', correctCallback);
    })
}

function X(data) {

    var products = data.data.recommendation;
    var reference = data.data.reference.item;

    // creates the reference product
    createNewProduct(data.data.reference.item, "reference");

    // creates the other items of the showroom
    products.forEach(function(product){
        createNewProduct(product, "show");
    })

    // select the arrows and add envent listeners to them
    var arrows = document.querySelectorAll('#arrows button');
    bindArrowClickEvent(arrows);

    document.getElementById('right').disabled = false;
    document.getElementById('left').disabled = true;

    document.getElementById('left').style.borderRight = "25px solid grey";
}