const controllers = require('./controllers');

const router = (app) => {
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);
  app.get('/updateDogAge', controllers.updateDogAge);

  app.get('/', controllers.index);

  app.get('/*', controllers.notFound);

  app.post('/setName', controllers.setName);

  app.post('/updateLast', controllers.updateLast);

  app.post('/setDogName', controllers.setDogName);

  app.post('/appendValue', controllers.appendValue);
};

// export the router function
module.exports = router;
