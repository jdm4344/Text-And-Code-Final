const controllers = require('./controllers');

const router = (app) => {
  app.get('/', controllers.index);

  app.get('/getWords', controllers.getWords);

  app.post('/appendValue', controllers.appendValue);

  app.get('/*', controllers.notFound);
};

// export the router function
module.exports = router;
