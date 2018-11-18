const jwt = require('jsonwebtoken');
const book = require('./../00_models/book');
const user = require('./../00_models/user');

let init = (app) => {


    let managerMiddlware=(req,res,nextStep)=>{
        let headerVal = req.header('xx-auth');
        if (headerVal) {

            let decodedId;
            try {
                decodedId = (jwt.verify(headerVal, 'my secret')).tokenId;
            } catch (e) {
                res.status(401).send("invalid token in this request");
            }

            user.UserModel.findOne({
                    "_id": decodedId
                }).then(user => {
                    if (user.userName=="manager") {
                        nextStep();
                    } else {
                        res.status(401).send();
                    }

                })
                .catch((e) => {
                    res.status(401).send();
                });
        } else {
            res.status(401).send("please add a token to the request");
        }
    };


    // Get books - ALL - EVERY CLIENT CAN ACCESS: 
    app.get("/api/books/:q", (req, res) => {

        let regex= new RegExp(req.params.q || "a" ,"i");

        book.BookModel.count({})
        .then(counter=>{
            if(!counter){
                book.BookModel.insertMany(require("./../00_models/books.json"))
            }

            book.BookModel.find({"volumeInfo.title":regex})
            .then(books => {
                res.status(200).send(JSON.stringify({"items":books.slice(0,40)}));
            })
            .catch((e) => { res.status(400).send(e) });
        })
        .catch((e) => { res.status(400).send(e) });
       
    });


    // Get books - BY BOOK ID - EVERY CLIENT CAN ACCESS: 
    app.get("/api/books/id/:q", (req, res) => {
       book.BookModel.findOne({"id":req.params.q})
            .then(book => {
                res.status(200).send(book);
            })
            .catch((e) => { res.status(400).send(e) });
    });


    // add book - ONLY CLIENT THAT IS LOGED IN AS A MANAGER CAN ADD A NEW BOOK: 
    app.post("/api/books", managerMiddlware, (req, res) => {
       
            let newBook = new book.BookModel(req.body);
            newBook.save()
                .then(() => res.status(200).send(newBook))
                .catch((e) => res.status(400).send(e));
       
    })
}

module.exports = { init }
