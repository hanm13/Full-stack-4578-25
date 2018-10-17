// Requires:
let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let User = require("./user");

// Create express app:
let app = express();

// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, and parses it to json format
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (!fs.existsSync("./users.json")) {

    fs.writeFileSync("./users.json","[]");

}

// get all users
app.get("/api/users", (req, res) => {

    let usersArr = JSON.parse(fs.readFileSync("./users.json"));
    res.status(200);
    res.send(usersArr);

});


// Update user
app.put("/api/users", (req, res) => {

    let usersArr = JSON.parse(fs.readFileSync("./users.json"));
    //pointerToUser points to the user with the requested name
    let userIndex = -1;

    for (let index = 0; index < usersArr.length; index++) {

        if(usersArr[index].name == req.query.name){userIndex = index;}
        
    }

    if (userIndex != -1) {

        try{

        let updatedUser = new User.UserClassPointer(); // We need the class rules!

        for (key in req.body) {
            updatedUser[key] = req.body[key];
        }

        console.log(usersArr);
        usersArr[userIndex] = updatedUser;
        console.log(usersArr);

        //save the updates to the file
        fs.writeFileSync("users.json", JSON.stringify(usersArr));

        res.status(200);
        res.send("User edited in the file");

        } catch (e) {
            res.status(400);
            res.send(e.message);
        }

    } else {
        res.status(400);
        res.send("No such User in the file");
    }

});

//delete user
app.delete("/api/users", (req, res) => {

    let usersArr = JSON.parse(fs.readFileSync("./users.json"));
    let filterUsersArr = usersArr.filter(element => element.name != req.query.name)

    //if the filtered array is shorter than the original array - we moved a user (delete success)
    //else - send an error
    if (filterUsersArr.length < usersArr.length) {
        //save the updates to the file

        usersArr=filterUsersArr;
        fs.writeFileSync("users.json", JSON.stringify(usersArr));

        res.status(200);
        res.send("User deleted from the file");
    } 
    else {
        res.status(400);
        res.send("No such user in the file");
    }

});

//post user
app.post("/api/users", (req, res) => {

    let usersArr = JSON.parse(fs.readFileSync("./users.json"));
    let newUser = new User.UserClassPointer();

    try {

        for (key in req.body) {

            // we get each key from the body and update the newUser object.
            newUser[key] = req.body[key];
        }
        
        let filteredNewPerson = {};

        for (key in req.body) {

            //        property:age   property: _age
            filteredNewPerson[key] = newUser['_'+key];

        }

        usersArr.push(filteredNewPerson);

        fs.writeFileSync("users.json", JSON.stringify(usersArr));
        res.status(201);
        res.send("User addedd to the file");

    } catch (e) {
        res.status(400);
        res.send(e.message);
    }

});

app.listen(4444);
console.log("Server is running on port 4444")
