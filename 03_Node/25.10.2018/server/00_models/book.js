const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        minlength: 12,
        maxlength: 12
    },
    volumeInfo: {
        title: {
            type: String,
            required: true,
            minlength: 1
        },
        subtitle: {
            type: String
        },
        authors: {
            type: []
        },
        publisher: {
            type: String
        },
        publishedDate: {
            type: String
        },
        description: {
            type: String
        },
        pageCount: {
            type: Number,
            min: 1
        },
        imageLinks: {
            thumbnail: {
                type: String
            }
        }
    }
});

let BookModel = mongoose.model("Book", bookSchema);

module.exports = {
    BookModel
}