const mongoose = require('mongoose');

mongoose.promise = global.promise;

let WordsModel = {};

const WordsSchema = new mongoose.Schema({
    words: {
        type: String,
        required: true,
        trim: false,
    },
});

WordsSchema.statics.addLetter = (lettter, callback) => {

};

WordsModel = mongoose.model("Words", WordsSchema);

module.exports.WordsModel = WordsModel;
module.exports.WordsSchema = WordsSchema;