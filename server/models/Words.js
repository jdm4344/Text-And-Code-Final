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

  return WordsModel.findOne(search, callback);
};

WordsSchema.statics.addLetter = (letter, callback) => {
  console.dir("in model addLetter()");
  WordsModel.findOne({ name: 'livingwords' }, (err, doc) => {
    console.dir("wordsObj.words: ");
    console.dir(doc.words);
  
    let newWords = doc.words;
  
    console.dir("Letter: " + letter);
    console.dir("newWords: " + newWords);
    newWords += letter;
    console.dir("newWords: " + newWords);
    
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
      )
    }
  );
  // console.dir("wordsObj.words: ");
  // console.dir(wordsObj.words);

  // let newWords = wordsObj.words;

  // console.dir("Letter: " + letter);
  // console.dir("newWords: " + newWords);
  // newWords += letter;
  // console.dir("newWords: " + newWords);

  // return WordsModel.findOneAndUpdate(
  //       { name: 'livingwords' },
  //       { $set: { words: newWords } },
  //       (err) => {
  //         if (err) {
  //           console.log(err);
  //           return false;
  //         }
  //         return true;
  //       },
  //       callback,
  //     );
};

WordsModel = mongoose.model('livingwords', WordsSchema);

module.exports.WordsModel = WordsModel;
module.exports.WordsSchema = WordsSchema;