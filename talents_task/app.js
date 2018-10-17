// Requires:
let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let Asset = require("./assets");

// Create express app:
let app = express();

// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, and parses it to json format
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

if (!fs.existsSync("./assets.json")) {

    fs.writeFileSync("./assets.json","[]");

}

// get all assets
app.get("/api/assets", (req, res) => {

    let assetsArr = JSON.parse(fs.readFileSync("./assets.json"));
    res.status(200);
    res.send(assetsArr);

});


//post assest
app.post("/api/assets", (req, res) => {

    let assetsArr = JSON.parse(fs.readFileSync("./assets.json"));

    if(!req.body["type"] || !req.body["roomsNumber"] || !req.body["price"] || !req.body["fullAddress"] || !req.body["fullAddress"][0] || !req.body["fullAddress"][1] || !req.body["fullAddress"][2] ){
        res.status(400);
        res.send(`You must send JSON object as this example: { "type": "Apartment", "roomsNumber": 5, "price": 5000000, "fullAddress": [ "Tel Aviv", "Ramat Aviv", 5 ] }`);

        return;
    }

    try {

        let newAsset = new Asset.AssetClassPointer();

        // substr start from 2 so we are after the decimal.
        newAsset.id = Math.random().toString(36).substr(2, 9);

        // We running on the keys we get from the body request and set properties of the newAsset object according to the keys.

        for (key in req.body) {

            // we get each key from the body and update the newAsset object.
            newAsset[key] = req.body[key];
        }

        // filter for saving the object without the "_" in the JSON file.

        let filteredNewPerson = {};
         for (key in req.body) {

            filteredNewPerson[key] = newAsset['_'+key];
         }
         filteredNewPerson.id = newAsset.id;

        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.

        assetsArr.push(filteredNewPerson);

        fs.writeFileSync("assets.json", JSON.stringify(assetsArr));
        res.status(201);
        res.send("Asset addedd to the file");

    } catch (e) {
        res.status(400);
        res.send(e.message);
    }

});


//delete user
app.delete("/api/assets", (req, res) => {

    let assetsArr = JSON.parse(fs.readFileSync("./assets.json"));

    let filterAssetsArr = assetsArr.filter(element => element.id != req.query.id)

    //if the filtered array is shorter than the original array - we moved a user (delete success)
    //else - send an error
    if (filterAssetsArr.length < assetsArr.length) {
        //save the updates to the file

        assetsArr=filterAssetsArr;
        fs.writeFileSync("assets.json", JSON.stringify(assetsArr));

        res.status(200);
        res.send("Asset deleted from the file");
    } 
    else {
        res.status(400);
        res.send("No asset user in the file");
    }

});

app.listen(4444);
console.log("Server is running on port 4444")


/*

POST:
curl -v -X POST -H "Content-type: application/json" -d  "{\"type\": \"Apartment\",\"roomsNumber\": 5,\"price\": \"5000000\", \"fullAddress\": [ \"Tel Aviv\", \"Ramat Aviv\", 5 ] }" localhost:4444/api/assets

DELETE:
curl -v -X DELETE -H "Content-type: application/json" -d  "" localhost:4444/api/assets?id="s22afylim"

GET:
curl -v -X GET -H "Content-type: application/json" -d  "" localhost:4444/api/assets"


*/



