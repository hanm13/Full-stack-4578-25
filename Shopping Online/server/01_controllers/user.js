const jwt = require('jsonwebtoken');
const product = require('./../00_models/product');
const user = require('./../00_models/user');

const userMiddlware = require('./middlewares/user');
const userExistsMiddleWare = require('./middlewares/userExistsMiddleWare');

let init = (app) => {

    // Register validation: // For user register, step 1!
    app.post("/api/users/validateRegister", userExistsMiddleWare.middleware, (req, res) => {

        res.status(200).send("User is valid!");

    });

    
    // Add client - REGISTER: 
    app.post("/api/users", userExistsMiddleWare.middleware, (req, res) => {

        let registerUser = new user.UserModel(req.body);

        registerUser.save()
            .then(newUser => {

                //add to the response header a new property in the header
                //the token contains the user`s id
                let data = {
                    tokenId: newUser._id
                };

                res.header('xx-auth', jwt.sign(data, 'my secret'));

                res.status(201).send(newUser);
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    });

    // Get client -LOGIN:
    // every login request must have in the headers a property named 'xx-auth'
    // with a value that concats the `sha256 password` and the `userName`
    app.get("/api/users", (req, res) => {
        let headerVal = req.header('xx-auth');
        if (headerVal) {
            user.UserModel.findOne({
                    "password": headerVal.substring(0, 64),
                    "userName": headerVal.substring(64, headerVal.length)
                }).then(currentUser => {

                    //add to the response header a new property in the header
                    //the token contains the user`s id
                    let data = {
                        tokenId: currentUser._id
                    };
                    res.header('xx-auth', jwt.sign(data, 'my secret'));

                    res.status(200).send();

                    /*if(currentUser.cart){
                        Promise.all(currentUser.cart.map(el=>product.ProductModel.findOne({"_id":el})))
                        .then(list => {res.status(200).send(list)})
                        .catch((e) => { console.log(e) });
                    }*/

                })
                .catch((e) => {
                    res.status(401).send();
                });
        } else {
            res.status(401).send();
        }
    });

    /*// update user cart
    app.put("/api/users", userMiddlware, (req, res) => {

        user.UserModel.findOne({
                "_id": req.params._id
            })
            .then(currentUser => {
                
                let tempCart = currentUser.cart || [];

                currentUser.cart = (req.body.isAddMode)? 
                                        [...tempCart, req.body.productId]:
                                        tempCart.filter(el=>el!=req.body.productId); 
                    
                currentUser.save();
      
                if(currentUser.cart){
                    let promiseArray=currentUser.cart.map(el=>product.ProductModel.findOne({"_id":el}));
                    Promise.all(promiseArray)
                    .then(list => {res.status(200).send(list)})
                    .catch((e) => { console.log(e) });
                }
                
            })
            .catch((e) => {
                res.status(401).send();
            });
    });*/
}

module.exports = {
    init
}

// CURL :

/*

- Create New User -

Hash: 36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c
Decrypt: abcde

POST - localhost:6200/api/users
curl -v -X POST -H "Content-type: application/json" -d  "{\"firstName\":\"Bob\",\"lastName\": \"Bryce\",\"userName\": \"BobB\",\"password\":\"36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c\",\"personID\": \"207487411\",\"city\": \"BatYam\",\"street\": \"Rabin\"}" localhost:6200/api/users

Received:

* upload completely sent off: 195 out of 195 bytes
< HTTP/1.1 201 Created
< X-Powered-By: Express
< xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMTViNWE3NjY4YjkyNDY4ZjAxMGQxIiwiaWF0IjoxNTQyNTQ0MjE4fQ.8a4MxdO4MNAAYPAFqd1z8Z-iFHauO64ScatUJSbrGkU
< Content-Type: application/json; charset=utf-8
< Content-Length: 240
< ETag: W/"f0-hay4u5kMFPvJTjvAVXhv/h018Ic"
< Date: Sun, 18 Nov 2018 12:30:18 GMT
< Connection: keep-alive
<
{"role":0,"_id":"5bf15b5a7668b92468f010d1","firstName":"Bob","lastName":"Bryce","userName":"BobB","password":"36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c","personID":"207487411","city":"BatYam","street":"Rabin","__v":0}* Connection #0 to host localhost left intact


__________

Authentication for further requests: xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMTViNWE3NjY4YjkyNDY4ZjAxMGQxIiwiaWF0IjoxNTQyNTQ0MjE4fQ.8a4MxdO4MNAAYPAFqd1z8Z-iFHauO64ScatUJSbrGkU

___________


User register check if we already have the ID in the DB(We sent an ID that already in the DB so we will receive an error that the user is already exists):

POST - localhost:6200/api/users/validateRegister

curl -v -X POST -H "Content-type: application/json" -d  "{\"firstName\":\"Bob\",\"lastName\": \"Bryce\",\"userName\": \"BobB\",\"password\":\"36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c\",\"personID\": \"207487411\",\"city\": \"BatYam\",\"street\": \"Rabin\"}" localhost:6200/api/users/validateRegister

Response:

Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 6000 (#0)
> POST /api/users/validateRegister HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
> Content-type: application/json
> Content-Length: 195
>
* upload completely sent off: 195 out of 195 bytes
< HTTP/1.1 401 Unauthorized
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 36
< ETag: W/"24-J45vgUECAMhZI9+Vljm3e65eaAI"
< Date: Sun, 18 Nov 2018 12:39:51 GMT
< Connection: keep-alive
<
User is already exists with this ID!* Connection #0 to host localhost left intact

__

User register check with ID that is not inside the DB
___

curl -v -X POST -H "Content-type: application/json" -d  "{\"firstName\":\"Bob\",\"lastName\": \"Bryce\",\"userName\": \"BobB\",\"password\":\"36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c\",\"personID\": \"2074874111\",\"city\": \"BatYam\",\"street\": \"Rabin\"}" localhost:6200/api/users/validateRegister


Response:
__


Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 6000 (#0)
> POST /api/users/validateRegister HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
> Content-type: application/json
> Content-Length: 196
>
* upload completely sent off: 196 out of 196 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 14
< ETag: W/"e-3HGhnRFvOQFyJ1/4VWM0XSHBj8U"
< Date: Sun, 18 Nov 2018 12:40:04 GMT
< Connection: keep-alive
<
User is valid!* Connection #0 to host localhost left intact

______________

Login - Get Request

CURL : curl -v -X GET -H "xx-auth: 36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42cBobB" localhost:6200/api/users

Response

Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 6200 (#0)
> GET /api/users HTTP/1.1
> Host: localhost:6200
> User-Agent: curl/7.55.1
> xx-auth: 36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42cBobB
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE
< Access-Control-Allow-Headers: Content-Type, xx-auth
< xx-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMTViNWE3NjY4YjkyNDY4ZjAxMGQxIiwiaWF0IjoxNTQyNTY2MDUyfQ.9KSeWcu2E9Aj_NjwuMyEVMu-a1NodhPVZfsnq-6l_-Q
< Date: Sun, 18 Nov 2018 18:34:12 GMT
< Connection: keep-alive
< Content-Length: 0
<
* Connection #0 to host localhost left intact


We use the xx-auth from the response for authentication! - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNWJmMTViNWE3NjY4YjkyNDY4ZjAxMGQxIiwiaWF0IjoxNTQyNTY2MDUyfQ.9KSeWcu2E9Aj_NjwuMyEVMu-a1NodhPVZfsnq-6l_-Q

*/