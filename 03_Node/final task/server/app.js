const express = require("express"); 
const bodyParser = require("body-parser"); 
const path=require('path');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 7200;

// Mongo Connect

mongoose.connect("mongodb://localhost:27017/johnBryce", {useNewUrlParser: true})

//

// model

let memberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1
    },
    userName: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },

});

let MembersCollection = mongoose.model("Members", memberSchema);


//models end

// allowing access to views directory for angular prod

app.use(express.static("./views"));

// get all members


app.get("/api/members",(req,res)=>{

    MembersCollection.find({}).then(members => res.status(200).send(members))
    .catch(err => res.status(400).send(err));
    
});

// get member by id

app.get("/api/member/:q",(req,res)=>{

    console.log(req.params.q)

    MembersCollection.findOne({"_id":req.params.q}).then(members => res.status(200).send(members))
    .catch(err => res.status(400).send(err));
    
});

// create new member

app.post("/api/members",(req,res)=>{

    let member = new MembersCollection(req.body);
    member.save()
        .then(() => res.status(200).send(member))
        .catch((e) => res.status(400).send(e));

});

// Update member

app.put("/api/members", (req, res) =>{

    MembersCollection.findOne({_id: req.query.id})
    .then(member => {
        member.name = req.body.name;
        member.lastName = req.body.lastName;
        member.userName = req.body.userName;
        member.password = req.body.password;
        member.email = req.body.email;
        member.save();
        res.status(200).send(member);
    })
    .catch(err => res.status(400).send(err));

});

// Delete member: 
app.delete("/api/members", (request, response) => {

    console.log(request.query);


    MembersCollection.remove({_id: request.query.id})
    .then(() => {response.status(204).send()})
    .catch(err => response.status(400).send(err));
});

// access angular from node through angular production

app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname+"/views/index.html"));
});


// Member login

app.get("/api/login", (req, res) => {

    console.log("test");


    let headerUserNameVal = req.header('xx-auth-u'); // we get the username through the header.
    let headerPasswordVal = req.header('xx-auth-p'); // we get the pasword through the header.

    console.log(headerUserNameVal);


    if (headerUserNameVal && headerUserNameVal != "" && headerPasswordVal && headerPasswordVal != "") { // we check if we have any content inside the header

        MembersCollection.findOne({ // we search for the user with the headers info

                "password": headerPasswordVal,
                "userName": headerUserNameVal
            }).then(currentUser => { // when we find one we can act and send the user info as response.

                if(currentUser != null){
                    console.log(currentUser);

                    res.status(200).send(currentUser)
                }else{

                    res.status(401).send(); // if we did not find user with the info we will send status 401 (unauthorized)

                }

            })
            .catch((e) => {
                res.status(401).send();
            });
    } else {
        res.status(401).send();
    }
});


app.listen(port, ()=>{console.log(`server is running on port ${port}`)})

/*

// Create new member

POST:
curl -v -X POST -H "Content-type: application/json" -d  "{\"name\": \"Chen1\",\"lastName\": \"Magled1\",\"userName\": \"hanm13\",\"password\": \"123456\",\"email\": \"tttttt059@gmail.com\" }" localhost:7200/api/members

// Delete member

DELETE:
curl -v -X DELETE -H "Content-type: application/json" -d  "" localhost:7200/api/members/?id=5be1654ea18b5a3a64db4b3d

// get all members

GET:
curl -v -X GET -H "Content-type: application/json" -d  "" localhost:7200/api/members

// get member by mongo _id

GET:
curl -v -X GET -H "Content-type: application/json" -d  "" localhost:7200/api/member/5be1654ea18b5a3a64db4b3d

// Update member

PUT:
curl -v -X PUT -H "Content-type: application/json" -d  "{\"name\": \"Chen1\",\"lastName\": \"Magled1\",\"userName\": \"hanm13\",\"password\": \"12345678\",\"email\": \"tttttt059@gmail.com\" }" localhost:7200/api/members/?id=5be1654ea18b5a3a64db4b3d


LOGIN:

GET:
curl -v -X GET -H "Content-type: application/json" -H "xx-auth-u: hanm131" -H "xx-auth-p: 123456" -d  "" localhost:7200/api/login

*/
