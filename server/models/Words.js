const mongoose = require('mongoose');

mongoose.promise = global.promise;

let WordsModel = {};

const WordsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "LivingWords",
    },
    words: {
        type: String,
        required: true,
        trim: false,
    },
});

WordsSchema.statics.getWords = (callback) => {
    const search = {
        name: "LivingWords",
    };

    return WordsModel.findOne(search);
};

WordsSchema.statics.addLetter = (letter) => {
    const wordsObj = WordsModel.findOne({
        name: "LivingWords",
    });

    let newWords = wordsObj.words;
    newWords += letter;

    AccountModel.findOneAndUpdate(
        { name: "LivingWords" },
        { $set: { words: newWords } },
        (err) => {
          if (err) {
            console.log(err);
            return false;
          }
          return true;
        }
      );
};

WordsModel = mongoose.model("Words", WordsSchema);

module.exports.WordsModel = WordsModel;
module.exports.WordsSchema = WordsSchema;