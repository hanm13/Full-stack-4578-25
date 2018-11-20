const cart = require('./../00_models/cart');
const cartItem = require('./../00_models/cartitem');
const userMiddleware = require("./middlewares/user")
const product = require('../00_models/product');

let init = (app) => {

    // Get all cart items from the active cart of the user.

    app.get("/api/cartitems/:q", userMiddleware.middleware, (req, res) => {

        cart.CartModel.findOne({"userID":req.params.q, "active":true})
        .then(cart => {
 
            if(cart){
                cartItem.CartItemModel.find({"cartID":cart._id})
                .then(items => {
                    res.status(200).send(JSON.stringify({"items":items}));
                })
                .catch((e) => { res.status(400).send(e) });
            }else{
                res.status(400).send("User don't have active cart!");
            }



        })
        .catch((e) => { res.status(400).send(e) });
       
    });

    let getProductTotalPriceByID = (productID,amount) => {

        return new Promise((resolve,reject)=>{

            product.ProductModel.findOne({"_id":productID})
            .then(product => {

                resolve(product.price * amount);
                

            })
            .catch((e) => {

                reject(e);

            });

        })

    }

    // Create new cart item for user by ID
    app.post("/api/cartitems/:q", userMiddleware.middleware, (req, res) => {

        cart.CartModel.findOne({"userID":req.params.q, "active":true})
        .then(userCart => {

            getProductTotalPriceByID(req.body.productID, req.body.amount)
                .then((totalItemPrice)=>{

                    return totalItemPrice;
                })

                .then((totalItemPrice)=>{

                    cartItem.CartItemModel.findOne({cartID: req.body.cartID, productID:req.body.productID})
                    .then(product => {

                        if(product ){

                            res.status(400).send("Item already in the cart, you should send PUT request to update the item in the cart!")
                            
                        }else{
    
                            if(userCart){

                                let newCartItem = new cartItem.CartItemModel({...req.body, "totalPrice": totalItemPrice}); // item info
                
                                newCartItem.save()
                                    .then(() => {
                                        
                                        res.status(200).send(newCartItem)
                                    })
                                    .catch((e) => {
                                        
                                        res.status(400).send(e)
                                    });
                        
                
                            }else{
                
                                let newCart = new cart.CartModel({"userID":req.params.q});
                                console.log("Creating new user cart because we added items without any cart");
                
                                newCart.save()
                                    .then(() => {
                
                                        let newCartItem = new cartItem.CartItemModel({...req.body, "cartID":newCart._id, "totalPrice": totalItemPrice}); // item info
                                        newCartItem.save()
                                        .then(() => {
                                            
                                            res.status(200).send(newCartItem)
                
                                        })
                                        .catch((e) => {
                                            
                                            res.status(400).send(e)
                                        });
                                        
                                    })
                                    .catch((e) => {
                                        
                                        res.status(400).send(e)
                                    });
                
                            }
                        }
    
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    });

                });

            

        })
        .catch((e) => { res.status(400).send(e) });


       
    })

    // Update cart item by item cart ID

    app.put("/api/cartitems/:q", userMiddleware.middleware, (req, res) =>{

        cartItem.CartItemModel.findOne({_id: req.params.q})
        .then(cart => {

            getProductTotalPriceByID(req.body.productID, req.body.amount).then((totalPrice)=> {
                
                cartItem.productID = req.body.productID;
                cartItem.amount = req.body.amount;
                cartItem.cartID = req.body.cartID;
                cartItem.totalPrice = totalPrice;
                cartItem.save();
                res.status(200).send(cart);

            })


        })
        .catch(err => res.status(400).send(err));
    
    });

    // Delete cart by ID

    app.delete("/api/cartitems/:q", userMiddleware.middleware, (req, res) =>{

        console.log(req.params.q);

        cartItem.CartItemModel.deleteOne({_id: req.params.q})
        .then(() => {

            res.status(200).send("Deleted!");
        })
        .catch(err => res.status(400).send(err));
    
    });

}

module.exports = { init }

/*

Create new cart item - POST request


curl -v -X POST -H "Content-type: application/json" -H "xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8" -d  "{\"productID\":\"5bf1c28f2ef529256429f377\",\"amount\":5, \"cartID\":\"5bf3cc8fddf52360a8185e75\"}" localhost:6200/api/cartitems/5bf15b5a7668b92468f010d1

response :

* upload completely sent off: 88 out of 88 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: application/json; charset=utf-8
< Content-Length: 108
< ETag: W/"6c-Rztid6/OgryTc5dbyVU3m9Mn2/s"
< Date: Tue, 20 Nov 2018 10:57:32 GMT
< Connection: keep-alive
<
{"_id":"5bf3e89cc67dbf44e028adaf","productID":"5bf1c28f2ef529256429f377","amount":5,"totalPrice":25,"__v":0}* Connection #0 to host localhost left intact

_____


Get all cart items by cartID - GET request

5bf15b5a7668b92468f010d1 - BobB user ID

curl -v -X GET -H "xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8" localhost:6200/api/cartitems/5bf15b5a7668b92468f010d1

Response:

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: text/html; charset=utf-8
< Content-Length: 120
< ETag: W/"78-jIqMtAaEFO8zF7wtUXPZTy3x+v4"
< Date: Tue, 20 Nov 2018 11:13:33 GMT
< Connection: keep-alive
<
{"items":[{"_id":"5bf3ebd17278ab0a7ca8f0a2","productID":"5bf1c28f2ef529256429f377","amount":5,"totalPrice":25,"__v":0}]}* Connection #0 to host localhost left intact

*/



/*

Delete cart item by cart item ID - DELETE request

5bf3c55207a0440690537884

curl -v -X DELETE -H "xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8" localhost:6200/api/cartitems/5bf3ebd17278ab0a7ca8f0a2

reponse:

< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: text/html; charset=utf-8
< Content-Length: 8
< ETag: W/"8-1z6ssizdlKMf7K4C7nfIUlQscuk"
< Date: Tue, 20 Nov 2018 11:17:49 GMT
< Connection: keep-alive
<
Deleted!* Connection #0 to host localhost left intact

*/