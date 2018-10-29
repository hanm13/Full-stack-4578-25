const mongoose = require("mongoose");

// Connect to MongoDB: 
mongoose.connect("mongodb://localhost:27017/bookStore", (err)=> {
    console.log((!err)?"We're connected to MongoDB":err);
});

module.exports={
    mongoose
}
