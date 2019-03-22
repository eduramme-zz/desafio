// Função do JSONP
console.log("hello");

function X(data){

    info = data;
    var products = info.data.recommendation;
    var reference = info.data.reference.item;

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
    div.appendChild(image);
    div.appendChild(name);
    div.appendChild(oldPrice);
    div.appendChild(price);
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
        div.appendChild(image);
        div.appendChild(name);
        div.appendChild(oldPrice);
        div.appendChild(price);

        document.getElementById('container').appendChild(div);
    }

    // Setando os botoes que mandam pra direita ou esquerda
    document.getElementById('direita').addEventListener("click", slideDireita);
    document.getElementById('esquerda').addEventListener("click", slideEsquerda);

    document.getElementById('direita').disabled = false;
    document.getElementById('esquerda').disabled = true;

    // Definindo a contadora de clicks
    direita = 0;
    esquerda = 0;
    document.getElementById('esquerda').style.borderRight = "25px solid grey";

    // Move os slides para a direita
    function slideDireita(){
        direita ++;
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
    function slideEsquerda(){
        esquerda ++;
        document.querySelectorAll('.product')[1].style.marginLeft = direita * (-800) + esquerda * 800 + 5;
        if (direita - esquerda <= 0){
            // disable esquerda button
            document.getElementById('esquerda').disabled = true;
            document.getElementById('esquerda').style.borderRight = "25px solid grey";
            // able direita button
            document.getElementById('direita').disabled = false;
            document.getElementById('direita').style.borderLeft = "25px solid darkblue";
            console.log("sou foda");
        }
    }
}