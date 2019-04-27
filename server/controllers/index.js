const models = require('../models');

const Words = models.Words.WordsModel;

// function to handle requests to the main page
const hostIndex = (req, res) => {
  Words.getWords((err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // if no matches, create the words object
    if (!doc) {
      return res.render('index', {
        title: 'A Living Word Machine',
        pageName: 'Machine of Living Words',
        err: 'No words were found',
      });
    }

    return res.render('index', {
      title: 'A Living Word Machine',
      pageName: 'Machine of Living Words',
      words: doc.words,
    });
  });
};

// function to handle a request to any non-real resources (404)
const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

const appendValue = (req, res) => {
  console.log('appendValue');
  // console.dir(req.body);

  if (!req.body.inputValue) {
    return res.status(400).json({ message: 'No value sent!' });
  }

  // Convert from binary to text
  const rawInput = req.body.inputValue;
  // console.log("rawInput = " + rawInput);
  const convertedInput = String.fromCharCode(parseInt(rawInput, 2).toString(10));
  // console.log("convertedInput = " + convertedInput);

  Words.getWords((err, doc) => {
    if (err) {
      return res.json({ message: err }); // if error, return it
    }

    // if no matches, create the words object
    if (!doc) {
      console.dir('Words does not exist, creating and appending');
      // return res.json({ err: 'No words were found' });

      const wordData = {
        name: 'livingwords',
        words: convertedInput,
      };

      // create a new dog object
      const newWords = new Words(wordData);

      // create new save promise for the database
      const savePromise = newWords.save();

      savePromise.then(() => {
        // return success
        res.json({ words: wordData.words, message: 'You created the first word!' });
      });

      // if error, return it
      savePromise.catch(error => res.json({ message: error }));
    }

    return res;
  });

  // Else, words exist, so add it
  console.log('words exist, appending');
  return Words.addLetter(convertedInput, (error, newDoc) => {
    // errs, handle them
    if (error) {
      return res.json({ message: error }); // if error, return it
    }

    console.log('in controller addLetter() callback()');
    console.log(`newDoc: ${newDoc}`);

    return res.render('index', {
      title: 'A Living Word Machine',
      pageName: 'Machine of Living Words',
      words: newDoc.words,
    });
  });
};

const getWords = (req, res) => {
  console.log('in controller getWords()');
  Words.getWords((err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // if no matches, create the words object
    if (!doc) {
      return res.json({ err: 'No words were found' });
    }

    return res.json({ words: doc.words });
  });
};

const test = (req, res) => {
  console.log('this is a test');
};

module.exports = {
  index: hostIndex,
  getWords,
  test,
  appendValue,
  notFound,
};
