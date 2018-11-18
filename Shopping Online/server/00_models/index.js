const mongoose = require("mongoose");



// Connect to MongoDB: 
//if we run it in production mode - connect to `Atlas DB` 
// else - connect to local mongo DB
let uri = (process.env.PORT) ?
    "mongodb://test:test@cluster0-shard-00-00-e0hcb.mongodb.net:27017,cluster0-shard-00-01-e0hcb.mongodb.net:27017,cluster0-shard-00-02-e0hcb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true" :
    "mongodb://localhost:27017/shoppingOnline";


    mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => {
        console.log("We're connected to MongoDB.");
    })
    .catch((e) => {
        console.log("We're not connected to MongoDB.", e);
    });




module.exports = {
    mongoose
}