

document.addEventListener("DOMContentLoaded", showCatalogPage);

function showCatalogPage() {
    //change sub title
    document.getElementById('store-section').innerHTML = 'Catalog';

    //create new
    let catalogHTML = document.createElement('ul');
    catalogHTML.className = 'catalog-container';


    showCatalog(0, 6, catalogHTML);

    let main_content = document.getElementById('main-content');
    main_content.innerHTML = "";
    main_content.appendChild(catalogHTML);
}

function showCatalog(offset, lim, container) {


    // retrieve catalog json from server
    fetch("/v1/catalog?limit=" + lim + "&offset=" + offset)
        .then(response => response.json())
        .then(arr => arr.forEach(createItem));

    function createItem( item ) {
        //create li DOM element
        let itemLi = document.createElement('li');



        itemLi.innerHTML = "<img src='" + item.image + "' alt='" + item.name + "'>";
        itemLi.innerHTML += "<div class='store-item-name'>" + item.name + "</div>";
        itemLi.innerHTML += "<div class='store-item-price'>Price: " + item.price.toFixed(2) + "$</div>";
        itemLi.innerHTML += "<div class='store-item-stock'>Stock: " + item.stock + "</div>";
        itemLi.innerHTML += "<div class='store-item-description'>" + item.description + "</div>";
        itemLi.className = "catalog-item";
        CreateAddToCartButton(itemLi);
        //return DOM li node
        container.appendChild(itemLi);

        function CreateAddToCartButton( ) {
            let button = document.createElement('div');
            button.innerHTML = "Add To Cart"
            button.className = 'store-add-cart';

            button.addEventListener("click", postJson.bind(button, "/v1/cart", { id: item.id, quantity: 1 }));
            button.addEventListener("click", showCartPage);

            itemLi.appendChild(button);
        }
    }
}

function showCartPage() {
    //change sub title
    document.getElementById('store-section').innerHTML = 'Shopping Cart';

    //create new
    let cartHTML = document.createElement('ul');
    cartHTML.className = 'cart-container';

    showCart(cartHTML);

    let main_content = document.getElementById('main-content');
    main_content.innerHTML = "";
    main_content.appendChild(cartHTML);
    main_content.appendChild(addCheckoutButton());


    function showCart( container ) {
        fetch('/v1/cart')
            .then(response => response.json())
            .then(cartArr => cartArr.forEach(createCartItemHTML));

        function createCartItemHTML( item ) {
            let itemLi = document.createElement('li');

            itemLi.innerHTML = "<img src='" + item.catalogEntry.image + "' alt='" + item.catalogEntry.name + "'>";
            itemLi.innerHTML += "<div class='cart-item-name'>" + item.catalogEntry.name + "</div>";
            itemLi.innerHTML += "<div class='cart-item-price'>Price: " + item.catalogEntry.price.toFixed(2) + "$</div>";
            itemLi.innerHTML += "<div class='cart-item-amount'>Amount: " + item.quantity + "</div>";
            itemLi.innerHTML += "<div class='cart-item-description'>" + item.catalogEntry.description + "</div>";
            itemLi.className = "cart-item";

            container.appendChild(itemLi);
        }
    }

    function addCheckoutButton() {
        let button = document.createElement('div');
        button.className = 'cart-checkout-button';
        button.innerText = 'Checkout';
        button.addEventListener("click", function() {
            fetch('/v1/orders', { method: 'POST'})
                .then(showOrdersPage);
        })

        return button;
    }
}

function showOrdersPage() {
    document.getElementById('store-section').innerHTML = 'Orders';

    let main_content = document.getElementById('main-content');
    let orderListHTML = document.createElement('ul');
    orderListHTML.className = 'orders-container';

    main_content.innerHTML = "";
    main_content.appendChild(orderListHTML);

    showOrderList(orderListHTML);

    function showOrderList(container) {
        fetch('/v1/orders')
            .then(res =>  res.json())
            .then(ordersObj => ordersObj.forEach(showOrderFolded))

        function showOrderFolded(orderId){
            let orderTitle = document.createElement('li');
            orderTitle.className = "orders-order-title"

            orderTitle.innerHTML = (new Date(orderId)).toString();
            orderTitle.addEventListener("click", showOrderDetails)

            container.appendChild(orderTitle);

            function showOrderDetails() {
                let orderDetails = document.createElement('ul');
                orderTitle.appendChild(orderDetails);
                orderDetails.className = "orders-order-details";

                orderTitle.removeEventListener("click", showOrderDetails);

                fetch('/v1/orders/' + orderId)
                    .then(res => res.json())
                    .then(orderItems => orderItems.items.forEach(function(item){
                        let itemHTML = document.createElement('li');
                        orderDetails.appendChild(itemHTML);

                        itemHTML.innerHTML = "<img src='" + item.image + "'>" +
                            "<h3>" + item.name + "</h3>" +
                            "<div>" + item.description + "</div>"
                    }))
            }
        }
    }
}

function postJson(url, data) {
    return fetch(url , {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
}