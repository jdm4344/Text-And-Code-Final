const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let WordsModel = {};

const WordsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  words: {
    type: String,
    required: true,
    trim: false,
  },
});

WordsSchema.statics.getWords = (callback) => {
  console.dir("in model getWords()");
  const search = {
    name: 'livingwords',
  };

  return WordsModel.findOne(search);
};

WordsSchema.statics.addLetter = (letter, callback) => {
  console.dir("in model addLetter()");
  const wordsObj = WordsModel.findOne({
    name: 'livingwords',
  });

  let newWords = wordsObj.words;
  newWords += letter;

  WordsModel.findOneAndUpdate(
        { name: 'livingwords' },
        { $set: { words: newWords } },
        (err) => {
          if (err) {
            console.log(err);
            return false;
          }
          return true;
        },
      );
};

WordsModel = mongoose.model('livingwords', WordsSchema);

module.exports.WordsModel = WordsModel;
module.exports.WordsSchema = WordsSchema;