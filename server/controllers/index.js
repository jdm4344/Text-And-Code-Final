const models = require('../models');

const Cat = models.Cat.CatModel;

const Dog = models.Dog.DogModel;

// default fake data
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

let lastAdded = new Cat(defaultData);

// function to handle requests to the main page
const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastAdded.name,
    title: 'Home',
    pageName: 'Home Page',
  });
};

// function to find all cats on request.
const readAllCats = (req, res, callback) => {
  Cat.find(callback);
};

const readAllDogs = (req, res, callback) => {
  Dog.find(callback);
};

// function to find a specific cat on request.
const readCat = (req, res) => {
  const name1 = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // return success
    return res.json(doc);
  };

  Cat.findByName(name1, callback);
};

// function to handle requests to the page1 page
const hostPage1 = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // return success
    return res.render('page1', { cats: docs });
  };

  readAllCats(req, res, callback);
};

// function to handle requests to the page2 page
const hostPage2 = (req, res) => {
  res.render('page2');
};

// function to handle requests to the page3 page
const hostPage3 = (req, res) => {
  res.render('page3');
};

const hostPage4 = (req, res) => {
  const callback = (err, docs) => {
    if (err) {
      return res.json({ err });
    }

    return res.render('page4', { dogs: docs });
  };

  readAllDogs(req, res, callback);
};

// function to handle get request to send the name
const getName = (req, res) => {
  res.json({ name: lastAdded.name });
};

// function to handle a request to set the name
const setName = (req, res) => {
  // check if the required fields exist
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    // if not respond with a 400 error
    return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
  }

  // if required fields are good, then set name
  const name = `${req.body.firstname} ${req.body.lastname}`;

  // dummy JSON to insert into database
  const catData = {
    name,
    bedsOwned: req.body.beds,
  };

  // create a new object of CatModel with the object to save
  const newCat = new Cat(catData);

  // create new save promise for the database
  const savePromise = newCat.save();

  savePromise.then(() => {
    // set the lastAdded cat to our newest cat object.
    lastAdded = newCat;
    // return success
    res.json({ name: lastAdded.name, beds: lastAdded.bedsOwned });
  });

  // if error, return it
  savePromise.catch(err => res.json({ err }));

  return res;
};

// Creates a new dog based on name, breed, and age
const setDogName = (req, res) => {
  // Make sure it has a name, breed, and age
  if (!req.body.name || !req.body.breed || !req.body.age) {
    return res.status(400).json({ error: 'name, breed, and age are all required' });
  }

  const dogData = {
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
  };

  // create a new dog object
  const newDog = new Dog(dogData);

  // create new save promise for the database
  const savePromise = newDog.save();

  savePromise.then(() => {
    // return success
    res.json({ name: dogData.name, breed: dogData.breed, age: dogData.age });
  });

  // if error, return it
  savePromise.catch(err => res.json({ err }));

  return res;
};

// function to handle requests search for a name and return the object
const searchName = (req, res) => {
  // check if there is a query parameter for name
  // BUT WAIT!!?!
  // Why is this req.query and not req.body like the others
  // This is a GET request. Those come as query parameters in the URL
  // For POST requests like the other ones in here, those come in a
  // request body because they aren't a query
  // POSTS send data to add while GETS query for a page or data (such as a search)
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform a search' });
  }

  // Call our Cat's static findByName function.
  return Cat.findByName(req.query.name, (err, doc) => {
    // errs, handle them
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // if no matches, let them know
    if (!doc) {
      return res.json({ error: 'No cats found' });
    }

    // if a match, send the match back
    return res.json({ name: doc.name, beds: doc.bedsOwned });
  });
};

// Finds a dog by name and increases its age by one year
const updateDogAge = (req, res) => {
  // ensure there is a name
  if (!req.query.name) {
    return res.render('page3', { err: 'Name is required to perform a search' });
    // return res.json({ error: 'Name is required to perform a search' });
  }

  // Get the desired dog and increase its age
  Dog.findByName(req.query.name, (err, doc) => {
    // errs, handle them
    if (err) {
      return res.json({ err }); // if error, return it
    }

    // if no matches, let them know
    if (!doc) {
      return res.render('page3', { message: 'No dog found with that name' });
    }

    const dog = doc;

    dog.age++;

    const savePromise = doc.save();

    // send back the name to the page
    savePromise.then(() => {
      res.render('page3', { message: `${dog.name} is now ${dog.age} years old.` });
      // res.json({ name: doc.name, breed: doc.breed, age: doc.age });
    });

    // if save error, just return an error for now
    savePromise.catch(error => res.json({ error }));

    return res;
  });
  return res;
};

// function to handle a request to update the last added object
const updateLast = (req, res) => {
  lastAdded.bedsOwned++;

  const savePromise = lastAdded.save();

  // send back the name as a success for now
  savePromise.then(() => res.json({ name: lastAdded.name, beds: lastAdded.bedsOwned }));

  // if save error, just return an error for now
  savePromise.catch(err => res.json({ err }));
};

// function to handle a request to any non-real resources (404)
const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readCat,
  getName,
  setName,
  updateLast,
  searchName,
  setDogName,
  updateDogAge,
  notFound,
};
