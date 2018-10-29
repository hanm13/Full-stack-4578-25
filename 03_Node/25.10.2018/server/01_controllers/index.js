// Requires (from node_modules):
const express = require("express"); 
const bodyParser = require("body-parser"); 
const path=require('path');


// Requires (to activate this file that opens the connection to the DB):
const index = require('./../00_models/index');

// Requires (from current folder - to add controllers to our express app):
const book=require('./book');
const user=require('./user');


// Create express app:
const app = express();

// Use middlewares (app level):
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+"/../02_views"))); 


app.get("/bookStore",(req,res)=>{   //angular routing
    res.sendFile(path.join(__dirname+"/../02_views/index.html"));
});

book.init(app);
user.init(app);


app.listen(process.env.PORT || 6000, ()=>{console.log("ok")})
module.exports={app};