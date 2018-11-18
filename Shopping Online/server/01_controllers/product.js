const jwt = require('jsonwebtoken');
const product = require('../00_models/product');
const user = require('./../00_models/user');
const managerMiddlware = require("./middlewares/manager")

let init = (app) => {

    // Get products - ALL - EVERY CLIENT CAN ACCESS: 
    app.get("/api/products/:q", (req, res) => {

        let regex= new RegExp(req.params.q || "a" ,"i");

        product.ProductModel.count({})
        .then(counter=>{
            if(!counter){
                product.ProductModel.insertMany(require("./../00_models/products.json")) // will insert products by default
            }

            product.ProductModel.find({"name":regex})
            .then(products => {
                res.status(200).send(JSON.stringify({"items":products}));
            })
            .catch((e) => { res.status(400).send(e) });
        })
        .catch((e) => { res.status(400).send(e) });
       
    });


    // Get products - BY Product ID - EVERY CLIENT CAN ACCESS: 
    app.get("/api/products/id/:q", (req, res) => {
        product.ProductModel.findOne({"id":req.params.q})
            .then(product => {
                res.status(200).send(product);
            })
            .catch((e) => { res.status(400).send(e) });
    });


    // add product - ONLY CLIENT THAT IS LOGED IN AS A MANAGER CAN ADD A NEW PRODUCT: 
    app.post("/api/products", managerMiddlware.middleware, (req, res) => {

            console.log(req.body);
       
            let newProduct = new product.ProductModel(req.body);
            newProduct.save()
                .then(() => res.status(200).send(newProduct))
                .catch((e) => res.status(400).send(e));
       
    })

    // Get products by category ID
    app.get("/api/products/category/:q", (req, res) => {

        product.ProductModel.find({"categoryId":req.params.q})
        .then(products => {
            res.status(200).send(JSON.stringify({"items":products}));
        })
        .catch((e) => { res.status(400).send(e) });
    });

    // Update product by ID

    app.put("/api/products/:q", managerMiddlware.middleware, (req, res) =>{

        product.ProductModel.findOne({_id: req.params.q})
        .then(product => {

            product.name = req.body.name;
            product.price = req.body.price;
            product.categoryId = req.body.categoryId;
            product.imageAddress = req.body.imageAddress;
            product.save();
            res.status(200).send(product);
        })
        .catch(err => res.status(400).send(err));
    
    });

}

module.exports = { init }

/*


If we dont have products we will use the template(products.json) and insert test item to the products collection.

Get all Categories - Get Request

CURL : curl -v -X GET localhost:6200/api/products/a

C:\Users\hanm15>curl -v -X GET localhost:6200/api/products/a
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 6200 (#0)
> GET /api/products/a HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: text/html; charset=utf-8
< Content-Length: 146
< ETag: W/"92-TaxLVdHCxbzvxQU8xXKgyIw7HzA"
< Date: Sun, 18 Nov 2018 18:56:04 GMT
< Connection: keep-alive
<
{"items":[{"_id":"5bf1b330920cea781490d22d","name":"Tnuva Milk","categoryId":"5bf1b03f8052e7676cc23b3f","price":8,"imageAddress":"test","__v":0}]}* Connection #0 to host localhost left intact


____

Get products by category ID - Get Request

5bf1b03f8052e7676cc23b3f = Milk category

curl -v -X GET localhost:6200/api/products/category/5bf1b03f8052e7676cc23b3f


Reponse:

Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 6200 (#0)
> GET /api/products/category/5bf1b03f8052e7676cc23b3f HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: text/html; charset=utf-8
< Content-Length: 146
< ETag: W/"92-TaxLVdHCxbzvxQU8xXKgyIw7HzA"
< Date: Sun, 18 Nov 2018 18:59:54 GMT
< Connection: keep-alive
<
{"items":[{"_id":"5bf1b330920cea781490d22d","name":"Tnuva Milk","categoryId":"5bf1b03f8052e7676cc23b3f","price":8,"imageAddress":"test","__v":0}]}* Connection #0 to host localhost left intact


__________


Add new product - Post Request


POST - localhost:6200/api/products

5bf1b03f8052e7676cc23b3f = Milk category

xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8
User: manager.


curl -v -X POST -H "Content-type: application/json" -H "xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8" -d  "{\"name\":\"Yotvata Milk\",\"price\": 15,\"imageAddress\":\"test\",\"categoryId\": \"123321\"}" localhost:6200/api/products

Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 6200 (#0)
> POST /api/products HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1

> Content-type: application/json
> xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8
> Content-Length: 100
>
* upload completely sent off: 100 out of 100 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: application/json; charset=utf-8
< Content-Length: 139
< ETag: W/"8b-RYjnGPnlzHmb6QCPS8BUWgcsh9Y"
< Date: Sun, 18 Nov 2018 19:38:12 GMT
< Connection: keep-alive
<
{"_id":"5bf1bfa400098551e8e25c01","name":"Yotvata1 Milk","categoryId":"5bf1b03f8052e7676cc23b3f1","price":15,"imageAddress":"test","__v":0}* Connection #0 to host localhost left intact


____

Edit product - Put Request

Product: Yotvata Milk
_id: 5bf1bfa400098551e8e25c01

PUT - localhost:6200/api/products/:q

curl -v -X PUT -H "Content-type: application/json" -H "xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8" -d  "{\"name\":\"Yotvata Milk\",\"price\": 18,\"imageAddress\":\"test\",\"categoryId\": \"5bf1b03f8052e7676cc23b3f1\"}" localhost:6200/api/products/5bf1bfa400098551e8e25c01


response:

*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 6200 (#0)
> PUT /api/products/5bf1bfa400098551e8e25c01 HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
> Content-type: application/json
> xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMWFmOWQ4MDUyZTc2NzZjYzIzYjNlIiwiaWF0IjoxNTQyNTY1ODQyfQ.ku55pJMYwwuugNMwUr-PAS14KV4bQJcNoiWHPQdlTi8
> Content-Length: 99
>
* upload completely sent off: 99 out of 99 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< Content-Type: application/json; charset=utf-8
< Content-Length: 138
< ETag: W/"8a-v1U5JSeqCCgNd/FWKC0WwkvQKVE"
< Date: Sun, 18 Nov 2018 19:47:35 GMT
< Connection: keep-alive
<
{"_id":"5bf1bfa400098551e8e25c01","name":"Yotvata Milk","categoryId":"5bf1b03f8052e7676cc23b3f1","price":18,"imageAddress":"test","__v":0}* Connection #0 to host localhost left intact

*/