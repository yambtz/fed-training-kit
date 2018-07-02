const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');

"use strict"

const app = express();

var catalog = JSON.parse(fs.readFileSync('./resources/catalog.json', 'utf8'));
var cart = [];
var orders = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());


//add your endpoints here

app.get('/v1/catalog', function(req, res) {
    res.json(catalog);
});

app.route('/v1/cart')
    .get( function(req, res) {
        res.json(cart);
    })
    .post( function(req, res) {
        let buddy = req.body;
        if (AddToCart(buddy.id, buddy.quantity))
            res.json(cart);
        else
            res.status(400).send("item not found or quantity exceeded");
    });

app.route('/v1/orders')
    .get(function(req, res) {
        res.json(orders.map(item => item.time));
//        res.json(orders);
    })
    .post(function(req, res) {
        if (cart.length) {
            checkOut();
            res.end();
        }
        else {
            res.status(403).end();
        }
    });


app.route('/v1/orders/:order')
    .get(function(req, res) {
        let orderId = req.params.order;
        if (!orderId) {
            res.status(500).send();
            return;
        }
        let orderDetails = orders.find(o => o.time == orderId);
        if (orderDetails)
            res.status(200).json(orderDetails);
        else
            res.status(404).send();
})


app.listen(3000, () => console.log('Example app listening on port 3000!'));


function AddToCart( id, numberRequested) {
    let item = catalog.find((item) => item.id === id);

    if (item && (item.stock >= numberRequested)) {
        item.stock -= numberRequested;

        let cartItem = cart.find(cItem => cItem.catalogEntry.id === item.id )
        if (!cartItem) {
            cartItem = { catalogEntry: item, quantity: 0}
            cart.push(cartItem);
        }
        cartItem.quantity += numberRequested;
        return true;
    }
    return false;
}

function checkOut() {
    let now = Date.now();

    let order = cart.map(function(item) {
        return {
            id: item.catalogEntry.id,
            name: item.catalogEntry.name,
            description: item.catalogEntry.description,
            image: item.catalogEntry.image,
            quantity: item.quantity
        };
    });

    orders.push({ time: now, items: order });

    cart.length = 0;

    console.log(JSON.stringify(orders));
}