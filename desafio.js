// Função do JSONP
console.log("hello")

function X(data){

    console.log('hello')
    console.log(data.data.recommendation[0].businessId);
    info = data;
    var products = info.data.recommendation;
    var reference = info.data.reference.item;

    console.log(info);

    // cria uma div dentro de container --Reference
    var div = document.createElement('div');
    div.setAttribute('class', 'product');

    // cria uma imagem -- Reference
    var image = document.createElement('img');
    image.src = reference.imageName;

    // Cria o nome
    var name = document.createElement('p');
    name.setAttribute('class', 'name');
    // name.setAttribute('maxlength', '20');
    name.innerHTML = reference.name;

    // cria o preço antingo --Reference
    if (reference.oldPrice != null){
        var oldPrice = document.createElement('p');
        oldPrice.setAttribute('class', 'oldPrice');
        oldPrice.innerHTML = "de: " + reference.oldPrice + "";
    }

    // cria o preço -- Reference
    var price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.innerHTML = "por: " + reference.price + " <span class = 'payment' > " + reference.productInfo.paymentConditions + " </span> sem juros!!";

    // Coloca todos os elementos entao criados dentro da div inicial -- Reference
    div.appendChild(image)
    div.appendChild(name)
    div.appendChild(oldPrice)
    div.appendChild(price)
    document.getElementById('reference').appendChild(div);


    for (i = 0; i < products.length; i++){
        console.log(info.data.recommendation[i].name);
        
        // cria uma div dentro de container
        var div = document.createElement('div');
        div.setAttribute('class', 'product');

        // cria uma imagem
        var image = document.createElement('img');
        image.src = info.data.recommendation[i].imageName;

        // cria o nome 
        var name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.innerHTML = info.data.recommendation[i].name;

        // cria o preço antingo
        if (info.data.recommendation[i].oldPrice != null){
            var oldPrice = document.createElement('p');
            oldPrice.setAttribute('class', 'oldPrice');
            oldPrice.innerHTML = "de: " + info.data.recommendation[i].oldPrice + "";
        }

        // cria o preço
        var price = document.createElement('p');
        price.setAttribute('class', 'price');
        price.innerHTML = "por: <span class = 'big'>" + info.data.recommendation[i].price + " </span><span class = 'payment' > " + info.data.recommendation[i].productInfo.paymentConditions + " </span> sem juros!!";

        // Coloca todos os elementos entao criados dentro da div inicial
        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(oldPrice)
        div.appendChild(price)

        document.getElementById('container').appendChild(div);
    }
}