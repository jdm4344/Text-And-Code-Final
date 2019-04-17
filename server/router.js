const controllers = require('./controllers');

const router = (app) => {
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);
  app.get('/updateDogAge', controllers.updateDogAge);

  // whenever someone goes to the site without a path (AKA the home page), call controllers.index
  app.get('/', controllers.index);

  // catch for any other GET request
  app.get('/*', controllers.notFound);

  app.post('/setName', controllers.setName);

  app.post('/updateLast', controllers.updateLast);

  app.post('/setDogName', controllers.setDogName);
};

// export the router function
module.exports = router;
